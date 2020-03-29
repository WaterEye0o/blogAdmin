import { Request, Response } from 'express';
import { createUUID } from '@/utils/utils'
import { TableListItem } from './data.d'

const temp: TableListItem = { title: '文章测试', brief: '测试简介', pic: '测试图片地址', visits: 10, likes: 10, createTime: '2020/3/27' }

const dataSource: TableListItem[] = []
for (let i = 0; i < 33; i++) {
  dataSource.push({
    ...temp,
    id: createUUID()
  })
}

function getList(req: Request, res: Response) {
  res.json({
    list: dataSource
  })
}

function delArticles(req: Request, res: Response) {
  let { id } = req.body
  if(!id) {
    res.json({
      code: 0
    })
  }
  if (id.indexOf(',') > -1) {
    let ids = id.split(',')
    ids.forEach((it: string, i: number) => {
      for (let o of dataSource) {
        if (o.id == it) dataSource.splice(dataSource.indexOf(o), 1)
      }
    })
  } else {
    let index: number = 0
    for (let i = 0; i < dataSource.length; i++) {
      if (dataSource[i].id == id) index = i
    }
    dataSource.splice(index, 1)
  }
  res.json({
    code: 1
  })
}

export default {
  'GET  /api/articles': getList,
  'POST /api/articles/del': delArticles
};