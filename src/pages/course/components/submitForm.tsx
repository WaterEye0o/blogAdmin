import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, DatePicker  } from 'antd';
import moment from 'moment';

import { TableListItem } from '../index'

interface submitFormProps {
  title: string;
  modalVisible: boolean;
  item: TableListItem | any;
  onSubmit: (fieldsValue: TableListItem) => void;
  onCancel: () => void;
}

const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const submitForm: React.FC<submitFormProps> = props => {
  const { title, modalVisible, onSubmit, onCancel, item } = props;
  const [initVal, setInitVal] = useState<TableListItem>({})
  const [form] = Form.useForm();
  const okHandle = async () => {
    let fieldsValue = await form.validateFields();
    let rangeTimeValue = fieldsValue['date'];
    let params = {
      title: fieldsValue.title,
      brief: fieldsValue.brief,
      dateTime: `${rangeTimeValue[0].format(dateFormat)}-${rangeTimeValue[1].format(dateFormat)}`
    }
    onSubmit(params)
    form.resetFields();
  };

  useEffect(() => {
    if (Object.keys(item).length > 0) {
      const date = item.dateTime && item.dateTime.indexOf('-') > 0? item.dateTime.split('-') : []
      setInitVal({
        title: item.title,
        brief: item.brief,
        date: [moment(date[0], dateFormat), moment(date[1], dateFormat)] 
      })
    }
  }, [])

  return (
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form 
        form={form}
        initialValues={initVal}
      >
        <FormItem
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入标题!' }]}
        >
          <Input placeholder="请输入" allowClear />
        </FormItem>
        <FormItem
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          label="简介"
          name="brief"
          rules={[{ required: true, message: '请输入简介!' }]}
        >
          <TextArea placeholder="请输入" rows={4} allowClear />
        </FormItem>
        <FormItem
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          label="日期时间"
          name="date"
          rules={[{ required: true, message: '请选择时间段!' }]}
        >
          <RangePicker
            format={dateFormat}
            allowClear
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default submitForm;
