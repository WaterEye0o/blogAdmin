import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

interface submitFormProps {
  title: string;
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const submitForm: React.FC<submitFormProps> = props => {
  const [form] = Form.useForm();

  const { title, modalVisible, onSubmit, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    onSubmit(fieldsValue.desc);
  };
  return (
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          label="标签名"
          name="desc"
          rules={[{ required: true, message: '请输入标签名!' }]}
        >
          <Input placeholder="请输入" allowClear />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default submitForm;
