import {DataSource} from '../datasource/DataSource';
import {ColumnSorting} from '../schema/ColumnSorting';
import {GridSchema} from '../schema/GridSchema';
import {RowType} from '../schema/RowType';
import {CellInstance} from './CellInstance';
import {ColumnInstance} from './ColumnInstance';
import {CellIterator} from './GenericIterator';
import {GenericOrderedMap} from './GenericOrderedMap';
import {RowInstance} from './RowInstance';

export class GridInstance {
    /**
     * Schema
     */
    readonly schema: GridSchema;

    /**
     * 所有列
     */
    readonly columns = new GenericOrderedMap<ColumnInstance>();

    /**
     * 数据源
     */
    readonly dataSource: DataSource;

    /**
     * 原始数据行（未分组、未排序）
     */
    private readonly _rawRows = new GenericOrderedMap<RowInstance>();

    /**
     * 要分组的列 ID
     *
     * @private
     */
    private readonly _groupingColumns: string[] = [];

    /**
     * 要排序的列 ID
     *
     * @private
     */
    private readonly _sortingColumns: string[] = [];

    /**
     * 排序（以及分组）后的数据集
     *
     * 包含多个 RowInstance，每一个 RowInstance 又可能包含分组后的 RowInstance[]
     *
     * @private
     */
    private _sortedRows: RowInstance[] = [];

    /**
     * 是否跳过重新排序，用于初始化时设置多个排序和分组列
     *
     * @private
     */
    private _bypassSort = true;

    constructor(schema: GridSchema, dataSource: DataSource) {
        this.schema = schema;
        this.dataSource = dataSource;

        // 初始化所有列
        for (const columnSchema of schema.columns) {
            const column = new ColumnInstance(columnSchema);
            this.columns.append(column);
        }

        // 载入行集
        this._loadRowSet();

        // 设置分组和排序
        for (const column of schema.columns) {
            if (column.groupingEnabled && column.grouping) {
                this.setGrouping(column.id, true, this._groupingColumns.length);
            }
            if (column.sortingEnabled && column.sorting !== ColumnSorting.None) {
                this.setSorting(column.id, column.sorting);
            }
        }

        // 排序
        this._bypassSort = false;
        this._resort();
    }

    /**
     * 行总数
     */
    get countOfRows(): number {
        return this._sortedRows.length;
    }

    /**
     * 取得指定行
     *
     * @param index
     */
    getRow(index: number): RowInstance {
        return this._sortedRows[index];
    }

    /**
     * 设置要排序的列，用 index 指定排序顺序
     *
     * @param columnKey
     * @param sorting
     * @param index
     */
    setSorting(columnKey: string | number, sorting = ColumnSorting.Asc, index = 0): void {
        const column = this.columns.get(columnKey);
        if (column.schema.sortingEnabled !== true) {
            throw new Error(`column "${column.id}" sorting is disabled`);
        }
        if (sorting !== ColumnSorting.None) {
            if (!insertId(this._sortingColumns, column.id, index)) {
                throw new RangeError(`set column "${column.id}" sorting failed`);
            }
        } else {
            if (!deleteId(this._sortingColumns, column.id)) {
                throw new RangeError(`unset column "${column.id}" sorting failed`);
            }
        }

        column.schema.sorting = sorting;
        this._resort();
    }

    /**
     * 设置要分组的列，用 index 指定分组顺序
     *
     * @param columnKey
     * @param grouping
     * @param index
     */
    setGrouping(columnKey: string | number, grouping = true, index = 0): void {
        const column = this.columns.get(columnKey);
        if (column.schema.groupingEnabled !== true) {
            throw new Error(`column "${column.id}" grouping is disabled`);
        }
        if (grouping) {
            if (!insertId(this._groupingColumns, column.id, index)) {
                throw new RangeError(`set column "${column.id}" grouping failed`);
            }
        } else {
            if (!deleteId(this._groupingColumns, column.id)) {
                throw new RangeError(`unset column "${column.id}" grouping failed`);
            }
        }

        column.schema.grouping = grouping;
        this._resort();
    }

    /**
     * 取得行单元格迭代器，用于遍历行中的所有单元格
     *
     * @param key
     */
    queryCellsInRow(key: string | number): CellIterator {
        const row = this._rawRows.get(key);
        const cl = this.columns.length;
        return new CellIterator((index) => {
            if (index >= cl) {
                return undefined;
            }
            return this.columns.get(index).getCell(row.id);
        });
    }

    /**
     * 取得遍历多行单元格的迭代器
     *
     * @param start
     * @param count
     */
    queryCellsInRows(start: number, count: number): CellIterator {
        return this.queryCellsInRect(start, count, 0, this.columns.length);
    }

    /**
     * 取得遍历特定矩形区域单元格的迭代器
     *
     * @param startRow
     * @param countOfRows
     * @param startColumn
     * @param countOfColumns
     */
    queryCellsInRect(startRow: number, countOfRows: number, startColumn: number, countOfColumns: number): CellIterator {
        const lr = this._rawRows.length;
        if (startRow < 0 || startRow >= lr) {
            throw new RangeError(`startRow "${startRow}" out of range, count of rows is ${lr}`);
        }
        const lastRow = startRow + countOfRows;
        if (lastRow <= startRow || lastRow >= lr) {
            throw new RangeError(`countOfRows "${countOfRows}" out of range, count of rows is ${lr}`);
        }

        const lc = this.columns.length;
        if (startColumn < 0 || countOfColumns >= lc) {
            throw new RangeError(`startColumn "${startColumn}" out of range, count of columns is ${lc}`);
        }
        const lastColumn = startColumn + countOfColumns;
        if (lastColumn <= startColumn || lastRow >= lc) {
            throw new RangeError(`countOfColumns "${countOfColumns}" out of range, count of columns is ${lc}`);
        }

        const count = countOfRows * countOfColumns;
        const queryColumns: ColumnInstance[] = [];
        for (let ci = startColumn; ci < lastColumn; ci++) {
            const column = this.columns.get(ci);
            queryColumns.push(column);
        }

        let ri = startRow;
        let offsetOfColumns = 0;
        return new CellIterator((index: number): CellInstance | undefined => {
            if (index >= count) {
                return undefined;
            }
            const row = this._rawRows.get(ri);
            const cell = queryColumns[offsetOfColumns].getCell(row.id);
            offsetOfColumns++;
            if (offsetOfColumns >= countOfColumns) {
                offsetOfColumns = 0;
                ri++;
            }
            return cell;
        });
    }

    /**
     * 对行集进行分组，返回分组后的行集
     *
     * @param rows
     * @param columnId
     * @param nested
     * @private
     */
    private _grouping(rows: RowInstance[], columnId: string, nested = 1): RowInstance[] {
        const column = this.columns.get(columnId);
        const grouping = new Map<string, RowInstance>();
        for (const row of rows) {
            if (row.type === RowType.Virtual) {
                // 如果是虚拟行，则递归分组
                row.embedRows = this._grouping(row.embedRows, columnId, nested + 1);
                grouping.set(`${columnId}.${row.id}`, row);
            } else {
                const key = column.getCell(row.id).present;
                if (!grouping.get(key)) {
                    grouping.set(key, new RowInstance(key, RowType.Virtual, nested, columnId));
                }
                const virtualRow = grouping.get(key)!;
                virtualRow.embedRows.push(row);
            }
        }
        const grouped: RowInstance[] = [];
        for (const [, virtualRow] of grouping) {
            grouped.push(virtualRow);
        }
        return grouped;
    }

    /**
     * 按照指定字段对记录进行排序
     *
     * @param rows
     * @param columnId
     * @private
     */
    private _sorting(rows: RowInstance[], columnId: string) {
        const column = this.columns.get(columnId);
        rows.sort((row1, row2): number => {
            if (row1.type !== row2.type) {
                throw new Error(`row a and b has different row type`);
            }

            if (row1.type === RowType.Virtual) {
                this._sorting(row1.embedRows, columnId);
                this._sorting(row2.embedRows, columnId);

                if (row1.id < row2.id) {
                    return -1;
                } else if (row1.id > row2.id) {
                    return 1;
                } else {
                    return 0;
                }
            }

            const present1 = column.getCell(row1.id).present;
            const present2 = column.getCell(row2.id).present;
            if (present1 < present2) {
                return -1;
            } else if (present1 > present2) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    /**
     * 对数据集重新排序和分组
     *
     * @private
     */
    private _resort(): void {
        if (this._bypassSort) {
            return;
        }

        this._sortedRows.length = 0;
        let rows: RowInstance[] = [];
        for (const row of this._rawRows) {
            rows.push(row);
        }

        // 分组
        for (const columnId of this._groupingColumns) {
            rows = this._grouping(rows, columnId);
        }

        // 排序
        for (const columnId of this._sortingColumns) {
            this._sorting(rows, columnId);
        }

        console.log(rows);

        this._sortedRows = rows;
    }

    /**
     * 从数据源载入行集
     *
     * @private
     */
    private _loadRowSet(): void {
        let index = 0;
        for (const row of this.dataSource.query()) {
            const rowInstance = new RowInstance(index.toString());
            this._rawRows.append(rowInstance);
            for (let column of this.columns) {
                const cell = new CellInstance(column.id + row.id, row[column.id]);
                column.cells.set(rowInstance.id, cell);
            }
            index++;
        }
    }
}

function insertId(arr: string[], id: string, index: number): boolean {
    const exist = arr.indexOf(id);
    if (exist !== -1) {
        return false;
    }
    if (index <= 0) {
        arr.unshift(id);
    } else if (index >= arr.length) {
        arr.push(id);
    } else {
        arr.splice(index, 0, id);
    }
    return true;
}

function deleteId(arr: string[], id: string): boolean {
    const exist = arr.indexOf(id);
    if (exist === -1) {
        return false;
    }
    arr.splice(exist, 1);
    return true;
}
