import { message, Button, Divider } from 'antd';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { queryList, addList, delList, updateList } from '@/services/tags'
import SubmitForm from './components/submitForm'
import { API_CODE } from '@/utils/config'

interface TableListItem {
  id: number;
  title: string;
  createTime?: string;
}


const Tags: React.FC<{}> = () => {
  const [ dataSource, setDataSource ] = useState<TableListItem[]>([])
  const [ selectedRows, setSelectedRows ] = useState<TableListItem[]>([])
  const [ modalVisible, handleModalVisible ] = useState<boolean>(false)
  const [ modalTitle, handleModalTitle ] = useState<string>('新建标签')
  const [ editId, setEditId ] = useState<number>(0)
  const actionRef = useRef<ActionType>()
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '标签名',
      dataIndex: 'title',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, index) => (
        <>
          <Button icon={<EditOutlined />} 
            onClick={() => {
              setEditId(record.id)
              handleModalTitle('编辑标签')  
              handleModalVisible(true)
            }} />
          <Divider type="vertical" />
          <Button icon={<DeleteOutlined />} 
            onClick={async () => {
              let hide = message.loading('正在删除')
              let res = await delList({ id: record.id })
              res.code == 1 && fetchList() 
              hide()
            }} />
        </>
      ),
    },
  ]
  const handleRemove = async (selectedRows: TableListItem[]) => {
    let hide = message.loading('正在删除')
    if (!selectedRows || selectedRows.length == 0) return false
    let ids: string[] | any = []
    selectedRows.forEach(it => typeof it !== 'undefined' && ids.push(it.id))
    let res = await delList({ id: ids.join(',') })
    Number(res.code) == API_CODE.SUCCESS && fetchList() && setSelectedRows([])
    hide()
    message.success('删除成功')
    return true
  }


  const handleAddAndEdit = async (val: any) => {
    let res: any = false, hide = null
    if (editId == 0) {
      hide = message.loading('正在添加')
      res = await addList({ title: val })
      hide()
      message.success('添加成功')
    } else {
      hide = message.loading('正在修改')
      res = await updateList({ title: val, id: editId })
      hide()
      message.success('修改成功')
    }
    fetchList()
    if (Number(res.code) == API_CODE.SUCCESS) return true
    else return false
  }

  const fetchList = async () => {
    let res = await queryList()
    setDataSource(res.data)
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem> 
        headerTitle="标签表格"
        rowKey="id"
        search={false}
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRows(selectedRows)
          }
        }}
        actionRef={actionRef}
        toolBarRender={(action) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => {
            setEditId(0)
            handleModalTitle('新建标签')  
            handleModalVisible(true)
          }}>
            新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button icon={<DeleteOutlined />} onClick={async () => {
              await handleRemove(selectedRows)
              action.reload()
            }}>
              批量操作
            </Button>
          ),
        ]}
      />
      { modalVisible && <SubmitForm
        title={modalTitle}
        modalVisible={modalVisible}
        onCancel={() => handleModalVisible(false)}
        onSubmit={async (value) => {
          let ok = await handleAddAndEdit(value);
          if (ok) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      /> }
    </PageHeaderWrapper>
  )
}

export default Tags