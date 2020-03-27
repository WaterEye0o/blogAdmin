import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { TableListItem } from './data.d';

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
    // load: Effect
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const temp: TableListItem = { title: '文章测试', brief: '测试简介', pic: '测试图片地址', visits: 10, likes: 10, createTime: '2020/3/27' }
const data: TableListItem[] = []
for (let i = 0; i < 10; i++) {
  data.push({
    ...temp,
    key: i + '-' + i,
    id: i + 1
  })
}

const model: ModelType = {
  namespace: 'personList',
  state: {
    dataSource: []
  },
  effects: {
    // *load({ payload }, { call, put, select }) {
    //   console.log('hahh')
    //   yield put({
    //     type: 'queryList', 
    //     payload: {
    //       data: data
    //     }
    //   })
    // }
  },
  reducers: {
    queryList(state, { type, payload }) {
      return {
        ...state,
        dataSource: payload.data
      }
    }
  }
}

// export default model