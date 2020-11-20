import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './bll/store';
import {initialStateJobsType} from './bll/jobReducer';

export const ContentBox = () => {

    const jobs = useSelector<AppRootStateType, initialStateJobsType>(state => state.job)

    return(
        <div>

        </div>
    )
}