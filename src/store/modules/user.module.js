import * as types from '../types'
export default {
  state: {
    'userinfo': null,
  },
  actions: {
    [types.SET_USERINFO]: ({
      commit
    },userinfo) => {
      commit(types.SET_USERINFO,userinfo)
    }
  },
  mutations: {
    [types.SET_USERINFO]: (state,userinfo) => {
      state.userinfo = userinfo
      localStorage.setItem('userinfo',JSON.stringify(userinfo))
    }
  },
  getters: {
    getUserinfo: state => {
      if(state.userinfo){
        return state.userinfo
      }
      var localState = localStorage.getItem('userinfo')
      if(localState){
        return JSON.parse(localState)
      }
      return {}
    }
  }
}
