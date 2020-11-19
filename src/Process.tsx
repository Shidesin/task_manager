import React from 'react'
import {Button, Collapse} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {initialStateJobsType, removeTask, statusConst} from './bll/jobReducer';
import {ButtonMenu} from './ButtonMenu';
import {useDispatch} from 'react-redux';

const {Panel} = Collapse;

type ProcessType = {
    titleProcess: string
    jobs: initialStateJobsType
    processId: string
    startTime: Date
}

export const Process = (props: ProcessType) => {

    const jobs = props.jobs[props.processId]
    console.log(jobs)

    const dispatch = useDispatch();

    const deleteJob = (processId: string, jobId: string) => {
        dispatch(removeTask(processId, jobId))
    }

    const statusBar = () => {

        if(jobs.every(job => job.status === statusConst.Successed)){
            return 'success'
        }
        if(jobs.every(job => job.status === statusConst.Failed)){
            return 'failed'
        }
        if (jobs.some(job => job.status === statusConst.Running)){
            return 'running'
        }


        // for (let i = 0; jobs.length > i; i++){
        //      jobs[i].status === statusConst.Running
        // }

    }

    return (
        <Collapse bordered={false}>
            <Panel style={{fontSize: '15px', fontFamily: 'fantasy'}} header={props.titleProcess}
                   key={props.processId}
                   extra={
                       [<span>status:{statusBar()}</span>,
                           <ButtonMenu processId={props.processId}/>]
                   }
            >
                <div>{jobs.map(job => <div style={{marginTop: '10px', fontFamily: 'sans-serif'}} key={job.id}>
                    <span style={{fontSize: '15px'}}>{job.name}</span>

                    <Button
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
}