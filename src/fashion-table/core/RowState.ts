import {RowKind} from './RowKind';

/**
 * 网格的一行
 */
export interface RowState {
    /**
     * 行的 ID
     */
    readonly id: string;

    /**
     * 行的种类
     */
    readonly kind: RowKind;
}
