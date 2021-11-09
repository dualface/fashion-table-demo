import {ColumnGroupingValue} from '../schema/ColumnGroupingValue';
import {ColumnSorting} from '../schema/ColumnSorting';
import {CellState} from './CellState';
import {ColumnState} from './ColumnState';

/**
 * 网格的一列
 *
 * 考虑到表格中，行数通常会远远超过列数，所以数据以列的形式组织。
 */
export class ColumnInstance implements ColumnState {
    readonly id: string;
    title: string;
    size = 'auto';
    sorting = ColumnSorting.None;
    grouping = false;
    groupingValue = ColumnGroupingValue.Count;
    dragEnabled = true;
    sortingEnabled = true;
    groupingEnabled = true;

    /**
     * 该列包含的所有单元格
     */
    readonly cells = new Array<CellState>();

    constructor(id: string, title: string | undefined) {
        this.id = id;
        this.title = title ? title : id;
    }

    /**
     * 交换两行的单元格
     *
     * @param row1
     * @param row2
     */
    swapCells(row1: number, row2: number): void {
        const l = this.cells.length;
        if (row1 < 0 || row1 >= l) {
            throw new RangeError(`row1 "${row1}" out of range, count of cells is ${l}`);
        }
        if (row2 < 0 || row2 >= l) {
            throw new RangeError(`row2 "${row2}" out of range, count of cells is ${l}`);
        }
        const cell = this.cells[row1];
        this.cells[row1] = this.cells[row2];
        this.cells[row2] = cell;
    }

    /**
     * 删除指定行的单元格
     *
     * @param row
     */
    deleteCell(row: number): void {
        const l = this.cells.length;
        if (row < 0 || row >= l) {
            throw new RangeError(`row "${row}" out of range, count of cells is ${l}`);
        }
        this.cells.splice(row, 1);
    }

}
