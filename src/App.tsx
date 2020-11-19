import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd';
import {ProcessBar} from './ProcessBar';
import {Add} from './AddNewProcess';
import Search from 'antd/es/input/Search';

const {Header, Content} = Layout;

function App() {
    const onSearch = (value: string) => console.log(value);
    return (
        <div className="App">
            <Layout>
                <Header className="header" style={{position: 'fixed', zIndex: 1, width: '100%'}} >
                    <Search style={{width: '300px', marginTop: '16px'}} placeholder="input search text" allowClear
                            onSearch={onSearch}/>
                    <Add/>
                </Header>
                <Layout>
                    <ProcessBar/>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: '100vh',
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
