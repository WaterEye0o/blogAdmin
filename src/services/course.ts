import request from '@/utils/request';
import { version } from '@/utils/config'

import { TableListItem } from '@/pages/course'

export const queryList = () => {
  return request(`/api/v${version}/course`)
}
export const addList = (params: TableListItem) => {
  return request(`/api/v${version}/course/add`, {
    method: 'POST',
    data: {
      ...params
    }
  })
}
export const delList = (params: { id?: number }) => {
  return request(`/api/v${version}/course/del`, {
    method: 'POST',
    data: {
      ...params
    }
  })
}
export const updateList = (params: TableListItem) => {
  return request(`/api/v${version}/course/update`, {
    method: 'POST',
    data: {
      ...params
    }
  })
}