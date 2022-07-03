import React from 'react'
import {Scope} from "../../services/scopeService";
import {FormOutlined,DeleteOutlined} from '@ant-design/icons';
import {Alert} from "../../services/alertService";
import { Button, Table, Tag } from 'antd';
const TenantList = ({
    isLoading,
    tenants,
    showModal,
    getTenants,
    getTenantInfo,
    deleteTenant
}) => {
    const columns = [
        {
            title: 'Tenant Name',
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
                {Scope.checkScopes(['landlord_m_tenants_update']) && (
                 
                    <Button
                        size="small"
                        type="primary" ghost
                       
                        icon={<FormOutlined style={{}}  />}
                        onClick={() => getTenantInfo(key)}
                    />
                   
                )}
                {Scope.checkScopes(['landlord_m_tenants_delete']) && (
                    <Button
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<DeleteOutlined />}
                        onClick={() => Alert.confirm({action: deleteTenant(key)})}
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
                    dataSource={tenants.data}
                    columns={columns}
                    pagination={{
                        total: tenants.total,
                        current: tenants.page,
                        onChange: async (pageNo, perPageNo) => await getTenants(pageNo, perPageNo)
                    }}
                />
    </div>
  )
}

export default TenantList