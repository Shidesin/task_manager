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

    const handleOk = () => {
        setVisible(false)
        let newJobId = newId()
        dispatch(addJob(title, newJobId, props.processId))
    };

    const handleCancel = () => {
        setVisible(false)

    };

    return (
        <>
            <Button shape={'circle'} type="primary" onClick={showModal} icon={<FileAddOutlined/>}/>
            <Modal
                title="Create new job"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input autoFocus={true} placeholder="Input title new job..." value={title} onChange={onChangeTitle}/>
            </Modal>
        </>
    )
}

const menu = (processId: string, deleteCallback: (processId: string) => void) =>
    <Menu>
        <Menu.Item>
            <AddJob processId={processId}/>
        </Menu.Item>
        <Menu.Item>
            <Button shape={'circle'} type="primary" onClick={(e) => {
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
        <Dropdown overlay={menu(props.processId, deleteCallback)}>
            <Button shape={'circle'} type={'default'} disabled={true} onClick={e => e.stopPropagation()}
                    icon={<SettingOutlined/>}/>
        </Dropdown>
    )

}