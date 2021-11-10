import {ArrowDownOutlined, ArrowRightOutlined, ArrowUpOutlined, CheckOutlined, HolderOutlined} from '@ant-design/icons';
import {Dropdown, Menu} from 'antd';
import React, {FC} from 'react';
import {ColumnSchema} from '../../../schema/ColumnSchema';
import {ColumnSorting} from '../../../schema/ColumnSorting';

const MENU_SORT_ASC = 'SORT_ASC';
const MENU_SORT_DESC = 'SORT_DESC';
const MENU_GROUPED = 'GROUPED';

const ColumnRenderer: FC<{ column: ColumnSchema }> = ({column}) => {
    const selectedKeys: string[] = [];

    let sortingMenuItems;
    if (column.sortingEnabled) {
        sortingMenuItems = [
            <Menu.Item key={MENU_SORT_ASC} icon={<ArrowUpOutlined/>}>
                <a>按 A <ArrowRightOutlined/> Z 递增排序</a>
                {
                    column.sorting === ColumnSorting.Asc &&
                    <CheckOutlined className="checked"/>
                }
            </Menu.Item>,
            <Menu.Item key={MENU_SORT_DESC} icon={<ArrowDownOutlined/>}>
                <a>按 Z <ArrowRightOutlined/> A 递减排序</a>
            </Menu.Item>,
            <Menu.Divider/>,
        ];
        if (column.sorting === ColumnSorting.Asc) {
            selectedKeys.push(MENU_SORT_ASC);
        } else if (column.sorting === ColumnSorting.Desc) {
            selectedKeys.push(MENU_SORT_DESC);
        }
    }

    let groupingMenuItems;
    if (column.groupingEnabled) {

    }

    const menu = (
        <Menu multiple selectable selectedKeys={selectedKeys} className="fashion-table-dropdown-menu">
            {sortingMenuItems}
        </Menu>
    );
    return (
        <div key={column.id} className="column">
            <div className="title">
                {column.title}
            </div>
            <Dropdown overlay={menu} className="dropdown">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <HolderOutlined/>
                </a>
            </Dropdown>
        </div>
    );
};

export default ColumnRenderer;
