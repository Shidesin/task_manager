import React from 'react';
import {Table} from 'antd';
import {jobType, statusConst} from '../../bll/jobReducer';

type jodPropsType ={
    jobsCurrentProcess: jobType[] | undefined
    currentProcessId: string
}

export const Job = React.memo( (props: jodPropsType) => {


    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name - b.name,
            sortDirections: ['ascend' ,'descend'],
        },
        {
            title: 'Status',
            dataIndex: 'status',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => a.status - b.status,
            sortDirections: ['ascend' ,'descend'],
            render: (status: statusConst) => <>{status}</>
        },
    ];

    const data = props.jobsCurrentProcess;

    return(
        <div >
            <Table  rowKey={obj => obj.id} columns={columns} dataSource={data}  pagination={false} />
        </div>
    )
})