import * as types from '../types'
export default {
  state: {
    projects: []
  },
  actions: {
    [types.SET_PROJECT_LIST]: ({
      commit
    }) => {
      commit(types.SET_PROJECT_LIST, {
        list: [1, 2, 3]
      })
    }
  },
  mutations: {
    [types.SET_PROJECT_LIST]: (state, {
      list
    }) => {
      state.projects = list
    }
  },
  getters: {
    getProjectList: state => {
      return state.projects
    }
  }
}
