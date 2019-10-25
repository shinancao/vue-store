export default function Store (args) {
  this.debug = args.debug
  this.modules = args.modules
  this.currModuleName = ''
}

Store.prototype.commit = function (name, ...args) {
  const mutations = this.modules[this.currModuleName].mutations
  const state = this.modules[this.currModuleName].state
  if (this.debug) {
    console.log('emit:', name)
  }
  if (mutations[name]) {
    mutations[name].apply(this, [state].concat(args))
  } else {
    throw new Error(`Action not found: ${name}`)
  }
}

// 可以将该getter直接放到组件的computed中
Store.prototype.getters = function (moduleName, args = []) {
  const values = this.modules[moduleName].getters
  const state = this.modules[moduleName].state
  const res = {}
  let keys = args
  if (args.length === 0) {
    keys = Object.keys(values)
  }
  keys.forEach(key => {
    res[key] = () => {
      return values[key].apply(this, [state])
    }
  })
  return res
}

Store.prototype.dispatch = function (name, ...args) {
  let moduleName = name.split('/')[0]
  let fnName = name.split('/')[1]
  if (!moduleName || !fnName) {
    throw new Error(`The first param should be moduleName/functionName:${name}`)
  }
  this.currModuleName = moduleName
  const actions = this.modules[moduleName].actions
  const state = this.modules[moduleName].state
  if (this.debug) {
    console.log('dispatch:', name)
  }
  if (actions[fnName]) {
    // 此处一定要给commit.bing(this)，否则在外面调用commit时，this就变了
    actions[fnName].apply(this, [{commit: this.commit.bind(this), state: state}].concat(args))
  } else {
    throw new Error(`Action not found: ${name}`)
  }
}
