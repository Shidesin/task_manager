export type processStateType = {
    id: string
    name: string
    startTime: Date
    jobsCount: number
}

export type initialStateProcessType = Array<processStateType>


export let initialStateProcess: initialStateProcessType = [
    {
        id: '1234',
        name: 'Initial Process',
        startTime: new Date(),
        jobsCount: 1
    }
    ]

type ActionType = ReturnType<typeof addProcess>

export const processReducer = (state = initialStateProcess, action: ActionType): Array<processStateType> => {
    switch (action.type) {
        case 'ADD_PROCESS':
        return [{
            id: action.processId,
            name: action.title,
            startTime: new Date(),
            jobsCount: 0
        }, ...state]
        default:
            return state
    }
}

export const addProcess = (title:string, processId: string) => ({type: 'ADD_PROCESS', title, processId}as const)