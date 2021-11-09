import {DataSource, RowIterator} from './DataSource';

export class JsonDataSource implements DataSource {
    private _data: object[] = [];

    load(source: string | object | object[]): void {
        if (typeof source === 'string') {
            const data = JSON.parse(source);
            if (!Array.isArray(data)) {
                this._data = [data];
            } else {
                this._data = data;
            }
        } else {
            if (!Array.isArray(source)) {
                this._data = [source];
            } else {
                this._data = source;
            }
        }
    }

    query(): RowIterator {
        const l = this._data.length;
        return new RowIterator((index: number): any => {
            if (index >= l) {
                return undefined;
            }
            return this._data[index];
        });
    }

    close(): void {
        this._data.length = 0;
    }
}
