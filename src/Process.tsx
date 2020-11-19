import React from 'react'
import {Button, Collapse} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {initialStateJobsType} from './bll/jobReducer';
import {ButtonMenu} from './ButtonMenu';

const {Panel} = Collapse;

type ProcessType = {
    titleProcess: string
    jobs: initialStateJobsType
    processId: string
    startTime: Date
}

export const Process = (props: ProcessType) => {


    const addJob = () => {

    }

    const jobs = props.jobs[props.processId]
    console.log(jobs)

    return (
        <Collapse bordered={false}>
            <Panel style={{fontSize: '15px'}} header={props.titleProcess}
                   key={props.processId}

                   extra={
                       <ButtonMenu/>
                   }
            >
                <div>{jobs.map(job => <div key={job.id}>
                    <span style={{fontSize: 'small'}}>{job.name}</span>
                    <Button
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