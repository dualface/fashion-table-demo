import React, {FC} from 'react';
import {GridInstance} from '../../../core/GridInstance';
import {RowInstance} from '../../../core/RowInstance';
import ColumnsRenderer from './ColumnsRenderer';
import {GridRenderOptions} from './GridRenderOptions';
import RowsRenderer from './RowsRenderer';

const GridRenderer: FC<{
    grid: GridInstance,
    rows?: RowInstance[],
    options?: GridRenderOptions
}> = ({grid, rows, options}) => {
    if (!Array.isArray(rows)) {
        const countOfRows = grid.countOfRows;
        rows = [];
        for (let index = 0; index < countOfRows; index++) {
            rows.push(grid.getRow(index));
        }
    }

    return (
        <div className="fashion-table">
            {(!options || options.title !== false) && <h1>{grid.schema.id}</h1>}
            {(!options || options.columns !== false) && <ColumnsRenderer grid={grid}/>}
            <div className="body">
                <RowsRenderer grid={grid} rows={rows}/>
            </div>
        </div>
    );
};

export default GridRenderer;
