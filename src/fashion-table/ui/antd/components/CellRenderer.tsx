import React, {FC} from 'react';
import {CellState} from '../../../core/CellState';

const CellRenderer: FC<{ cell: CellState }> = ({cell}) => {
    return (<td>{cell.content.toString()}</td>);
};

export default CellRenderer;
