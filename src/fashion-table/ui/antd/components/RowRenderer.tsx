import React, {FC} from 'react';
import {CellState} from '../../../core/CellState';
import CellRenderer from './CellRenderer';

const RowRenderer: FC<{ cells: CellState[] }> = ({cells}) => {
    return (<tr>{
        cells.map((cell) => CellRenderer({cell}))
    }</tr>);
};

export default RowRenderer;
