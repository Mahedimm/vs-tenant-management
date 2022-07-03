
import {Col, Form, Input, Select,Modal, Button} from "antd";
import React from "react";
import {useDispatch} from "react-redux";
import {Constants} from "../../config/constants";

const FlatForm = (
    {
        form,
        state,
        flat,
        addFlat,
        updateFlat,
        isLoading,
        handleOk
    }
) => {
    const dispatch = useDispatch();
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
    const validateMessages = { required: '${label} is required!' };

    const handleSubmit = async (data) => { console.log(data);
        if (flat._id){
            Object.assign(data, {_id: flat._id});
            await dispatch(updateFlat(data, handleOk))
        } else
            await dispatch(addFlat(data, handleOk));
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
        <Col md={12}>
            <Modal
                type={state.modalType}
                title="Flat Form"
                visible={state.visible}
                onCancel={() => handleOk()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name="flatForm"
                    form={form}
                    id="myForm"
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true }]}
                        initialValue={flat.name ? flat.name : null}
                        label="Flat Name"
                    >
                        <Input placeholder="Name"/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        initialValue={flat.description ? flat.description : null}
                        rules={[{ required: true }]}
                        label="Description"
                    >
                        <Input.TextArea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        initialValue={flat.status ? flat.status : ''}
                        rules={[{ required: true }]}
                        label="Status"
                    >
                        <Select>
                            {Constants.STATUS.map((status, si) => (
                                <Select.Option key={si} value={status.value}>{status.label}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Col>
    )
}

export default FlatForm;
