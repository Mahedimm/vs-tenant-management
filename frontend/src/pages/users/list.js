import React from 'react'
import {Scope} from "../../services/scopeService";
import {FormOutlined,DeleteOutlined} from '@ant-design/icons';
import {Alert} from "../../services/alertService";
import { Button, Table, Tag } from 'antd';
const UserList = ({
    isLoading,
    users,
    showModal,
    getUsers,
    getUserInfo,
    deleteUser
}) => {
    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status}) => (
              <>
                {status === 'active' ? <Tag color="green">{status}</Tag> : <Tag color="red">{status}</Tag>}
                </>
            )
        },
        {
            title: <div className="text-right">Action</div>,
            dataIndex: '_id',
            key: '_id',
            render: (key) => <div className="text-right">
                {Scope.checkScopes(['landlord_m_users_update']) && (
                 
                    <Button
                        size="small"
                        type="primary" ghost
                       
                        icon={<FormOutlined style={{}}  />}
                        onClick={() => getUserInfo(key)}
                    />
                   
                )}
                {Scope.checkScopes(['landlord_m_users_delete']) && (
                    <Button
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<DeleteOutlined />}
                        onClick={() => Alert.confirm({action: deleteUser(key)})}
                        danger />
                )}
            </div>
        },
    ];
  return (

    <div>
        <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={users.data}
                    columns={columns}
                    pagination={{
                        total: users.total,
                        current: users.page,
                        onChange: async (pageNo, perPageNo) => await getUsers(pageNo, perPageNo)
                    }}
                />
    </div>
  )
}

export default UserList