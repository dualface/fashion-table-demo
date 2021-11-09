/**
 * 单元格内容的类型
 */
export type CellContentType = string | number | boolean | null | object;

/**
 * 单元格 Schema
 */
export interface CellSchema {
    /**
     * 单元格内容
     */
    content: CellContentType | CellContentType[] | undefined;
}
