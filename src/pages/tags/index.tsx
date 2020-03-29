import { message, Button, Divider } from 'antd';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { getList, addList, delList, updateList } from './service'
import SubmitForm from './components/submitForm'

const Tags: React.FC<{}> = () => {
  let [ dataSource, setDataSource ] = useState<TableListItem[]>([])
  let [ selectedRows, setSelectedRows ] = useState<TableListItem[]>([])
  let [ modalVisible, handleModalVisible ] = useState(false)
  let [ modalTitle, handleModalTitle ] = useState<string>('新建标签')
  let [ editId, setEditId ] = useState<any>('')
  let actionRef = useRef<ActionType>()
  let columns: ProColumns<TableListItem>[] = [
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
  let handleRemove = async (selectedRows: TableListItem[]) => {
    let hide = message.loading('正在删除')
    if (!selectedRows || selectedRows.length == 0) return false
    let ids: string[] | any = []
    selectedRows.forEach(it => typeof it !== 'undefined' && ids.push(it.id))
    let res = await delList({ id: ids.join(',') })
    res.code == 1 && fetchList() && setSelectedRows([])
    hide()
    // message.success('删除成功')
    return true
  }


  let handleAddAndEdit = async (val: any) => {
    let res: any = false
    if (editId == '') {
      let hide = message.loading('正在添加')
      res = await addList({ val: val })
      hide()
    } else {
      let hide = message.loading('正在修改')
      res = await updateList({ val: val, id: editId })
      hide()
    }
    fetchList()
    if (res.code) return true
    else return false
  }

  let fetchList = async () => {
    let data = await getList()
    setDataSource(data.data)
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
            setEditId('')
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
        onSubmit={async value => {
          const ok = await handleAddAndEdit(value);
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