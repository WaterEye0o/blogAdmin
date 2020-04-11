import { message, Button, Divider } from 'antd';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { StateType } from './model'
import { Dispatch } from 'redux';
import { connect } from 'dva';

interface ArticleListProps {
  articles: StateType
  dispatch: Dispatch<any>
  history: any
}

const Articles: React.FC<ArticleListProps> = (props) => {
  const { dispatch, articles, history } = props
  const { dataSource } = articles
  const [ selectedRows, setSelectedRows ] = useState<TableListItem[]>([])
  const actionRef = useRef<ActionType>()
  const handleRemove = async (selectedRows: TableListItem[]) => {
    console.log(selectedRows)
    let hide = message.loading('正在删除')
    if (!selectedRows || selectedRows.length == 0) return false
    let ids: string[] | any = []
    selectedRows.forEach(it => ids.push(it.id))
    await dispatch({
      type: 'articles/del',
      payload: { id: ids.join(',') }
    })
    fetchData() && setSelectedRows([])
    hide()
    message.success('删除成功')
    return true
  }
  const fetchData = async () => {
    await dispatch({type: 'articles/fetchList'})
  }
  useEffect(() => {
    fetchData()
  }, [])

  let columns: ProColumns<TableListItem>[] = [
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
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, index) => (
        <>
          <Button icon={<EditOutlined />} 
            onClick={() => history.push('/articles/edit/' + record.id)} />
           <Divider type="vertical" />
          <Button icon={<DeleteOutlined />} 
            onClick={async () => {
              let hide = message.loading('正在删除')
              await dispatch({
                type: 'articles/del',
                payload: { id: record.id }
              })
              fetchData() && hide()
              message.success('删除成功')
            }} />
        </>
      ),
    },
  ]

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem> 
        headerTitle="文章表格"
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
          <Button icon={<PlusOutlined />} type="primary" onClick={() => history.push('/articles/add')}>
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
    </PageHeaderWrapper>
  )
}

const mapStateToProps = ({ articles }: { articles: StateType}) => ({ articles })

export default connect(mapStateToProps)(Articles);
