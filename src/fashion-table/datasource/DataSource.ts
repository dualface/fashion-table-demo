import {GenericIterator} from '../core/GenericIterator';

export class RowIterator extends GenericIterator<any> {
}

export interface DataSource {
    load(source: string | object | object[]): void;

    query(): RowIterator;

    close(): void;
}
