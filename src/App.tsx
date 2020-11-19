import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import {ProcessBar} from './ProcessBar';
import {Add } from './AddNewProcess';

const { Header, Content } = Layout;

function App() {
    return (
        <div className="App">
            <Layout>
                <Header className="header">
                    <Add/>
                </Header>
                <Layout>
                    <ProcessBar/>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: '90vh',
                            }}
                        >
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
