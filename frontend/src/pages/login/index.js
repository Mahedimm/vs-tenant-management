import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authentication/actionCreator';
function Login() {

  const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const [form] = Form.useForm();

  const handleSubmit= (data) => {
    console.log('Success:', data);
    dispatch(login(data));
  };

  const onSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="flex flex-col justify-center items-center w-full m-auto h-screen">
   
    <div className="border-4 border-red-400 md:w-[40%] md:h-[60%] h-full w-full p-4 rounded-lg flex flex-col justify-center items-center shadow-md">
    <h1 className="border-b-2 font-black">Tenant Management</h1>
        <h1 className='mb-10 text-4xl font-black text-red-400
        '>LOG IN</h1>
        <Form className=" w-[80%]  "
      name="basic"
      labelCol={{
       
      }}
      wrapperCol={{
      
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      form={form}
      autoComplete="off"
    >
      <Form.Item className="font-bold"
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input placeholder="enter your username" />
      </Form.Item>

      <Form.Item className="font-bold"
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password placeholder="enter your password" />
      </Form.Item>

   

      <Form.Item className=""
        wrapperCol={{
          offset: 10,
          span: 16,
        }}
      >
        <Button  className="p-5 " size= 'large' type="primary" shape="round" htmlType="submit">
          {isLoading ? 'Loading...' : 'Log in'}
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
  )
}

export default Login