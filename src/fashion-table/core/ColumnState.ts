import {ColumnSchema} from '../schema/ColumnSchema';
import {CellState} from './CellState';

/**
 * 网格的一列
 *
 * 考虑到表格中，行数通常会远远超过列数，所以数据以列的形式组织。
 */
export interface ColumnState extends ColumnSchema {
    /**
     * 该列包含的所有单元格
     */
    readonly cells: Array<CellState>;
}
