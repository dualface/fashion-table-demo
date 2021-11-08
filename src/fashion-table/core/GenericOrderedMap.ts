export interface Identifiable {
    id: string;
}

export class GenericOrderedMap<T extends Identifiable> {
    private readonly _orderedIds: string[] = [];
    private readonly _items = new Map<string, T>();

    get length(): number {
        return this._orderedIds.length;
    }

    has(id: string): boolean {
        return this._items.has(id);
    }

    append(item: T): T;
    append(items: T[]): T[];
    append(itemOrItems: T | T[]): T | T[] {
        const items = Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];

        for (let item of items) {
            const id = item.id;
            if (this._items.has(id)) {
                throw new RangeError(`item by id "${id}" already exists`);
            }
            this._orderedIds.push(id);
            this._items.set(id, item);
        }

        return itemOrItems;
    }

    insert(index: number, item: T): T ;
    insert(index: number, items: T[]): T[];
    insert(index: number, itemOrItems: T | T[]): T | T[] {
        const items = Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];
        const ids: string[] = [];

        for (let item of items) {
            const id = item.id;
            if (this._items.has(id)) {
                throw new RangeError(`item by id "${id}" already exists`);
            }
            this._items.set(id, item);
            ids.push(id);
        }
        this._orderedIds.splice(index, 0, ...ids);

        return itemOrItems;

    }

    delete(id: string): T;
    delete(index: number): T;
    delete(index: number, count: number): T[];
    delete(key: string | number, count?: number): T | T[] {
        if (typeof key === 'string') {
            if (!this._items.has(key)) {
                throw new RangeError(`not found item by id "${key}"`);
            }
            const item = this._items.get(key)!;
            this._items.delete(key);
            this._orderedIds.splice(this._orderedIds.indexOf(key), 1);
            return item;
        }

        const start = key;
        const last = start + ((typeof count === 'number') ? count : 1);
        const l = this._orderedIds.length;
        if (start < 0 || start >= l) {
            throw new RangeError(`start index "${start}" out of range, count of items is ${l}`);
        }
        if (last <= start || last >= l) {
            throw new RangeError(`count "${last - start}" out of range, count of items is ${l}`);
        }

        const items: T[] = [];
        for (let index = start; index < last; index++) {
            const id = this._orderedIds[index];
            items.push(this._items.get(id)!);
            this._items.delete(id);
        }
        this._orderedIds.splice(start, last - start);
        return items;
    }

    get(key: string | number): [T, number] {
        if (typeof key === 'string') {
            if (!this._items.has(key)) {
                throw new RangeError(`not found item by id "${key}"`);
            }
            return [this._items.get(key)!, this._orderedIds.indexOf(key)];
        } else {
            const l = this._orderedIds.length;
            if (key < 0 || key >= l) {
                throw new RangeError(`index "${key}" out of range, count of items is ${l}`);
            }
            return [this._items.get(this._orderedIds[key])!, key];
        }
    }

    fetch(start: number, count: number): T[] {
        const l = this._orderedIds.length;
        const last = start + count;
        if (start < 0 || start >= l) {
            throw new RangeError(`start index "${start}" out of range, count of items is ${l}`);
        }
        if (last <= start || last >= l) {
            throw new RangeError(`count "${last - start}" out of range, count of items is ${l}`);
        }
        const items: T[] = [];
        for (let index = start; index < last; index++) {
            const id = this._orderedIds[index];
            items.push(this._items.get(id)!);
        }
        return items;
    }
}
