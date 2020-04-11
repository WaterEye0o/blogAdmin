import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { queryUserList } from '@/services/account' 
import { API_CODE } from '@/utils/config'

interface TableListItem {
  id: number;
  nickname: string;
  avatar?: string;
  email: string
}

const Account: React.FC<{}> = () => {
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
  ]

  const [users, setUsers] = useState<TableListItem[]>([])

  useEffect(() => {
    const fetchData = () => {
      queryUserList().then(res => {
        let code = Number(res.code)
        if (code == API_CODE.SUCCESS) setUsers(res.data)
      })
    }
    fetchData()
  }, [])

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem> 
        headerTitle="用户表格"
        rowKey="id"
        search={false}
        columns={columns}
        dataSource={users}
      />
    </PageHeaderWrapper>
  )
}

export default Account