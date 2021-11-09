import React, {FC} from 'react';
import {CellIterator} from '../../../core/GenericIterator';
import {RowInstance} from '../../../core/RowInstance';
import CellRenderer from './CellRenderer';

const RowRenderer: FC<{ row: RowInstance, cells: CellIterator }> = ({row, cells}) => {
    return (
        <div key={row.id} className="fashion-table-row">
            {cells.map((cell) => CellRenderer({cell}))}
        </div>
    );
};

export default RowRenderer;
