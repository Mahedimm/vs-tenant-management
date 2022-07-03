import {Button , Table} from "antd";
import React from "react";

import {Alert} from "../../services/alertService";
import { PageHeader } from 'antd';

import {FormOutlined,DeleteOutlined} from '@ant-design/icons';

import {Scope} from "../../services/scopeService";

const RoleList = (
    {
        showModal,
        isLoading,
        roles,
        getRoles,
        roleInfo,
        deleteRole
    }
) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: <div className="text-right">Action</div>,
            dataIndex: '_id',
            key: '_id',
            render: (key) => <div className="text-right">
                {Scope.checkScopes(['landlord_m_roles_update']) && (
                    <Button
                        size="small"
                        type="primary" ghost
                       
                        icon={<FormOutlined style={{}}  />}
                        onClick={() => roleInfo(key)}
                    />
                )}
                {Scope.checkScopes(['um_roles_delete']) && (
                    <Button
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<DeleteOutlined />}
                        onClick={() => Alert.confirm({action: deleteRole(key)})}
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
                    dataSource={roles.data}
                    columns={columns}
                    pagination={{
                        total: roles.total,
                        current: roles.page,
                        onChange: async (pageNo, perPageNo) => await getRoles(pageNo, perPageNo)
                    }}
                />
       
        </div>
    )
}

export default RoleList;
