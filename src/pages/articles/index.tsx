import { message, Button } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { any } from 'prop-types';

const temp: TableListItem = { title: '文章测试', brief: '测试简介', pic: '测试图片地址', visits: 10, likes: 10, createTime: '2020/3/27' }

const dataSource: TableListItem[] = []
for (let i = 0; i < 10; i++) {
  dataSource.push({
    ...temp,
    key: i + '-' + i,
    id: i + 1
  })
}

class Articles extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      actionRef: {},
      list: dataSource
    }
  }
  
  handleRemove = (selectedRows: TableListItem[]) => {
    console.log(selectedRows)
    const { list } = this.state
    const hide = message.loading('正在删除')
    if (!selectedRows || selectedRows.length == 0) return false
    for (let o of selectedRows) {
      list.splice(list.indexOf(o), 1)
    }
    this.setState({ list }, () => {
      console.log(this.state)
    })
    hide()
    // message.success('删除成功')
    return true
  }
  handleModalVisible = (flag: boolean) => {

  }
  render() {
    let { list, actionRef } = this.state
    console.log(list)
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
        rowKey="id"
        search={false}
        columns={columns}
        dataSource={list}
        rowSelection={{}}
        actionRef={actionRef}
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => this.handleModalVisible(true)}>
            新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button icon={<DeleteOutlined />} onClick={() => {
              this.handleRemove(selectedRows)
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
}

// const Articles: React.FC<{}> = (props) => {
//   console.log(props)
//   const data = dataSource
//   const [ list, setList ] = useState(dataSource)
//   const [ modalVisible , handleModalVisible ] = useState(false)
//   const actionRef = useRef<ActionType>()
//   const handleRemove = (selectedRows: TableListItem[]) => {
//     console.log(selectedRows)
//     console.log(list)
//     const data = list
//     const hide = message.loading('正在删除')
//     if (!selectedRows || selectedRows.length == 0) return false
//     for (let o of selectedRows) {
//       data.splice(data.indexOf(o), 1)
//     }
    
//     hide()
//     // message.success('删除成功')
//     return true
//   }
//   // dispatch({ type: 'personList/load' })
//   useEffect(() => {
//     setList(data)
//   }, [list])

//   const columns: ProColumns<TableListItem>[] = [
//     {
//       title: '序号',
//       dataIndex: 'id',
//     },
//     {
//       title: '标题',
//       dataIndex: 'title',
//     },
//     {
//       title: '缩略图',
//       dataIndex: 'pic',
//     },
//     {
//       title: '阅读量',
//       dataIndex: 'visits',
//     },
//     {
//       title: '点赞数',
//       dataIndex: 'likes',
//     },
//     {
//       title: '发布时间',
//       dataIndex: 'createTime',
//     },
//   ]

//   return (
//     <PageHeaderWrapper>
//       <ProTable<TableListItem> 
//         headerTitle="文章表格"
//         rowKey="id"
//         search={false}
//         columns={columns}
//         dataSource={list}
//         rowSelection={{}}
//         actionRef={actionRef}
//         toolBarRender={(action, { selectedRows }) => [
//           <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
//             新建
//           </Button>,
//           selectedRows && selectedRows.length > 0 && (
//             <Button icon={<DeleteOutlined />} onClick={() => {
//               handleRemove(selectedRows)
//               action.reload()
//             }}>
//               批量操作
//             </Button>
//           ),
//         ]}
//       />
//     </PageHeaderWrapper>
//   )
// }

export default Articles
