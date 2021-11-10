import React, {FC} from 'react';
import {GridInstance} from '../../../core/GridInstance';
import {RowInstance} from '../../../core/RowInstance';
import ColumnsRenderer from './ColumnsRenderer';
import {GridRenderOptions} from './GridRenderOptions';
import RowsRenderer from './RowsRenderer';

const GridRenderer: FC<{
    grid: GridInstance,
    rows: RowInstance[],
    options?: GridRenderOptions
}> = ({
          grid,
          rows,
          options,
      }) => {
    const columns = grid.schema.columns;
    return (
        <div className="fashion-table">
            {options && options.title && <h1>{grid.schema.id}</h1>}
            {options && options.columns && <ColumnsRenderer grid={grid}/>}
            <div className="body">
                <RowsRenderer grid={grid} rows={rows}/>
            </div>
        </div>
    );
};

export default GridRenderer;
