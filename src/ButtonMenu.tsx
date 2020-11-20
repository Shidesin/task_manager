import React, {ChangeEvent, useState} from 'react'
import {Button, Dropdown, Input, Menu, Modal} from 'antd';
import {DeleteOutlined, FileAddOutlined, SettingOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {v1} from 'uuid';
import {addJob} from './bll/jobReducer';
import {deleteProcess} from './bll/processReducer';

const AddJob = (props: { processId: string }) => {

    const [visible, setVisible] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('')

    const dispatch = useDispatch()

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
        dispatch(addJob(title, newJobId, props.processId));
        e.stopPropagation()
    };

    const handleCancel = (e: any) => {
        setVisible(false)
        e.stopPropagation()
    };

    return (
        <>
            <Button key={props.processId} shape={'circle'} type="primary" onClick={showModal} icon={<FileAddOutlined/>}/>
            <Modal
                key={props.processId}
                zIndex={3}
                title="Create new job"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input key={props.processId} onClick={e => e.stopPropagation()} autoFocus={true} placeholder="Input title new job..." value={title} onChange={onChangeTitle}/>
            </Modal>
        </>
    )
}

const menu = (processId: string, deleteCallback: (processId: string) => void) =>
    <Menu key={processId}>
        <Menu.Item key={processId}>
            <AddJob key={processId} processId={processId}/>
        </Menu.Item>
        <Menu.Item key={processId}>
            <Button key={processId} shape={'circle'} type="primary" onClick={(e) => {
                e.stopPropagation()
                deleteCallback(processId)
            }
            } icon={<DeleteOutlined/>}/>
        </Menu.Item>
    </Menu>
;

export const ButtonMenu = (props: { processId: string }) => {

    const dispatch = useDispatch();

    const deleteCallback = (processId: string) => {
        dispatch(deleteProcess(processId))
    }

    return (
        <Dropdown key={props.processId} overlay={menu(props.processId, deleteCallback)}>
            <Button key={props.processId} shape={'circle'} type={'default'} disabled={true} onClick={e => e.stopPropagation()}
                    icon={<SettingOutlined/>}/>
        </Dropdown>
    )

}