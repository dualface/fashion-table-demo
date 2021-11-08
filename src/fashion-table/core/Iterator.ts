import {CellState} from './CellState';

/**
 * 迭代器回调
 */
export interface IteratorCallback<T> {
    (index: number): T | undefined;
}

/**
 * 迭代器
 */
export interface Iterator<T> {
    next(): T | undefined;
}

/**
 * 迭代器实现
 */
export class GenericIterator<T> {
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

/**
 * 单元格迭代器
 */
export class CellIterator extends GenericIterator<CellState> {
}
