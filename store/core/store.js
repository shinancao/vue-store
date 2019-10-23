export default function Store (args) {
  this.debug = args.debug
  this.state = {}
  this.values = {}
  this.mutations = {}
  this.actions = {}
  this.registerModules(args.modules)
}

Store.prototype.registerModules = function (modules) {
  if (!modules) {
    throw new Error(`Store needs at least one module`)
  }
  Object.keys(modules).forEach(key => {
    let val = modules[key]
    if (val.state) {
      Object.keys(val.state).forEach(name => {
        this.state[name] = val.state[name]
      })
    }
    if (val.getters) {
      Object.keys(val.getters).forEach(name => {
        this.values[name] = val.getters[name]
      })
    }
    if (val.mutations) {
      Object.keys(val.mutations).forEach(name => {
        this.mutations[name] = val.mutations[name]
      })
    }
    if (val.actions) {
      Object.keys(val.actions).forEach(name => {
        this.actions[name] = val.actions[name]
      })
    }
  })
}

Store.prototype.commit = function (name, ...args) {
  const mutations = this.mutations
  if (this.debug) {
    console.log('emit:', name)
  }
  if (mutations[name]) {
    mutations[name].apply(this, [this.state].concat(args))
  } else {
    throw new Error(`Action not found: ${name}`)
  }
}

// 可以将该getter直接放到组件的computed中
Store.prototype.getters = function (args = []) {
  const values = this.values
  const state = this.state
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
  const actions = this.actions
  if (this.debug) {
    console.log('dispatch:', name)
  }
  if (actions[name]) {
    // 此处一定要给commit.bing(this)，否则在外面调用commit时，this就变了
    actions[name].apply(this, [{commit: this.commit.bind(this), state: this.state}].concat(args))
  } else {
    throw new Error(`Action not found: ${name}`)
  }
}
