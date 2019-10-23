const state = {
  storeId: '',
  storeName: ''
}

// getters中可以对state做一些计算
const getters = {
  storeId (state) {
    return state.storeId
  },
  storeName (state) {
    return state.storeName
  }
}

const mutations = {
  setStoreId (state, storeId) {
    state.storeId = storeId
  },
  setStoreName (state, storeName) {
    state.storeName = storeName
  }
}

const actions = {
  updateAll ({ commit }, data) {
    Object.keys(data).forEach(key => {
      let name = 'set' + key[0].toUpperCase() + key.slice(1)
      commit(name, data[key])
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
