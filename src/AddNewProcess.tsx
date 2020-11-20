import {Button, Input, Modal} from 'antd';
import React, {ChangeEvent, useState} from 'react';
import {v1} from 'uuid';
import {useDispatch} from 'react-redux';
import {addProcess} from './bll/processReducer';


export const AddNewProcess = () => {

    const [visible,setVisible]= useState<boolean>(false)
    const[title, setTitle] =useState<string>('')

    const dispatch = useDispatch()

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const newId = () => {
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