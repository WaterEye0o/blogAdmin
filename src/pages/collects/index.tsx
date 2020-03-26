import { message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';

const Person: React.FC<{}> = () => {
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '请求地址',
      dataIndex: 'apiUrl',
    },
    {
      title: '请求方式',
      dataIndex: 'method',
    },
    {
      title: '接口参数',
      dataIndex: 'params',
    },
    {
      title: '请求时间',
      dataIndex: 'createTime',
    },
  ]

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem> 
        headerTitle="异常表格"
        rowKey="key"
        search={false}
        columns={columns}
      />
    </PageHeaderWrapper>
  )
}

export default Person