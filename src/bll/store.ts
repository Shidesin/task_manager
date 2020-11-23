import {applyMiddleware, combineReducers, configureStore, createStore} from '@reduxjs/toolkit';
import {processReducer} from './processReducer';
import thunkMiddleware from 'redux-thunk'
import {jobReducer} from './jobReducer';

export function saveState<T>(key: string, state: T) {
    const stateAsString = JSON.stringify(state);
    localStorage.setItem(key, stateAsString)
}
export function restoreState<T>(key: string, defaultState: T) {
    const stateAsString = localStorage.getItem(key);
    if (stateAsString !== null) defaultState = JSON.parse(stateAsString) as T;
    return defaultState;
}


const rootReducer = combineReducers({
    process: processReducer,
    job: jobReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
// })

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));



// @ts-ignore
window.store = store;