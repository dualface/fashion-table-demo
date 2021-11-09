import {RowType} from '../schema/RowType';
import {RowState} from './RowState';

export class RowInstance implements RowState {
    readonly id: string;
    readonly type: RowType;

    constructor(id: string, type: RowType) {
        this.id = id;
        this.type = type;
    }
}
