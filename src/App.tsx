import React from 'react';
import logo from './logo.svg';
import './App.css';

import {createForm} from '@formily/core'
import {Field, FormConsumer, FormProvider} from '@formily/react'
import {FormButtonGroup, FormItem, FormLayout, Input, Submit,} from '@formily/antd'

const form = createForm()


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

                <FormProvider form={form}>
                    <FormLayout layout="vertical">
                        <Field
                            name="input"
                            title="输入框"
                            required
                            initialValue="Hello world"
                            decorator={[FormItem]}
                            component={[Input]}
                        />
                    </FormLayout>
                    <FormConsumer>
                        {() => (
                            <div
                                style={{
                                    marginBottom: 20,
                                    padding: 5,
                                    border: '1px dashed #666',
                                }}
                            >
                                实时响应：{form.values.input}
                            </div>
                        )}
                    </FormConsumer>
                    <FormButtonGroup>
                        <Submit onSubmit={console.log}>提交</Submit>
                    </FormButtonGroup>
                </FormProvider>
            </header>
        </div>
    );
}

export default App;
