import React, {FC} from 'react';
import {CellInstance} from '../../../core/CellInstance';

const CellRenderer: FC<{ cell: CellInstance }> = ({cell}) => {
    return (
        <div key={cell.id} className="cell">
            {cell.content ? cell.content.toString() : 'null'}
        </div>
    );
};

export default CellRenderer;
