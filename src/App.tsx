import 'antd/dist/antd.css';
import 'moment/locale/zh-cn';
import React from 'react';
import './App.scss';
import {createProducts, createSellers, createSells} from './demo/DataFactory';
import {GridInstance} from './fashion-table/core/GridInstance';
import {JsonDataSource} from './fashion-table/datasource/JsonDataSource';
import {ColumnSorting} from './fashion-table/schema/ColumnSorting';
import GridRenderer from './fashion-table/ui/antd/components/GridRenderer';

const products = createProducts(15);
const sellers = createSellers(6);
const sells = createSells(products, sellers, 500);
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
                sorting: ColumnSorting.Desc,
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

    return (
        <div className="App">
            <GridRenderer grid={grid}/>
        </div>
    );
}

export default App;
