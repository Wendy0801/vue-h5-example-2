import * as types from '../types'
export default {
  state: {
    'loadingNow': true,
    'enterHash': '',
    'isApp': false,
    'isWechat': false,
    'actionStatu': { // 操作状态
      'type': 'info', // 提示类型 : info , warning ,error ,success
      'message': ''
    },
  },
  actions: {
    [types.TOGGLE_LOAD_STATU]: ({
      commit
    }, flag) => {
      commit(types.TOGGLE_LOAD_STATU, flag)
    },
    [types.SET_ACTION_STATU]: ({
      commit
    }, data) => {
      commit(types.SET_ACTION_STATU, data)
    },
    [types.SET_IS_WECHAT]: ({ commit }, flag) => {
      commit(types.SET_IS_WECHAT, flag)
    },
    [types.SET_IS_APP]: ({ commit }, flag) => {
      commit(types.SET_IS_APP, flag)
    }
  },
  mutations: {
    [types.TOGGLE_LOAD_STATU]: (state, flag) => {
      state.loadingNow = flag
    },
    [types.SET_ACTION_STATU]: (state, data) => {
      state.actionStatu = data
    },
    [types.SET_IS_WECHAT]: (state, flag) => {
      state.isWechat = flag
    },
    [types.SET_IS_APP]: (state, flag) => {
      state.isApp = flag
    },
  },
  getters: {
    getLoadingStatu: state => {
      return state.loadingNow
    },
    getActionStatu: state => {
      return state.actionStatu
    },
    getIsWechat: state => {
      return state.isWechat
    },
    getIsApp: state => {
      return state.isApp
    }
  }
}
