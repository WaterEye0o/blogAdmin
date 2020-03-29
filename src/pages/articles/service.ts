import request from '@/utils/request';

export async function queryArticleList() {
  return request('/api/articles');
}

export async function deleteArticle(params: any) {
  return request('/api/articles/del', {
    method: 'POST',
    data: {
      ...params
    }
  });
}
