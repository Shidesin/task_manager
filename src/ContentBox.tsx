import React from 'react';
import {initialStateJobsType} from './bll/jobReducer';
import { AddJob } from './AddJob';
import { Job } from './Job';
import {processStateType} from './bll/processReducer';


type ContentBoxType = {
    currentProcessId: string
    jobsState: initialStateJobsType
    processesState: Array<processStateType>
}

export const ContentBox = (props: ContentBoxType) => {

    const processName = props.processesState.filter( obj => obj.id === props.currentProcessId)
    console.log(processName[0].name)


    const jobsCurrentProcess = props.currentProcessId === 'Please select process' ? undefined : props.jobsState[props.currentProcessId]


    if (!props.currentProcessId || props.currentProcessId === 'Please select process') {
        return (
            <div>
                Please select process
            </div>
        )
    }
    return (
        <div >
            <div style={{position: 'fixed',zIndex: 1,  marginLeft: 20, marginTop: -50}}  key={props.currentProcessId}>
                <AddJob processId={props.currentProcessId}/>  add new job in to process: {processName[0].name}
            </div>
            <div style={{marginTop: 50}}><Job currentProcessId={props.currentProcessId} jobsCurrentProcess={jobsCurrentProcess}/></div>
        </div>
    )

}