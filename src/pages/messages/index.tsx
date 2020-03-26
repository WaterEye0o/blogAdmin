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
      title: '留言者',
      dataIndex: 'userName',
    },
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
    },
  ]

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem> 
        headerTitle="留言表格"
        rowKey="key"
        search={false}
        columns={columns}
      />
    </PageHeaderWrapper>
  )
}

export default Person