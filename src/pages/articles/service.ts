import request from '@/utils/request';

export async function queryArticleList() {
  return request('/api/article');
}

export async function deleteArticle(params: any) {
  return request('/api/article/del', {
    method: 'POST',
    data: {
      ...params
    }
  });
}
