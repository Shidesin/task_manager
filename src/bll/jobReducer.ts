import {initialStateProcess} from './processReducer';

export type jobType = {
    id: string
    processId: string
    name: string
    status: statusConst
}
enum statusConst {
    Running = 'running',
    Successed = 'successed',
    Failed = 'failed'
}

export type initialStateJobsType = { [key: string]: Array<jobType> }

let initialState: initialStateJobsType = {
    [initialStateProcess[0].id] : [
        {id: '1', name: 'Initial job', processId: initialStateProcess[0].id, status: statusConst.Running}
        ]
}

type ActionType = ReturnType<typeof addJob>

export const jobReducer = (state = initialState, action: ActionType): initialStateJobsType => {
    switch (action.type) {
        case 'SET_JOB':
            return {...state, [action.processId]: []}
        default:
            return state
    }
}

export const addJob = (title:string, processId: string) => ({type: 'SET_JOB', title, processId}as const)