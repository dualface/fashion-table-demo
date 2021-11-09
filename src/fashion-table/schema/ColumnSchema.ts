import {ColumnSorting} from './ColumnSorting';
import {ColumnGroupingValue} from './ColumnGroupingValue';

export const ColumnJsonSchema = {
    'type': 'object',
    'properties': {
        'id': {
            'type': 'string',
        },
        'title': {
            'type': 'string',
        },
        'size': {
            'type': 'string',
            'default': 'auto',
        },
        'sorting': {
            'enum': [
                'none',
                'asc',
                'desc',
            ],
            'default': 'none',
        },
        'grouping': {
            'type': 'boolean',
            'default': false,
        },
        'groupingValue': {
            'enum': [
                'none',
                'count',
                'sum',
                'min',
                'max',
                'average',
            ],
            'default': 'count',
        },
        'dragEnabled': {
            'type': 'boolean',
            'default': true,
        },
        'sortingEnabled': {
            'type': 'boolean',
            'default': true,
        },
        'groupingEnabled': {
            'type': 'boolean',
            'default': true,
        },
    },
    'required': [
        'id',
        'title',
    ],
};

/**
 * 列 Schema
 */
export interface ColumnSchema {
    /**
     * 每一列有一个唯一 ID
     */
    readonly id: string;

    /**
     * 列的标题，用于显示
     */
    title: string;

    /**
     * 列的尺寸，具体值和渲染器有关
     */
    size?: string;

    /**
     * 列的排序状态
     */
    sorting?: ColumnSorting;

    /**
     * 是否根据该列对数据尽心分组
     */
    grouping?: boolean;

    /**
     * 分组后的统计值
     */
    groupingValue?: ColumnGroupingValue;

    /**
     * 是否可以拖动列
     */
    dragEnabled?: boolean;

    /**
     * 是否可以按照列排序
     */
    sortingEnabled?: boolean;

    /**
     * 是否可以按照列分组
     */
    groupingEnabled?: boolean;
}
