import React, {useCallback} from 'react'
import {Button, Collapse} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {initialStateJobsType, removeTask, statusConst} from './bll/jobReducer';
import {ButtonMenu} from './ButtonMenu';
import {useDispatch} from 'react-redux';
import {updateCount} from './bll/processReducer';

const {Panel} = Collapse;

type ProcessType = {
    titleProcess: string
    jobs: initialStateJobsType
    processId: string
    startTime: string
    jobsCount: number
}

export const Process = React.memo((props: ProcessType) => {
    console.log('render Process')

    const dispatch = useDispatch();

    const jobs = props.jobs[props.processId]

    const jobCount = jobs.length

    const changeCountsJob = useCallback((processId: string, jobCount: number) => {
        dispatch(updateCount(processId, jobCount))
    }, [dispatch])

    changeCountsJob(props.processId, jobCount)

    const deleteJob = (processId: string, jobId: string) => {
        dispatch(removeTask(processId, jobId))
    }

    const statusBar = () => {

        if (jobs.every(job => job.status === statusConst.Successed)) {
            return 'success'
        }
        if (jobs.every(job => job.status === statusConst.Failed)) {
            return 'failed'
        }
        if (jobs.some(job => job.status === statusConst.Running)) {
            return 'running'
        }
    }

    return (
        <Collapse key={props.processId} bordered={false}>
            <Panel
                style={{fontSize: '15px', fontFamily: 'fantasy'}}
                header={props.titleProcess}
                key={props.processId}
                extra={
                    [<span key={props.processId}>status:{statusBar()}</span>,
                        <ButtonMenu key={props.processId} processId={props.processId}/>]
                }
            >
                <div key={props.processId}>
                    {jobs.map(job => <div style={{marginTop: '10px', fontFamily: 'sans-serif'}} key={props.processId}>
                        <span key={props.processId} style={{fontSize: '15px'}}>{job.name}</span>

                        <Button
                            key={props.processId}
                            onClick={() => deleteJob(props.processId, job.id)}
                            size={'small'}
                            icon={<DeleteOutlined/>}
                            type="default" shape={'circle'}
                            style={{position: 'absolute', right: '5px'}}
                        />
                    </div>)}

                </div>
            </Panel>
        </Collapse>
    )
})