import { message, Button, Divider } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import router from 'umi/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { queryMessageList, delMessageList } from '@/services/messages'
import { API_CODE } from '@/utils/config'
import { TableListItem } from './data.d'

const Message: React.FC<{}> = () => {
  const [messages, setMessages] = useState<TableListItem[]>([])
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
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, index) => (
        <>
          <Button icon={<EditOutlined />} 
            onClick={() => router.push('/articles/edit/' + record.id)} />
           <Divider type="vertical" />
          <Button icon={<DeleteOutlined />} 
            onClick={async () => {
              let hide = message.loading('正在删除')
              await delMessageList({ id: record.id }).then(res => {
                let code = Number(res.code)
                if (code == 1) {
                  hide() 
                  message.success('删除成功') && fetchData()
                } else {
                  hide() 
                }
              })
            }} />
        </>
      ),
    },
  ]

  const fetchData = async () => {
    await queryMessageList().then(res => {
      let code = Number(res.code)
      if (code == API_CODE.SUCCESS) setMessages(res.data)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem> 
        headerTitle="留言表格"
        rowKey="id"
        search={false}
        columns={columns}
        dataSource={messages}
      />
    </PageHeaderWrapper>
  )
}

export default Message