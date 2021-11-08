import {createForm} from '@formily/core';
import React from 'react';
import './App.css';
import {createProducts, createSellers, createSells} from './demo/DataFactory';
import {CellState} from './fashion-table/core/CellState';
import {JsonDataSource} from './fashion-table/datasource/JsonDataSource';
import RowRenderer from './fashion-table/ui/antd/components/RowRenderer';

const form = createForm();

const products = createProducts(50);
const sellers = createSellers(10);
const sells = createSells(products, sellers, 1000);
const dataset = JSON.stringify({products, sellers, sells});
const dataSource = new JsonDataSource();

function App() {

    const cells: CellState[] = [];
    for (const product of products) {
        cells.push({
            id: product.title,
            content: product.title,
        });
    }

    return (
        <div className="App">
            <table>
                <RowRenderer cells={cells}/>
            </table>
        </div>
    );
}

export default App;
