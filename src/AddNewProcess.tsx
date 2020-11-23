import {Button, Input, Modal} from 'antd';
import React, {ChangeEvent, useState} from 'react';
import {v1} from 'uuid';
import {useDispatch} from 'react-redux';
import {addProcess} from './bll/processReducer';
import {addJob, randomStatus} from './bll/jobReducer';


export const AddNewProcess = () => {

    const [visible,setVisible]= useState<boolean>(false)
    const[title, setTitle] =useState<string>('')

    const dispatch = useDispatch()

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    function addRandomJobs(processId: string) {

        function getRandomIntInclusive(min: number, max: number) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const randomNum = getRandomIntInclusive(0, 11);

        function randomCreatejobs(num: number) {
            for (let i = 1;num > i; i++ ){
                let title = Math.random().toString(36).substring(7);
                dispatch(addJob(title, v1(), processId,1, randomStatus()));
                console.log('create job')
            }
        }
        randomCreatejobs(randomNum)
    }

    const newId = (): string => {
        return v1()
    }

    const showModal = () => {
        setVisible(true)
        setTitle('')
    };

    const handleOk = () => {
        setVisible(false)
        let newProcessId = newId()
        dispatch(addProcess(title,newProcessId))
        addRandomJobs(newProcessId)
    };

    const handleCancel = () => {
        setVisible(false)

    };




    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add process
            </Button>
            <Modal
                title="Create new process"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input autoFocus={true} placeholder="Input title new process..." value={title} onChange={onChangeTitle}/>
            </Modal>
        </>
    );
}