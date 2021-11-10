import React, {FC} from 'react';
import {CellState} from '../../../core/CellState';

const CellRenderer: FC<{ cell: CellState }> = ({cell}) => {
    return (
        <div key={cell.id} className="cell">
            {cell.content ? cell.content.toString() : 'null'}
        </div>
    );
};

export default CellRenderer;
