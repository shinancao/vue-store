import Store from './core/store.js'
import weStore from './modules/vipStore.js'
let debug = process.env.NODE_ENV !== 'production'
export const AppStore = new Store({
  modules: {
    weStore
  },
  debug: debug
})
