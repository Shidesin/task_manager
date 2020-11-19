import {applyMiddleware, combineReducers, configureStore, createStore} from '@reduxjs/toolkit';
import {processReducer} from './processReducer';
import thunkMiddleware from 'redux-thunk'
import {jobReducer} from './jobReducer';


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