import React from "react";
import {useDispatch} from "react-redux";

import {Button, Col, Form, Input, Modal, Radio, Row, Select} from "antd";

const TenantForm = ({form, state, tenant, addTenant, updateTenant, isLoading, handleOk, roles}) => {
    const dispatch = useDispatch();
    const layout = {labelCol: {span: 8}, wrapperCol: {span: 16}};
    const validateMessages = { required: '${label} is required!' };

    const handleSubmit = async (data) => {
        if (tenant?._id) {
            Object.assign(data, {_id: tenant._id});
            await dispatch(updateTenant(data, handleOk))
        } else
            await dispatch(addTenant(data, handleOk));
            console.log(data);
    };

    const footerButtons = [
        <Button
            form="myForm"
            key="submit"
            htmlType="submit"
            type="primary"
            disabled={isLoading}
            size="medium"
        >
            {isLoading ? 'Loading...' : 'Submit'}
        </Button>
    ];

    return (
        <Row md={12}>
            <Modal
                type={state.modalType}
                title="Tenant Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
                width={1000}
            >
                <Form
                    {...layout}
                    name={'tenantForm'}
                    form={form}
                    id={'myForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Row>
                        <Col md={12}>
                            <Form.Item
                                name="firstName"
                                rules={[{required: true}]}
                                initialValue={tenant?.personal?.firstName ? tenant?.personal?.firstName : null}
                                label="First Name"
                            >
                                <Input placeholder="First Name"/>
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                rules={[{required: true}]}
                                initialValue={tenant?.personal?.lastName ? tenant?.personal?.lastName : null}
                                label="Last Name"
                            >
                                <Input placeholder="Last Name"/>
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                initialValue={tenant?.personal?.phone ? tenant?.personal?.phone : ""}
                                rules={[{required: true}]}
                                label="Phone"
                            >
                                <Input placeholder="Phone"/>
                            </Form.Item>
                            <Form.Item
                                name="username"
                                initialValue={tenant?.username ? tenant?.username : null}
                                rules={[{required: true}]}
                                label="Tenant Name"
                            >
                                <Input placeholder="Tenant Name"/>
                            </Form.Item> 
                            <Form.Item
                                name="email"
                                initialValue={tenant?.email ? tenant?.email : null}
                                rules={[{required: true}]}
                                label="Email"
                            >
                                <Input placeholder="Email"/>
                            </Form.Item>
                            <Form.Item
                                name="flatName"
                                initialValue={tenant?.flat?.flatName ? tenant?.flat?.flatName : null}
                                rules={[{required: true}]}
                                label="Flat Name"
                            >
                                <Input placeholder="Flat Name"/>
                            </Form.Item>
                            <Form.Item
                                name="fathersName"
                                initialValue={tenant?.personal?.fathersName ? tenant?.personal?.fathersName : ""}
                                label="Father's Name"
                            >
                                <Input placeholder="Father's Name"/>
                            </Form.Item>
                            <Form.Item
                                name="fathersPhone"
                                initialValue={tenant?.personal?.fathersPhone ? tenant?.personal?.fathersPhone : ""}
                                label="Father's Phone"
                            >
                                <Input placeholder="Father's Phone"/>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name="mothersName"
                                initialValue={tenant?.personal?.mothersName ? tenant?.personal?.mothersName : ""}
                                label="Mother's Name"
                            >
                                <Input placeholder="Mother's Name"/>
                            </Form.Item>
                            <Form.Item
                                name="mothersPhone"
                                initialValue={tenant?.personal?.mothersPhone ? tenant?.personal?.mothersPhone : ""}
                                label="Mother's Phone"
                            >
                                <Input placeholder="Mother's Phone"/>
                            </Form.Item>
                            <Form.Item
                                name="presentAddress"
                                initialValue={tenant?.personal?.presentAddress ? tenant?.personal?.presentAddress : ""}
                                label="Present Address"
                            >
                                <Input placeholder="Present Address"/>
                            </Form.Item>
                            <Form.Item
                                name="permanentAddress"
                                initialValue={tenant?.personal?.permanentAddress ? tenant?.personal?.permanentAddress : ""}
                                label="Permanent Address"
                            >
                                <Input placeholder="Permanent Address"/>
                            </Form.Item>
                           
                            <Form.Item
                                name="status"
                                initialValue={tenant?.status ? tenant?.status : ''}
                                rules={[{required: true}]}
                                label="Status"
                            >
                                <Select>
                                    <Select.Option value="">Select One</Select.Option>
                                    <Select.Option value="active">Active</Select.Option>
                                    <Select.Option value="inactive">Inactive</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="gender"
                                initialValue={tenant?.personal?.gender ? tenant?.personal?.gender : null}
                                rules={[{required: true}]}
                                label="Gender"
                            >
                                <Radio.Group>
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                           
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Row>
    )
};

export default TenantForm;
