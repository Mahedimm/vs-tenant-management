import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, PageHeader} from "antd";
import { PlusSquareOutlined } from '@ant-design/icons';
import {
    addUser,
    deleteUser,
    fetchUser,
    fetchUsers,
    resetUserForm,
    updateUser
} from "../../redux/landlord/users/actionCreator";
import {fetchRoles} from "../../redux/utilities/actionCreator";
import UserList from "./list";
import UserForm from "./form";


function UsersData() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.utilities?.loading);
  const users = useSelector(state => state.lmUsers?.users);
  const user = useSelector(state => state.lmUsers?.user);
  const roles = useSelector(state => state.utilities?.roles);
  const [state, setState] = useState({ visible: false });

  useEffect(() => {
    const fetchData = async () => {
        await dispatch(fetchUsers({page: 1, perPage: 10}));
        await dispatch(fetchRoles())
    };
    fetchData().then(r => {});
}, [dispatch]);

const getUsers = async (page, perPage) => await dispatch(fetchUsers({page, perPage}));

const getUserInfo = (_id) => dispatch(fetchUser(_id, showModalEdit));

console.log(users);

const showModal = async type => {
  await setState({ ...state, visible: true });
  await dispatch(resetUserForm());
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
        className="p-4 border-b-2 border-b-red-400"
      subTitle={`List of all ${users.total} users.`}
                onBack={() => window.history.back()}
        title="USERS"

        extra={[
       
        <Button key="1" type="primary" size="large" 
        onClick={() => showModal('primary')}
        >
         <span className="font-semibold hover:text-white/70 ">ADD NEW USER</span> 
        </Button>
      ]}
  />
  <div>
    <UserList
         state={state}
                setState={setState}
                isLoading={isLoading}
                showModal={showModal}
                users={users}
                getUsers={getUsers}
                getUserInfo={getUserInfo}
                deleteUser={deleteUser}
     />
      <UserForm
                form={form}
                state={state}
                isLoading={isLoading}
                handleOk={handleOk}
                user={user}
                roles={roles}
                addUser={addUser}
                updateUser={updateUser}
            />
  </div>
    </div>
  )
}

export default UsersData