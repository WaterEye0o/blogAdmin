import request from '@/utils/request';
import { version } from '@/utils/config'

export async function queryArticleList() {
  return request(`/api/v${version}/article`);
}

export async function deleteArticle(params: { id: number | string }) {
  return request(`/api/v${version}/article/del`, {
    method: 'POST',
    data: {
      ...params
    }
  });
}
