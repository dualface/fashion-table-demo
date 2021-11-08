import {CellIterator} from './Iterator';

/**
 * 网格
 */
export interface GridState {
    /**
     * ID
     */
    readonly id: string;

    /**
     * 获得列单元格迭代器，用于遍历列中的所有单元格
     *
     * @param key
     */
    queryCellsInColumn(key: string | number): CellIterator;

    /**
     * 取得行单元格迭代器，用于遍历行中的所有单元格
     *
     * @param key
     */
    queryCellsInRow(key: string | number): CellIterator;

    /**
     * 取得遍历多行单元格的迭代器
     *
     * @param start
     * @param count
     */
    queryCellsInRows(start: number, count: number): CellIterator;

    /**
     * 取得遍历特定矩形区域单元格的迭代器
     *
     * @param startRow
     * @param countOfRows
     * @param startColumn
     * @param countOfColumns
     */
    queryCellsInRect(startRow: number, countOfRows: number, startColumn: number, countOfColumns: number): CellIterator;
}
