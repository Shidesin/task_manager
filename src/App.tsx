import React, {useState} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import {ProcessBar} from './ProcessBar';
import {AddNewProcess} from './AddNewProcess';
import Search from 'antd/es/input/Search';
import {ContentBox} from './ContentBox';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './bll/store';
import {initialStateJobsType} from './bll/jobReducer';
import {deleteProcess, initialStateProcessType} from './bll/processReducer';

const {Header, Content} = Layout;

function App() {
    const jobsState = useSelector<AppRootStateType, initialStateJobsType>(state => state.job)
    const processes = useSelector<AppRootStateType, initialStateProcessType>(state => state.process)



    const dispatch = useDispatch();

    const [currentProcessId,setCurrentProcessId] = useState<string >('Please select process')
    console.log(currentProcessId)

    const currentProcessCallback = (processId: string ) => {
        setCurrentProcessId(processId)
        console.log('currentProcessCallback')
    }

    const deleteProcessCallback = (processId: string) => {
        dispatch(deleteProcess(processId))
        setCurrentProcessId('Please select process')
        console.log('deleteProcessCallback')
    }

    const searchJob = jobsState

    const onSearch = (value: string) => {
        console.log(value)
    };

    return (
        <div className="App">
            <Layout>
                <Header className="header" style={{position: 'fixed', zIndex: 1, width: '100%'}} >
                    <Search style={{width: '300px', marginTop: '16px'}} placeholder=" Search job"
                            onSearch={onSearch} onBlur={() => console.log('1111111')}/>
                    <AddNewProcess/>
                </Header>
                <Layout>
                    <ProcessBar processes={processes} deleteCallback={deleteProcessCallback} jobs={jobsState} currentProcessCallback={currentProcessCallback}/>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 'max-content',
                                marginTop: '65px',
                                marginLeft: '350px'
                            }}
                        >
                            <ContentBox processesState={processes} jobsState={jobsState} currentProcessId={currentProcessId}/>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
