import {RowType} from '../schema/RowType';

export class RowInstance {
    /**
     * 行 ID
     */
    readonly id: string;

    /**
     * 行类型
     */
    readonly type: RowType;

    constructor(id: string, type = RowType.CellSet) {
        this.id = id;
        this.type = type;
    }
}
