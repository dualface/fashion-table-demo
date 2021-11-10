import React, {FC} from 'react';
import {GridInstance} from '../../../core/GridInstance';
import ColumnRenderer from './ColumnRenderer';

const ColumnsRenderer: FC<{ grid: GridInstance, }> = ({grid}) => {
    const columns = grid.schema.columns;
    return (
        <div className="header">
            {columns.map((column) => ColumnRenderer({column}))}
        </div>
    );
};

export default ColumnsRenderer;
