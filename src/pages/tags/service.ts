import request from '@/utils/request';

export const getList = () => {
  return request('/api/tags')
}
export const addList = (params: {}) => {
  return request('/api/tags/add', {
    method: 'POST',
    data: {
      ...params
    }
  })
}
export const delList = (params: {}) => {
  return request('/api/tags/del', {
    method: 'POST',
    data: {
      ...params
    }
  })
}
export const updateList = (params: {}) => {
  return request('/api/tags/update', {
    method: 'POST',
    data: {
      ...params
    }
  })
}