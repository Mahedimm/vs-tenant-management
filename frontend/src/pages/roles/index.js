import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, PageHeader } from 'antd';
import RoleForm from "./form";
import RoleList from "./list";
import {AiOutlinePlus} from "react-icons/ai";

import {
    addRole,
    fetchRoles,
    deleteRole,
    fetchRole,
    updateRole,
    resetRoleForm
} from '../../redux/landlord/roles/actionCreator';

const RolesData = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const roles = useSelector(state => state.lmRoles.roles);
    const role = useSelector(state => state.lmRoles.role);
    const [form] = Form.useForm();

    const [state, setState] = useState({ visible: false });

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchRoles({page: 1, perPage: 10}))
        };
        fetchData().then(r => {});
    }, [dispatch]);

    const getRoles = async (page, perPage) => await dispatch(fetchRoles({page, perPage}));
    const roleInfo = (_id) => dispatch(fetchRole(_id, showModalEdit));

    const showModal = async type => {
        await setState({ ...state, visible: true });
        await dispatch(resetRoleForm());
        await form.resetFields();
    };

    const showModalEdit = async () => {
        await setState({ ...state, visible: true });
        await form.resetFields();
    };

    const handleOk = () => {
        setState({ ...state, visible: false });
    };

    return (
        <div>
        <PageHeader className='border-b-2 border-b-red-400'
        ghost={false}
                title="Roles"
                subTitle={`List of all ${roles.total} roles.`}
                onBack={() => window.history.back()}
       
        extra={[
       
        <Button key="1" type="primary" size="large" 
        onClick={() => showModal('primary')} className="flex"
        >
      
       ADD ROLE
        </Button>
      ]}
  />
            <RoleForm
                form={form}
                state={state}
                role={role}
                addRole={addRole}
                updateRole={updateRole}
                handleOk={handleOk}
                isLoading={isLoading}
            />

            <RoleList
                state={state}
                setState={setState}
                showModal={showModal}
                isLoading={isLoading}
                roles={roles}
                getRoles={getRoles}
                roleInfo={roleInfo}
                deleteRole={deleteRole}
            />
        </div>
    );
};

export default RolesData;
