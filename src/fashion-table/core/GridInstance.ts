import {ColumnGrouping} from './ColumnGrouping';
import {ColumnInstance} from './ColumnInstance';
import {ColumnSorting} from './ColumnSorting';
import {ColumnState} from './ColumnState';
import {GridState} from './GridState';
import {RowInstance} from './RowInstance';
import {RowKind} from './RowKind';
import {RowState} from './RowState';

/**
 * 网格实例
 */
export class GridInstance implements GridState {
    readonly id: string;

    private _countOfRows: number = 0;
    get countOfRows(): number {
        return this._countOfRows;
    }

    private _countOfColumns: number = 0;
    get countOfColumns(): number {
        return this._countOfColumns;
    }

    /**
     * 排序后的列 ID 集合
     */
    private readonly _columnsId = new Array<string>();

    /**
     * 按照 ID 组织的列集合
     *
     * @public
     */
    private readonly _columns = new Map<string, ColumnInstance>();

    /**
     * 排序后的行集合
     *
     * @public
     */
    private readonly _rows = new Array<RowState>();

    constructor(id: string) {
        this.id = id;
    }

    appendColumn(id: string): ColumnState {
        return this.insertColumn(this.countOfColumns, id);
    }

    insertColumn(index: number, id: string): ColumnState {
        const column = createColumn(id);
        const l = this._columnsId.length;
        if (index >= l) {
            this._columnsId.push(id);
            column.index = l;
        } else {
            for (let start = index + 1; start < l; start++) {
                const c = this._columns.get(this._columnsId[start]);
                if (c) {
                    c.index++;
                }
                this._columnsId.splice(index, 0, id);
            }
        }
        this._columns.set(id, column);
        this._countOfColumns++;
        return column;
    }

    deleteColumn(key: string | number): ColumnState {
        let id: string = '';
        const l = this._columnsId.length;
        if (typeof key === 'number') {
            // 查找 id
            if (key < 0 || key >= l) {
                throw new RangeError(`index "${key}" out of range, count of columns is ${l}`);
            }
            id = this._columnsId[key];
        } else {
            id = key;
        }
        if (!this._columns.has(id)) {
            throw new RangeError(`id "${id}" not found in columns`);
        }
        const column = this._columns.get(id)!;
        this._columns.delete(id);

        // 更新 index
        let index = column.index;
        for (let start = index + 1; start < l; start++) {
            const c = this._columns.get(this._columnsId[start])!;
            c.index--;
        }
        this._columnsId.splice(index, 1);
        this._countOfColumns--;

        return column;
    }

    getColumn(key: string | number): ColumnState {
        let id: string = '';
        if (typeof key === 'number') {
            if (key < 0 || key >= this._columnsId.length) {
                throw new RangeError(`not found column by index "${key}`);
            }
            id = this._columnsId[key];
        } else {
            id = key;
        }

        const column = this._columns.get(id);
        if (!column) {
            throw new RangeError(`not found column by id "${id}`);
        }
        return column;
    }

    appendRow(id: string): RowState {
        return this.insertRow(this.countOfRows, id);
    }

    insertRow(index: number, id: string): RowState {
        const row = createRow(id);
        if (index >= this._rows.length) {
            this._rows.push(row);
        } else {
            this._rows.splice(index, 0, row);
        }
        return row;
    }

    deleteRow(index: number): RowState {
        const l = this._rows.length;
        if (index < 0 || index >= l) {
            throw new RangeError(`index "${index}" out of range, count of rows is ${l}`);
        }
        return this._rows.splice(index, 1)[0];
    }

    deleteRows(start: number, count: number): RowState[] {
        const l = this._rows.length;
        if (start < 0 || start >= l) {
            throw new RangeError(`start "${start}" out of range, count of rows is ${l}`);
        }
        return this._rows.splice(start, count);
    }

}

function createColumn(id: string, index = 0, sorting = ColumnSorting.None, grouping = ColumnGrouping.None): ColumnInstance {
    return new ColumnInstance(id, index, sorting, grouping);
}

function createRow(id: string, kind = RowKind.CellSet): RowInstance {
    return new RowInstance(id, kind);
}
