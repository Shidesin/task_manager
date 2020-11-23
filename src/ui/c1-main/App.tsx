import React, {useState} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Layout, Modal} from 'antd';
import Search from 'antd/es/input/Search';
import {useDispatch, useSelector} from 'react-redux';
import {AddNewProcess} from '../c2-feature/AddNewProcess';
import {AppRootStateType, saveState} from '../../bll/store';
import {ContentBox} from '../c3-components/ContentBox';
import {initialStateJobsType} from '../../bll/jobReducer';
import {deleteProcess, initialStateProcessType, processStateType} from '../../bll/processReducer';
import {ProcessBar} from '../c3-components/ProcessBar';

const {Header, Content} = Layout;



const App = React.memo( () => {


    const jobsState = useSelector<AppRootStateType, initialStateJobsType>(state => state.job)
    const processes = useSelector<AppRootStateType, initialStateProcessType>(state => state.process);

    const dispatch = useDispatch()

    const saveProcessState = () => {
        saveState('stateProcess', processes)
        saveState('stateJobs', jobsState)
    }
    saveProcessState()

    const [currentProcessId, setCurrentProcessId] = useState<string>('Please select process')

    const currentProcessCallback = (processId: string) => {
        setCurrentProcessId(processId)
    }

    const deleteProcessCallback = (processId: string) => {
        dispatch(deleteProcess(processId))
        setCurrentProcessId('Please select process')
    }

    const findJob = (stateProcess: processStateType[], stateJobs: initialStateJobsType, jobName: string) => {

        let copyState = Object.values(stateJobs).flatMap(item => item.filter(el => el.name === jobName))

        if (copyState.length > 0) {
            let findJobProcessId = copyState[0].processId
            let nameProcess = stateProcess.filter(item => item.id === findJobProcessId ? item.name : '')
            Modal.success({
                content: (
                    <div>
                        <p>Process name: {nameProcess[0].name}</p>
                        <p>Job name: {copyState[0].name}</p>
                        <p>Status: {copyState[0].status}</p>
                    </div>
                ),
            });
        } else {
            Modal.error({
                title: 'Failed search',
                content: 'Enter the correct title',
            })
        }
    }

    const onSearch = (value: string) => {
        findJob(processes, jobsState, value)
    };

    return (
        <div className="App">
            <Layout>
                <Header className="header" style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                    <Search style={{width: '300px', marginTop: '16px'}} placeholder=" Search job"
                            onSearch={onSearch}/>
                    <AddNewProcess/>
                </Header>
                <Layout>
                    <ProcessBar processes={processes} deleteCallback={deleteProcessCallback} jobs={jobsState}
                                currentProcessCallback={currentProcessCallback}/>
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
                            <ContentBox processesState={processes} jobsState={jobsState}
                                        currentProcessId={currentProcessId}/>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
})

export default App;
