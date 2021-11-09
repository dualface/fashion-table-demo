import {ColumnSchema} from './ColumnSchema';

export interface TableSchema {
    readonly id: string;
    title: string;
    columns: ColumnSchema[];
}
