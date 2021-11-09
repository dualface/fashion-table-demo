/**
 * 分组统计值
 */
export enum ColumnGroupingValue {
    /**
     * 不统计
     */
    None = 'none',

    /**
     * 统计一个分组中的有效值个数
     */
    Count = 'count',

    /**
     * 统计一个分组中该列的累加值
     */
    Sum = 'sum',

    /**
     * 统计一个分组中该列的最小值
     */
    Min = 'min',

    /**
     * 统计一个分组中该列的最大值
     */
    Max = 'max',

    /**
     * 统计一个分组中该列的平均值（累加值除以有效值个数）
     */
    Average = 'average'
}
