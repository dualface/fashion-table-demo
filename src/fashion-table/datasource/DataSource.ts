import {GenericIterator} from '../core/Iterator';

export class RowIterator extends GenericIterator<object> {
}

export interface DataSource {
    load(source: string | object | object[]): void;

    query(): RowIterator;

    close(): void;
}
