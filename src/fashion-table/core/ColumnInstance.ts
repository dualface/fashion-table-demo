import {ColumnSchema} from '../schema/ColumnSchema';
import {CellInstance} from './CellInstance';

/**
 * 网格的一列
 *
 * 考虑到表格中，行数通常会远远超过列数，所以数据以列的形式组织。
 */
export class ColumnInstance {
    /**
     * 列的 ID
     */
    readonly id: string;

    /**
     * Schema
     */
    readonly schema: ColumnSchema;

    /**
     * 该列包含的所有单元格，按照行 ID 组织
     */
    readonly cells = new Map<string, CellInstance>();

    constructor(schema: ColumnSchema) {
        this.id = schema.id;
        this.schema = schema;
    }

    /**
     * 取得指定行的单元格
     *
     * @param rowId
     */
    getCell(rowId: string): CellInstance {
        if (!this.cells.has(rowId)) {
            throw new RangeError(`not found cell with rowId "${rowId}"`);
        }
        return this.cells.get(rowId)!;
    }

    /**
     * 交换两行的单元格
     *
     * @param rowId1
     * @param rowId2
     */
    swapCells(rowId1: string, rowId2: string): void {
        const l = this.cells.size;
        if (!this.cells.has(rowId1)) {
            throw new RangeError(`not found cell with rowId1 "${rowId1}"`);
        }
        if (!this.cells.has(rowId2)) {
            throw new RangeError(`not found cell with rowId2 "${rowId2}"`);
        }
        const cell1 = this.cells.get(rowId1)!;
        const cell2 = this.cells.get(rowId2)!;
        this.cells.set(rowId1, cell2);
        this.cells.set(rowId2, cell1);
    }

    /**
     * 删除指定行的单元格
     *
     * @param rowId
     */
    deleteCell(rowId: string): void {
        if (!this.cells.has(rowId)) {
            throw new RangeError(`not found cell with rowId "${rowId}"`);
        }
        this.cells.delete(rowId);
    }
}
