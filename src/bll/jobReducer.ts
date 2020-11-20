import {addProcessType, deleteProcessType, initialStateProcess} from './processReducer';

export type jobType = {
    id: string
    processId: string
    name: string
    status: statusConst
}

export enum statusConst {
    Running = 'Running',
    Successed = 'Successed',
    Failed = 'Failed'
}

export type initialStateJobsType = { [key: string]: Array<jobType> }

let initialState: initialStateJobsType = {
    [initialStateProcess[0].id]: [
        {id: '1', name: 'Initial job', processId: initialStateProcess[0].id, status: statusConst.Failed}
    ]
}

type ActionType =
    | addJobType
    | removeTaskType
    | addProcessType
    | deleteProcessType

export const jobReducer = (state = initialState, action: ActionType): initialStateJobsType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.processId]: state[action.processId].filter(job => job.id !== action.jobId)}
        case 'REMOVE_PROCESS':
            const copyState = {...state}
            delete copyState[action.processId]
            return copyState
        case 'ADD_JOB':
            return {...state, [action.processId]: [{status: statusConst.Running, processId: action.processId, name: action.title, id: action.jobId},...state[action.processId]]}
        case 'ADD_PROCESS':
            return {...state, [action.processId]: []}
        default:
            return state
    }
}

export const addJob = (title: string, jobId: string, processId: string, jobCountIncrement: number) => ({
    type: 'ADD_JOB',
    title,
    jobId,
    processId,
    jobCountIncrement
} as const)


export const removeTask = (processId: string, jobId: string,jobCountDecrement: number ) =>
    ({type: 'REMOVE-TASK', processId, jobId, jobCountDecrement} as const)

export  type addJobType = ReturnType<typeof addJob>
export type removeTaskType = ReturnType<typeof removeTask>