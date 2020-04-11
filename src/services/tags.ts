import request from '@/utils/request';
import { version } from '@/utils/config'

export const queryList = () => {
  return request(`/api/v${version}/tags`)
}
export const addList = (params: { title: string }) => {
  return request(`/api/v${version}/tags/add`, {
    method: 'POST',
    data: {
      ...params
    }
  })
}
export const delList = (params: { id: number }) => {
  return request(`/api/v${version}/tags/del`, {
    method: 'POST',
    data: {
      ...params
    }
  })
}
export const updateList = (params: { id: number, title: string }) => {
  return request(`/api/v${version}/tags/update`, {
    method: 'POST',
    data: {
      ...params
    }
  })
}