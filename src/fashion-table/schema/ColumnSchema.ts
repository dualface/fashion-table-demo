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

export interface ColumnSchema {
    readonly id: string;
    title: string;
    size: string;
    sorting: ColumnSorting;
    grouping: boolean;
    groupingValue: ColumnGroupingValue;
    dragEnabled: boolean;
    sortingEnabled: boolean;
    groupingEnabled: boolean;
}
