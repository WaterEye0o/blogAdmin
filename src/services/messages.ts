import request from '@/utils/request';
import { version } from '@/utils/config'

export async function queryMessageList() {
  return await request(`/api/v${version}/message`);
}

export async function delMessageList(params: { id: number }) {
  return await request(`/api/v${version}/message/del`, {
    method: 'POST',
    data: {
      ...params
    }
  });
}