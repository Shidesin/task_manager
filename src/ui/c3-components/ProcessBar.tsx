import React, {useState} from 'react'
import {Button, Layout} from 'antd';
import {Process} from './Process';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../bll/store';
import {processStateType} from '../../bll/processReducer';
import {initialStateJobsType} from '../../bll/jobReducer';

const {Sider} = Layout;

type propsType = {
    currentProcessCallback: (processId: string) => void
    jobs: initialStateJobsType
    deleteCallback: (processId: string) => void
    processes: Array<processStateType>
}

export const ProcessBar = React.memo( (props: propsType) => {

    const processStateArray = useSelector<AppRootStateType, Array<processStateType>>(state => state.process)

    const [click, setClick] = useState<string>('')

    const sortByName = (arrProcess: Array<processStateType>) => {
        const compareName = (a: processStateType, b: processStateType) => {
            if (a.name > b.name) {
                return 1
            }
            if (a.name < b.name) {
                return -1
            }
            return 0
        }
        return [...arrProcess.sort(compareName)]
    }
    const sortByStartTime = (arrProcess: Array<processStateType>) => {
        const compareTime = (a: processStateType, b: processStateType) => {
            if (a.startTime > b.startTime) {
                return 1
            }
            if (a.startTime < b.startTime) {
                return -1
            }
            return 0
        }
        return [...arrProcess.sort(compareTime)]
    }
    const sortByJobsCount = (arrProcess: Array<processStateType>) => {
        const compareJobsCount = (a: processStateType, b: processStateType) => {
            return a.jobsCount - b.jobsCount
        }
        return [...arrProcess.sort(compareJobsCount)]
    }

    const arrSorted = (processStateArray: Array<processStateType>, click?: string | null) => {
        if (click === '') {
            return processStateArray
        }
        if (click === 'name') {
            return [...sortByName(processStateArray)]
        }
        if (click === 'time') {
            return [...sortByStartTime(processStateArray)]
        }
        if (click === 'jobsCount') {
            return [...sortByJobsCount(processStateArray)]
        }
        return processStateArray

    }

    return (
        <Sider
            width={350}
            className="site-layout-background"
            style={{
                backgroundColor: 'azure', overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                zIndex: 1,
                left: 0,
                marginTop: '65px'
            }}
        >
            <div>
                <Button onClick={() => setClick('name')} size={'small'}>Sort by name</Button>
                <Button onClick={() => setClick('jobsCount')} size={'small'}>Sort by jobs
                    count</Button>
                <Button onClick={() => setClick('time')} size={'small'}>Sort by time</Button>
            </div>

            {arrSorted(processStateArray, click).map(item =>
                <Process
                    deleteCallback={props.deleteCallback}
                    key={item.id}
                    titleProcess={item.name}
                    processId={item.id}
                    startTime={item.startTime}
                    jobs={props.jobs}
                    jobsCount={item.jobsCount}
                    currentProcessCallback={props.currentProcessCallback}
                />
            )}
        </Sider>
    )
})