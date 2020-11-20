export type processStateType = {
    id: string
    name: string
    startTime: string
    jobsCount: number
}

export type initialStateProcessType = Array<processStateType>


export let initialStateProcess: initialStateProcessType = [
    {id: '1', name: 'Initial Process', startTime: new Date().toLocaleDateString(), jobsCount: 1}
]

type ActionType =
    | addProcessType
    | deleteProcessType
    | ReturnType<typeof updateCount>

export const processReducer = (state = initialStateProcess, action: ActionType): Array<processStateType> => {
    switch (action.type) {
        case 'UPDATE_COUNT':
            return state.map( obj => obj.id === action.processId ? {...obj, jobsCount: action.jobs} : obj)
        case 'ADD_PROCESS':
            return [{
                id: action.processId,
                name: action.title,
                startTime: new Date().toLocaleDateString(),
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
export const updateCount = (processId: string, jobs: number) => ({type: 'UPDATE_COUNT',processId, jobs}as const)

export type addProcessType = ReturnType<typeof addProcess>;
export type deleteProcessType = ReturnType<typeof deleteProcess>;