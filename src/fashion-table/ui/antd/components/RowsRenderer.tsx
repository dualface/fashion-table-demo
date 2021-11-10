import React, {FC} from 'react';
import {GridInstance} from '../../../core/GridInstance';
import {RowInstance} from '../../../core/RowInstance';
import RowRenderer from './RowRenderer';

const RowsRenderer: FC<{ grid: GridInstance, rows: RowInstance[] }> = ({grid, rows}) => {
    return (
        <div className="rows">
            {rows.map((row) => RowRenderer({row, grid}))}
        </div>
    );
};

export default RowsRenderer;
