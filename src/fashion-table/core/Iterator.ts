import {CellState} from './CellState';
import {ColumnState} from './ColumnState';

export interface IteratorCallback<T> {
    (index: number): T | undefined;
}

export interface Iterator<T> {
    next(): T | undefined;
}

class GenericIterator<T> {
    private readonly _next: IteratorCallback<T>;
    private _index = 0;
    private _completed = false;

    constructor(next: IteratorCallback<T>) {
        this._next = next;
    }

    next(): T | undefined {
        if (this._completed) {
            throw new RangeError('CellIterator is completed');
        }

        const v = this._next(this._index);
        this._index++;
        if (v === undefined) {
            this._completed = true;
        }
        return v;
    }

}

export type CellIterator = GenericIterator<CellState>;
