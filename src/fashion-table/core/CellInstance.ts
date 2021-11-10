import {Identifiable} from './Identifiable';

/**
 * 单元格
 */
export class CellInstance implements Identifiable {
    /**
     * 唯一 ID
     */
    readonly id: string;

    constructor(id: string, content: any) {
        this.id = id;
        this._content = content;
    }

    private _content: any;

    /**
     * 取得单元格内容
     */
    get content(): any {
        return this._content;
    }

    /**
     * 设置单元格内容
     *
     * @param content
     */
    set content(content: any) {
        this._content = content;
        this._present = undefined;
    }

    private _present: string | undefined;

    /**
     * 取得单元格内容的呈现值
     */
    get present(): string {
        if (this._present === undefined) {
            if (this._content === undefined) {
                this._present = 'undefined';
            } else if (this._content === null) {
                this._present = 'null';
            } else {
                this._present = this._content.toString();
            }
        }
        return this._present!;
    }
}
