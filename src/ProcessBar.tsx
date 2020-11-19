import React from 'react'
import {Input, Layout} from 'antd';
import {Process} from './Process';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './bll/store';
import {initialStateProcessType} from './bll/processReducer';
import {initialStateJobsType} from './bll/jobReducer';

const {Search} = Input;
const {Sider} = Layout;

export const ProcessBar = () => {

    const processes = useSelector<AppRootStateType, initialStateProcessType>(state => state.process)
    const jobs = useSelector<AppRootStateType, initialStateJobsType>(state => state.job)




    const onSearch = (value: string) => console.log(value);

    return (
        <Sider
            width={300}
            className="site-layout-background"
            style={{
                backgroundColor: 'azure', overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}
        >
            <Search placeholder="input search text" allowClear onSearch={onSearch}/>

            {processes.map(item =>
                <Process
                    key={item.id}
                    titleProcess={item.name}
                    processId={item.id}
                    startTime={item.startTime}
                    jobs={jobs}
                />
            )}
        </Sider>
    )
}