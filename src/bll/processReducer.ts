import {addJobType, removeTaskType} from './jobReducer';
import {restoreState} from './store';

export type processStateType = {
    id: string
    name: string
    startTime: string
    jobsCount: number
}

export type initialStateProcessType = Array<processStateType>


// let initialStateProcess = restoreState<initialStateProcessType>('stateProcess',[{id: '1', name: 'Initial Process', startTime: '11.11.2020', jobsCount: 1}])


let initialStateProcess: initialStateProcessType = [
    {id: '1', name: 'Initial Process', startTime: '11.11.2020', jobsCount: 1}
];



type ActionType =
    | addProcessType
    | deleteProcessType
    | addJobType
    | removeTaskType

export const processReducer = (state = initialStateProcess, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return state.map( obj => obj.id === action.processId ? {...obj, jobsCount: obj.jobsCount - action.jobCountDecrement} : obj)
        case 'ADD_JOB':
            return state.map( obj => obj.id === action.processId ? {...obj, jobsCount: obj.jobsCount + action.jobCountIncrement} : obj)
        case 'ADD_PROCESS':
            return [{
                id: action.processId,
                name: action.title,
                startTime: new Date().toUTCString(),
                jobsCount: 0
            }, ...state]
        case 'REMOVE_PROCESS':
            return state.filter(process => process.id !== action.processId)
        default:
            return state
    }
}

export const addProcess = (title: string, processId: string) => ({type: 'ADD_PROCESS', title, processId} as const)
export const deleteProcess = (processId: string) => ({type: 'REMOVE_PROCESS', processId} as const)

export type addProcessType = ReturnType<typeof addProcess>;
export type deleteProcessType = ReturnType<typeof deleteProcess>;