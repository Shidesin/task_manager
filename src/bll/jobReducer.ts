import {addProcessType, deleteProcessType} from './processReducer';

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
    '1': [
        {id: '1', name: 'Initial job', processId: '1', status: statusConst.Failed}
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
            return {
                ...state,
                [action.processId]: [{
                    status: action.status,
                    processId: action.processId,
                    name: action.title,
                    id: action.jobId
                }, ...state[action.processId]]
            }
        case 'ADD_PROCESS':
            return {...state, [action.processId]: []}
        default:
            return state
    }
}

export const addJob = (
    title: string,
    jobId: string,
    processId: string,
    jobCountIncrement: number,
    status: statusConst.Successed | statusConst.Failed | statusConst.Running
) => ({
    type: 'ADD_JOB',
    title,
    jobId,
    processId,
    jobCountIncrement,
    status
} as const)


export const removeTask = (processId: string, jobId: string, jobCountDecrement: number) =>
    ({type: 'REMOVE-TASK', processId, jobId, jobCountDecrement} as const)

export  type addJobType = ReturnType<typeof addJob>
export type removeTaskType = ReturnType<typeof removeTask>


export const randomStatus = () => {
    function getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomNum = getRandomIntInclusive(1, 4);

    if (randomNum === 1) {
        return statusConst.Running
    }
    if (randomNum === 2) {
        return statusConst.Failed
    }
    if (randomNum === 3) {
        return statusConst.Successed
    }
    return statusConst.Running
}