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

  const { title, modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue.val);
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
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="描述"
          name="val"
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default submitForm;
