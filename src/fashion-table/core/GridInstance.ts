import {CellState} from './CellState';
import {ColumnInstance} from './ColumnInstance';
import {GenericOrderedMap} from './GenericOrderedMap';
import {GridState} from './GridState';
import {CellIterator} from './Iterator';
import {RowInstance} from './RowInstance';

export class GridInstance implements GridState {
    readonly id: string;
    readonly columns = new GenericOrderedMap<ColumnInstance>();
    readonly rows = new GenericOrderedMap<RowInstance>();

    constructor(id: string) {
        this.id = id;
    }

    queryCellsInColumn(key: string | number): CellIterator {
        const [column] = this.columns.get(key);
        const cells = column.cells;
        const l = cells.length;
        return new CellIterator((index: number): CellState | undefined => {
            return index < l ? cells[index] : undefined;
        });
    }

    queryCellsInRow(key: string | number): CellIterator {
        const [, rowIndex] = this.rows.get(key);
        const l = this.columns.length;
        return new CellIterator((index: number): CellState | undefined => {
            if (index >= l) {
                return undefined;
            }
            const [cell] = this.columns.get(index);
            return cell.cells[rowIndex];
        });
    }

    queryCellsInRows(start: number, count: number): CellIterator {
        return this.queryCellsInRect(start, count, 0, this.columns.length);
    }

    queryCellsInRect(startRow: number, countOfRows: number, startColumn: number, countOfColumns: number): CellIterator {
        const lr = this.rows.length;
        if (startRow < 0 || startRow >= lr) {
            throw new RangeError(`startRow "${startRow}" out of range, count of rows is ${lr}`);
        }
        const lastRow = startRow + countOfRows;
        if (lastRow <= startRow || lastRow >= lr) {
            throw new RangeError(`countOfRows "${countOfRows}" out of range, count of rows is ${lr}`);
        }

        const lc = this.columns.length;
        if (startColumn < 0 || countOfColumns >= lc) {
            throw new RangeError(`startColumn "${startColumn}" out of range, count of columns is ${lc}`);
        }
        const lastColumn = startColumn + countOfColumns;
        if (lastColumn <= startColumn || lastRow >= lc) {
            throw new RangeError(`countOfColumns "${countOfColumns}" out of range, count of columns is ${lc}`);
        }

        const count = countOfRows * countOfColumns;
        const cellsInColumns: CellState[][] = [];
        for (let ci = startColumn; ci < lastColumn; ci++) {
            const [column] = this.columns.get(ci);
            cellsInColumns.push(column.cells);
        }

        let ri = startRow;
        let offsetOfColumns = 0;
        return new CellIterator((index: number): CellState | undefined => {
            if (index >= count) {
                return undefined;
            }
            const cell = cellsInColumns[offsetOfColumns][ri];
            offsetOfColumns++;
            if (offsetOfColumns >= countOfColumns) {
                offsetOfColumns = 0;
                ri++;
            }
            return cell;
        });
    }
}
