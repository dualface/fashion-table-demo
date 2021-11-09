import {ColumnSchema} from './ColumnSchema';

/**
 * 网格 Schema
 */
export interface GridSchema {
    /**
     * 网格 ID
     */
    readonly id: string;

    /**
     * 所有列的 Schema
     */
    readonly columns: ColumnSchema[];

    /**
     * 主列的 ID
     */
    readonly primaryColumnId: string;
}
