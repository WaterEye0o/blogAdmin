import request from '@/utils/request';
import { version } from '@/utils/config'

export async function queryUserList() {
  return await request(`/api/v${version}/user`);
}

