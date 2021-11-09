import React, {FC} from 'react';
import {ColumnSchema} from '../../../schema/ColumnSchema';
import {ColumnSorting} from '../../../schema/ColumnSorting';

const ColumnRenderer: FC<{ column: ColumnSchema }> = ({column}) => {
    let dragTag;
    if (column.dragEnabled) {
        dragTag = (<div className="drag">#</div>);
    }

    let sortingTag;
    if (column.sortingEnabled) {
        const sorting = column.sorting ?? ColumnSorting.None;
        sortingTag = (<a href="#">
            <div className="sorting">[SORT: {ColumnSorting[sorting]}]</div>
        </a>);
    }

    let groupingTag;
    if (column.groupingEnabled) {
        groupingTag = (<a href="#">
            <div className="grouping">[GROUPING: {column.grouping ? 'YES' : 'NO'}]</div>
        </a>);
    }
    return (
        <div key={column.id} className="fashion-table-column">
            {dragTag}
            <div className="title">{column.title}</div>
            {sortingTag}
            {groupingTag}
        </div>
    );
};

export default ColumnRenderer;
