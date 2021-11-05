import {ColumnState} from './ColumnState';
import {RowState} from './RowState';

/**
 * 网格
 */
export interface GridState {
    /**
     * ID
     */
    readonly id: string;

    /**
     * 行总数
     */
    readonly countOfRows: number;

    /**
     * 列总数
     */
    readonly countOfColumns: number;

    /**
     * 追加一列
     *
     * @param id
     */
    appendColumn(id: string): ColumnState;

    /**
     * 在指定列号插入，如果是在最后插入等同于追加一列
     *
     * @param index
     * @param id
     */
    insertColumn(index: number, id: string): ColumnState;

    /**
     * 删除指定列，返回被删除的 ColumnState
     *
     * @param key
     */
    deleteColumn(key: string | number): ColumnState;

    /**
     * 取得指定 ID 或索引的列
     *
     * @param key
     */
    getColumn(key: string | number): ColumnState;

    /**
     * 追加一行
     *
     * @param id
     */
    appendRow(id: string): RowState;

    /**
     * 在指定行号插入，如果是在最后插入等同于追加一行
     *
     * @param index
     * @param id
     */
    insertRow(index: number, id: string): RowState;

    /**
     * 删除一行，返回被删除的 GridRow
     *
     * @param index
     */
    deleteRow(index: number): RowState;

    /**
     * 从指定行开始删除，返回所有被删除的 GridRow
     *
     * @param start
     * @param count
     */
    deleteRows(start: number, count: number): RowState[];

    /**
     *
     * @param key
     */
    getRow(key: string | number): RowState;
}
