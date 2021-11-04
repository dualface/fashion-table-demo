import {ColumnGrouping} from './ColumnGrouping';
import {ColumnSorting} from './ColumnSorting';

/**
 * 列
 */
export interface ColumnState {
    /**
     * 列的 ID
     */
    readonly id: string;

    /**
     * 列在网格中的索引（处于第几列）
     */
    index: number;

    /**
     * 列的排序状态
     */
    sorting: ColumnSorting;

    /**
     * 列的分组状态
     */
    grouping: ColumnGrouping;
}
