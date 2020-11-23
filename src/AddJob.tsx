import React, {ChangeEvent, useState} from 'react'
import {Button, Input, Modal} from 'antd';
import {FileAddOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {v1} from 'uuid';
import {addJob, randomStatus, statusConst} from './bll/jobReducer';

export const AddJob = (props: { processId: string }) => {

    const [visible, setVisible] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('')

    const dispatch = useDispatch();


    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const newId = () => {
        return v1()
    }

    const showModal = (e: any) => {
        e.stopPropagation()
        setVisible(true)
        setTitle('')
    };

    const handleOk = (e: any) => {
        setVisible(false)
        let newJobId = newId()
        dispatch(addJob(title, newJobId, props.processId, 1, randomStatus()));
        e.stopPropagation()
    };

    const handleCancel = (e: any) => {
        setVisible(false)
        e.stopPropagation()
    };

    return (
        <>
            <Button key={props.processId} type="primary" onClick={showModal} icon={<FileAddOutlined/>}/>
            <Modal
                key={props.processId}
                zIndex={3}
                title="Create new job"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input key={props.processId} onClick={e => e.stopPropagation()} autoFocus={true}
                       placeholder="Input title new job..." value={title} onChange={onChangeTitle}/>
            </Modal>
        </>
    )
}