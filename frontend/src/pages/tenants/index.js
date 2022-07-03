import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, PageHeader} from "antd";
import TenantList from "./list";
import TenantForm from "./form";
// import {Main} from "../../styled";
import {
    addTenant,
    deleteTenant,
    fetchTenant,
    fetchTenants,
    resetTenantForm,
    updateTenant
} from "../../redux/landlord/tenants/actionCreator";
import {fetchRoles} from "../../redux/utilities/actionCreator";

const TenantsData = () => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.utilities?.loading);
  const tenants = useSelector(state => state.lmTenants?.tenants);
  const tenant = useSelector(state => state.lmTenants?.tenant);
  const roles = useSelector(state => state.utilities?.roles);
  const [state, setState] = useState({ visible: false });

  useEffect(() => {
    const fetchData = async () => {
        await dispatch(fetchTenants({page: 1, perPage: 10}));
        await dispatch(fetchRoles())
    };
    fetchData().then(r => {});
}, [dispatch]);

  const getTenants = async (page, perPage) =>   await dispatch(fetchTenants({page, perPage}));
  const getTenantInfo = (_id) => dispatch(fetchTenant(_id, showModalEdit));

  const showModal = async type => {
    await setState({ ...state, visible: true });
    await dispatch(resetTenantForm());
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
          <PageHeader
        className="border-b-2 border-b-red-400"
        title="Tenants"
                subTitle={`List of all ${tenants.total} tenants.`}
                onBack={() => window.history.back()}
     
        extra={[
       
        <Button key="1" type="primary" size="large" 
        onClick={() => showModal('primary')}
        >
         <span className="font-semibold hover:text-white/70 ">ADD NEW TENANT</span> 
        </Button>
      ]}
  />
            <TenantList
         state={state}
                setState={setState}
                isLoading={isLoading}
                showModal={showModal}
                tenants={tenants}
                getTenants={getTenants}
               
                getTenantInfo={getTenantInfo}
                deleteTenant={deleteTenant}
     />
      <TenantForm
                form={form}
                state={state}
                isLoading={isLoading}
                handleOk={handleOk}
                tenant={tenant}
                roles={roles}
                addTenant={addTenant}
                updateTenant={updateTenant}
            />
        </div>
    );
};

export default TenantsData;
