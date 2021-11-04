import {RowKind} from './RowKind';
import {RowState} from './RowState';

/**
 * 行实例
 */
export class RowInstance implements RowState {
    readonly id: string;
    readonly kind: RowKind;

    constructor(id: string, kind: RowKind) {
        this.id = id;
        this.kind = kind;
    }
}
