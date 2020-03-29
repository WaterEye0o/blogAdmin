import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { TableListItem } from './data.d';
import { queryArticleList, deleteArticle } from './service' 

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
      yield put({
        type: 'queryList',
        payload: result.list
      })
    },
    *del({ payload }, { call, put, select }) {
      let result = yield call(deleteArticle, payload)
      if (result.code == 1) {
        // let res = yield call(queryArticleList)
        // yield put({
        //   type: 'queryList',
        //   payload: res.list
        // })
      } 
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