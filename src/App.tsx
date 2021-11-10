import 'antd/dist/antd.css';
import 'moment/locale/zh-cn';
import React from 'react';
import './App.scss';
import {createProducts, createSellers, createSells} from './demo/DataFactory';
import {GridInstance} from './fashion-table/core/GridInstance';
import {RowInstance} from './fashion-table/core/RowInstance';
import {JsonDataSource} from './fashion-table/datasource/JsonDataSource';
import {ColumnSorting} from './fashion-table/schema/ColumnSorting';
import GridRenderer from './fashion-table/ui/antd/components/GridRenderer';
import RowRenderer from './fashion-table/ui/antd/components/RowRenderer';

const products = createProducts(5);
const sellers = createSellers(6);
const sells = createSells(products, sellers, 200);
const dataset = JSON.stringify(sells);

function App() {
    const schema = {
        id: 'SellReport',
        columns: [
            {
                id: 'id',
                title: 'Sell ID',
                sortingEnabled: true,
            },
            {
                id: 'product',
                title: 'Product',
                sorting: ColumnSorting.Asc,
                grouping: true,
                groupingEnabled: true,
                sortingEnabled: true,
                dragEnabled: true,
            },
            {
                id: 'seller',
                title: 'Seller',
                grouping: true,
                groupingEnabled: true,
                sortingEnabled: true,
                dragEnabled: true,
            },
            {
                id: 'quantity',
                title: 'Quantity',
                sortingEnabled: true,
                dragEnabled: true,
            },
        ],
        primaryColumnId: 'id',
    };
    const dataSource = new JsonDataSource();
    dataSource.load(dataset);
    const grid = new GridInstance(schema, dataSource);
    const countOfRows = grid.countOfRows;
    const rows: RowInstance[] = [];
    for (let index = 0; index < countOfRows; index++) {
        rows.push(grid.getRow(index));
    }

    return (
        <div className="App">
            <GridRenderer grid={grid} rows={rows} options={{title: true, columns: true}}/>
        </div>
    );
}

export default App;
