import {Collapse} from 'antd';
import React, {FC} from 'react';
import {GridInstance} from '../../../core/GridInstance';
import {RowInstance} from '../../../core/RowInstance';
import {RowType} from '../../../schema/RowType';
import CellRenderer from './CellRenderer';
import ColumnsRenderer from './ColumnsRenderer';
import GridRenderer from './GridRenderer';

const {Panel} = Collapse;

const RowRenderer: FC<{ row: RowInstance, grid: GridInstance }> = ({row, grid}) => {
    if (row.type === RowType.Virtual) {
        return (
            <Collapse className="grouped">
                <Panel header={`分组 ${row.id}`} key={row.id}>
                    <p>
                        <GridRenderer grid={grid} rows={row.embedRows}/>
                    </p>
                </Panel>
            </Collapse>
        );
    } else {
        const cells = grid.queryCellsInRow(row.id);
        return (
            <div key={row.id} className="row">
                {cells.map((cell) => CellRenderer({cell}))}
            </div>
        );
    }
};

export default RowRenderer;
