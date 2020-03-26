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
      title: '缩略图',
      dataIndex: 'pic',
    },
    {
      title: '阅读量',
      dataIndex: 'visits',
    },
    {
      title: '点赞数',
      dataIndex: 'likes',
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
    },
  ]

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem> 
        headerTitle="文章表格"
        rowKey="key"
        search={false}
        columns={columns}
      />
    </PageHeaderWrapper>
  )
}

export default Person