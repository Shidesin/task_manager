import React from 'react'
import {Button, Collapse} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {initialStateJobsType, statusConst} from './bll/jobReducer';

const {Panel} = Collapse;

type ProcessType = {
    titleProcess: string
    jobs: initialStateJobsType
    processId: string
    startTime: string
    jobsCount: number
    currentProcessCallback: (processId: string) => void
    deleteCallback: (processId: string) => void
}

export const Process = React.memo((props: ProcessType) => {


    const jobs = props.jobs[props.processId]

    const deleteProcess = (e: any) => {
        props.deleteCallback(props.processId)
        e.stopPropagation()
    }


    const statusBar = () => {
        if (jobs.some(job => job.status === statusConst.Running) || jobs.length === 0) {
            return 'running'
        }
        if (jobs.every(job => job.status === statusConst.Successed)) {
            return 'success'
        }
        if (jobs.every(job => job.status === statusConst.Failed)) {
            return 'failed'
        }

    }

    return (
        <Collapse key={props.processId} bordered={false} onChange={() => props.currentProcessCallback(props.processId)}>
            <Panel
                header={props.titleProcess}
                key={props.processId}
                extra={
                    <Button key={props.processId}
                            shape={'circle'}
                            type={'default'}
                            onClick={deleteProcess}
                            icon={<DeleteOutlined/>}
                    />
                }
            >
                <div>Opening: {props.startTime},</div>
                <> jobs count: {props.jobsCount}, </>
                <span key={props.processId}> status:{statusBar()}</span>
            </Panel>
        </Collapse>
    )
})