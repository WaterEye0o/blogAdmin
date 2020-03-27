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
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '内容',
      dataIndex: 'brief',
    },
    {
      title: '日期时间',
      dataIndex: 'dataTime'
    }
  ]

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem> 
        headerTitle="历程表格"
        rowKey="key"
        search={false}
        columns={columns}
      />
    </PageHeaderWrapper>
  )
}

export default Person