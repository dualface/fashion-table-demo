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

    /**
     * 嵌套层级
     */
    readonly nested: number = -1;

    /**
     * 嵌套键（通常是分组字段名）
     */
    readonly nestedKey: string = '';

    constructor(id: string, type = RowType.CellSet, nested: number = 0, nestedTitle = '') {
        this.id = id;
        this.type = type;
        if (type === RowType.Virtual) {
            this._embedRows = [];
            this.nested = nested;
            this.nestedKey = nestedTitle;
        }
    }

    private _embedRows: RowInstance[] | undefined = undefined;

    /**
     * 取得嵌入的行集
     */
    get embedRows(): RowInstance[] {
        if (this.type !== RowType.Virtual) {
            throw new Error(`embedRows only supported by virtual row`);
        }
        return this._embedRows!;
    }

    /**
     * 更新嵌入的行集
     */
    set embedRows(rows: RowInstance[]) {
        if (this.type !== RowType.Virtual) {
            throw new Error(`embedRows only supported by virtual row`);
        }
        this._embedRows = rows;
    }
}
