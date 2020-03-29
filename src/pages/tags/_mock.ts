import { Request, Response } from 'express';
import { createUUID } from '@/utils/utils'
import { TableListItem } from './data.d'

const dataSource: TableListItem[] = []
for (let i= 0; i < 33; i++) {
  dataSource.push({
    title: '标签' + (i + 1),
    id: createUUID(),
    createTime: new Date()
  })
}

const getList = (req: Request, res: Response) => {
  res.json({
    data: dataSource
  })
}

const addAndUpdateList = (req: Request, res: Response) => {
  let { val, id } = req.body
  if (id) {
    dataSource.forEach( it => {
      if (it.id == id) it.title = val
    })
    res.json({ code: 1 })
  } else {
    dataSource.unshift({
      title: val,
      id: createUUID(),
      createTime: new Date()
    })
    res.json({ code: 1 })
  }
}

function delList(req: Request, res: Response) {
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
  'GET  /api/tags': getList,
  'POST /api/tags/add': addAndUpdateList,
  'POST /api/tags/del': delList,
  'POST /api/tags/update': addAndUpdateList,
}