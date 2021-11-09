import React, {FC} from 'react';
import {GridInstance} from '../../../core/GridInstance';
import ColumnRenderer from './ColumnRenderer';
import RowRenderer from './RowRenderer';

const GridRenderer: FC<{ grid: GridInstance }> = ({grid}) => {
    const columns = grid.schema.columns;
    const countOfRows = grid.rows.length;
    const rowsRender = [];

    for (let index = 0; index < countOfRows; index++) {
        const row = grid.rows.get(index);
        rowsRender.push(RowRenderer({row, cells: grid.queryCellsInRow(index)}));
    }
    return (
        <div className="fashion-table">
            <div className="fashion-table-header">
                {columns.map((column) => ColumnRenderer({column}))}
            </div>
            <div className="fashion-table-body">
                {rowsRender}
            </div>
        </div>
    );
};

export default GridRenderer;
