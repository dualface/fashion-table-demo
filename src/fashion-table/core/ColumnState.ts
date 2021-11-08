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
     * 列的排序状态
     */
    sorting: ColumnSorting;

    /**
     * 列的分组状态
     */
    grouping: ColumnGrouping;
}
