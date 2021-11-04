/**
 * 单元格
 */
interface GridCell {
    content: any;
}

/**
 * 列排序
 */
enum GridColumnSorting {
    None,
    Asc,
    Desc,
}

/**
 * 列分组
 */
enum GridColumnGrouping {
    None,
    Grouped
}

/**
 * 列头
 */
interface GridColumnHeader {
    /**
     * 列的 ID
     */
    id: string;

    /**
     * 列在网格中的索引（处于第几列）
     */
    index: number;

    /**
     * 列的排序状态
     */
    sorting: GridColumnSorting;

    /**
     * 列的分组状态
     */
    grouping: GridColumnGrouping;
}

/**
 * 网格的一列
 *
 * 考虑到表格中，行数通常会远远超过列数，所以数据以列的形式组织。
 */
class GridColumn implements GridColumnHeader {
    /**
     * 列的 ID
     */
    id: string;

    /**
     * 列在网格中的索引（处于第几列）
     */
    index: number;

    /**
     * 列的排序状态
     */
    sorting = GridColumnSorting.None;

    /**
     * 列的分组状态
     */
    grouping = GridColumnGrouping.None;

    /**
     * 该列包含的所有单元格
     */
    readonly cells = new Array<GridCell>();

    /**
     * 构造函数
     *
     * @param id
     * @param index
     */
    constructor(id: string, index: number) {
        this.id = id;
        this.index = index;
    }

    /**
     * 交换两行的单元格
     *
     * @param index1
     * @param index2
     */
    swapRow(index1: number, index2: number): void {
        const l = this.cells.length;
        if (index1 < 0 || index1 >= l) {
            throw new RangeError(`index1 "${index1}" out of range, count of cells is ${l}`);
        }
        if (index2 < 0 || index2 >= l) {
            throw new RangeError(`index2 "${index2}" out of range, count of cells is ${l}`);
        }
        const cell = this.cells[index1];
        this.cells[index1] = this.cells[index2];
        this.cells[index2] = cell;
    }

    /**
     * 删除指定行的单元格
     *
     * @param index
     */
    deleteRow(index: number): void {
        const l = this.cells.length;
        if (index < 0 || index >= l) {
            throw new RangeError(`index "${index}" out of range, count of cells is ${l}`);
        }
        this.cells.splice(index, 1);
    }
}

/**
 * 行的种类
 */
enum GridRowKind {
    CellSet,
    Virtual,
}

/**
 * 网格的一行
 */
class GridRow {
    /**
     * 行的 ID
     */
    id: string;

    /**
     * 行的种类
     */
    kind = GridRowKind.CellSet;

    /**
     * 构造函数
     *
     * @param id
     */
    constructor(id: string) {
        this.id = id;
    }
}

/**
 * 网格
 */
class Grid {
    /**
     * 排序后的列 ID 集合
     */
    private readonly columnsId = new Array<string>();

    /**
     * 按照 ID 组织的列集合
     *
     * @public
     */
    private readonly columns = new Map<string, GridColumn>();

    /**
     * 排序后的行集合
     *
     * @public
     */
    private readonly rows = new Array<GridRow>();

    /**
     * 在指定行号插入，如果是在最后插入，等同于追加一行；成功返回 GridRow
     *
     * @param index
     * @param id
     */
    insertRow(index: number, id: string): GridRow {
        const row = new GridRow(id);
        if (index >= this.rows.length) {
            this.rows.push(row);
        } else {
            this.rows.splice(index, 0, row);
        }
        return row;
    }

    /**
     * 追加一行并返回 GridRow
     *
     * @param id
     */
    appendRow(id: string): GridRow {
        return this.insertRow(this.rows.length, id);
    }

    /**
     * 删除一行，返回被删除的 GridRow
     *
     * @param index
     */
    deleteRow(index: number): GridRow {
        const l = this.rows.length;
        if (index < 0 || index >= l) {
            throw new RangeError(`index "${index}" out of range, count of rows is ${l}`);
        }
        return this.rows.splice(index, 1)[0];
    }

    /**
     * 从指定行开始删除，返回所有被删除的 GridRow
     *
     * @param start
     * @param count
     */
    deleteRows(start: number, count: number): GridRow[] {
        const l = this.rows.length;
        if (start < 0 || start >= l) {
            throw new RangeError(`start "${start}" out of range, count of rows is ${l}`);
        }
        return this.rows.splice(start, count);
    }

    /**
     * 在指定列号插入，如果是在最后插入，等同于追加一列；成功返回 GridColumn
     *
     * @param index
     * @param id
     */
    insertColumn(index: number, id: string): GridColumn {
        const column = new GridColumn(id, index);
        const l = this.columnsId.length;
        if (index >= l) {
            this.columnsId.push(id);
        } else {
            for (let start = index + 1; start < l; start++) {
                const c = this.columns.get(this.columnsId[start]);
                if (c) {
                    c.index++;
                }
                this.columnsId.splice(index, 0, id);
            }
        }
        this.columns.set(id, column);
        return column;
    }

    /**
     * 追加一列，返回 GridColumn
     *
     * @param id
     */
    appendColumn(id: string): GridColumn {
        return this.insertColumn(this.columnsId.length, id);
    }

    /**
     * 删除指定列，返回被删除的 GridColumn
     *
     * @param key
     */
    deleteColumn(key: string | number): GridColumn {
        let id: string = '';
        const l = this.columnsId.length;
        if (typeof key === 'number') {
            // 查找 id
            if (key < 0 || key >= l) {
                throw new RangeError(`index "${key}" out of range, count of columns is ${l}`);
            }
            id = this.columnsId[key];
        } else {
            id = key;
        }
        if (!this.columns.has(id)) {
            throw new RangeError(`id "${id}" not found in columns`);
        }
        const column = this.columns.get(id)!;
        this.columns.delete(id);

        // 更新 index
        let index = column.index;
        for (let start = index + 1; start < l; start++) {
            const c = this.columns.get(this.columnsId[start])!;
            c.index--;
        }
        this.columnsId.splice(index, 1);

        return column;
    }

    /**
     * 查询指定 ID 或索引的列，如果没找到抛出异常
     *
     * @param key
     */
    queryColumn(key: string | number): GridColumn {
        let id: string = '';
        if (typeof key === 'number') {
            if (key < 0 || key >= this.columnsId.length) {
                throw new RangeError(`not found column by index "${key}`);
            }
            id = this.columnsId[key];
        } else {
            id = key;
        }
        const column = this.columns.get(id);
        if (!column) {
            throw new RangeError(`not found column by id "${id}`);
        }
        return column;
    }

}

export {};
