import {CellInstance} from './CellInstance';

/**
 * 迭代器回调
 */
export interface IteratorCallback<T> {
    (index: number): T | undefined;
}

interface IteratorFunction<T> {
    (item: T): void;
}

/**
 * 迭代器实现
 */
export class GenericIterator<T> implements Iterable<T> {
    private readonly _next: IteratorCallback<T>;
    private _index = 0;

    constructor(next: IteratorCallback<T>) {
        this._next = next;
    }

    map(f: IteratorFunction<T>): any[] {
        const r = [];
        for (const item of this) {
            r.push(f(item));
        }
        return r;
    }

    * [Symbol.iterator](): Iterator<T> {
        while (true) {
            const v = this._next(this._index);
            this._index++;
            if (v !== undefined) {
                yield v;
            } else {
                break;
            }
        }
    }
}

/**
 * 单元格迭代器
 */
export class CellIterator extends GenericIterator<CellInstance> {
}
