import {CellContentType} from '../schema/CellSchema';

/**
 * 单元格
 */
export interface CellState {
    /**
     * 单元格 ID
     */
    id: string;

    /**
     * 单元格内容
     */
    content: CellContentType | CellContentType[] | undefined;
}
