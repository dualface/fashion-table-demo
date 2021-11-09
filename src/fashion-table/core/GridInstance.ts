import {DataSource} from '../datasource/DataSource';
import {GridSchema} from '../schema/GridSchema';
import {CellState} from './CellState';
import {ColumnInstance} from './ColumnInstance';
import {GenericOrderedMap} from './GenericOrderedMap';
import {CellIterator} from './GenericIterator';
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
     * 所有行
     */
    readonly rows = new GenericOrderedMap<RowInstance>();

    /**
     * 数据源
     */
    readonly dataSource: DataSource;

    constructor(schema: GridSchema, dataSource: DataSource) {
        this.schema = schema;
        this.dataSource = dataSource;

        // 初始化所有列
        for (const columnSchema of schema.columns) {
            const column = new ColumnInstance(columnSchema);
            this.columns.append(column);
        }

        this._loadRowSet();
    }

    /**
     * 取得行单元格迭代器，用于遍历行中的所有单元格
     *
     * @param key
     */
    queryCellsInRow(key: string | number): CellIterator {
        const row = this.rows.get(key);
        const rowIndex = this.rows.indexOf(row);
        const cl = this.columns.length;
        return new CellIterator((index) => {
            if (index >= cl) {
                return undefined;
            }
            return this.columns.get(index).cells[rowIndex];
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
        const lr = this.rows.length;
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
        const cellsInColumns: CellState[][] = [];
        for (let ci = startColumn; ci < lastColumn; ci++) {
            const column = this.columns.get(ci);
            cellsInColumns.push(column.cells);
        }

        let ri = startRow;
        let offsetOfColumns = 0;
        return new CellIterator((index: number): CellState | undefined => {
            if (index >= count) {
                return undefined;
            }
            const cell = cellsInColumns[offsetOfColumns][ri];
            offsetOfColumns++;
            if (offsetOfColumns >= countOfColumns) {
                offsetOfColumns = 0;
                ri++;
            }
            return cell;
        });
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
            this.rows.append(rowInstance);
            for (let column of this.columns) {
                column.cells[index] = {id: `${column.id}${index}`, content: row[column.id]};
            }
            index++;
        }
    }
}
