import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { TableListItem } from './data.d';
import { queryArticleList, deleteArticle } from '@/services/articles'
import { API_CODE } from '@/utils/config'

export interface StateType {
  dataSource: TableListItem[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType | {};
  effects: {
    fetchList: Effect,
    del: Effect
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const model: ModelType = {
  namespace: 'articles',
  state: {
    dataSource: []
  },
  effects: {
    *fetchList({ payload }, { call, put, select }) {
      let result = yield call(queryArticleList)
      let code = Number(result.code)
      if (code == API_CODE.SUCCESS) {
        yield put({
          type: 'queryList',
          payload: result.data
        })
      }
    },
    *del({ payload }, { call, put, select }) {
      yield call(deleteArticle, payload)
    }
  },
  reducers: {
    queryList(state, { type, payload }) {
      return {
        ...state,
        dataSource: payload
      }
    }
  }
}

export default model