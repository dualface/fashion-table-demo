import {
    ArrowDownOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ArrowUpOutlined,
    CheckOutlined,
    GroupOutlined,
    HolderOutlined,
    MinusOutlined,
} from '@ant-design/icons';
import {Dropdown, Menu} from 'antd';
import React, {FC} from 'react';
import {ColumnSchema} from '../../../schema/ColumnSchema';
import {ColumnSorting} from '../../../schema/ColumnSorting';

const MENU_SORT_NONE = 'SORT_NONE';
const MENU_SORT_ASC = 'SORT_ASC';
const MENU_SORT_DESC = 'SORT_DESC';
const MENU_NOT_GROUPED = 'NOT_GROUPED';
const MENU_GROUPED = 'GROUPED';
const MENU_MOVE_LEFT = 'MOVE_LEFT';
const MENU_MOVE_RIGHT = 'MOVE_RIGHT';

function checked(checked: boolean) {
    if (checked) {
        return (
            <CheckOutlined className="checked"/>
        );
    }
}

const ColumnRenderer: FC<{ column: ColumnSchema }> = ({column}) => {
    const selectedKeys: string[] = [];

    if (column.sortingEnabled && column.sorting === ColumnSorting.Asc) {
        selectedKeys.push(MENU_SORT_ASC);
    } else if (column.sortingEnabled && column.sorting === ColumnSorting.Desc) {
        selectedKeys.push(MENU_SORT_DESC);
    } else {
        selectedKeys.push(MENU_SORT_NONE);
    }

    if (column.grouping && column.groupingEnabled) {
        selectedKeys.push(MENU_GROUPED);
    } else {
        selectedKeys.push(MENU_NOT_GROUPED);
    }

    const menu = (
        <Menu multiple selectable selectedKeys={selectedKeys} className="fashion-table-dropdown-menu">
            <Menu.Item key={MENU_SORT_NONE} icon={<MinusOutlined/>}>
                <a>不排序</a>
                {checked(column.sortingEnabled !== true || column.sorting === ColumnSorting.None)}
            </Menu.Item>
            <Menu.Item key={MENU_SORT_ASC} icon={<ArrowUpOutlined/>}>
                <a>按 A <ArrowRightOutlined/> Z 递增排序</a>
                {checked(column.sortingEnabled === true && column.sorting === ColumnSorting.Asc)}
            </Menu.Item>
            <Menu.Item key={MENU_SORT_DESC} icon={<ArrowDownOutlined/>}>
                <a>按 Z <ArrowRightOutlined/> A 递减排序</a>
                {checked(column.sortingEnabled === true && column.sorting === ColumnSorting.Desc)}
            </Menu.Item>

            <Menu.Divider/>

            <Menu.Item key={MENU_NOT_GROUPED} icon={<MinusOutlined/>}>
                <a>不分组</a>
                {checked(column.grouping !== true || column.groupingEnabled !== true)}
            </Menu.Item>
            <Menu.Item key={MENU_GROUPED} icon={<GroupOutlined/>}>
                <a>按该列分组</a>
                {checked(column.grouping === true && column.groupingEnabled === true)}
            </Menu.Item>

            <Menu.Divider/>

            <Menu.Item key={MENU_MOVE_LEFT} icon={<ArrowLeftOutlined/>}>
                <a>往左移动该列</a>
            </Menu.Item>
            <Menu.Item key={MENU_MOVE_RIGHT} icon={<ArrowRightOutlined/>}>
                <a>往右移动该列</a>
            </Menu.Item>
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
