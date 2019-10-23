# javascript中Store模式的简单实现

## 说明

使用Store模式可以用来缓存多个组件间共享的变量，将对变量的改变都集中在一个地方，便于调试管理。同时在vue.js中也能避免通过`$parent`来获取值，`$parent`就像恶魔一样存在代码中，尤其是出现`$parent.$parent.$parent...`，代码调试起来异常困难。

因为项目中没有集成vuex，并且只是想缓存少量数据，于是自己动手封装了一个Store，可以直接移植到其他项目中用。

## 使用

1. 将项目clone到本地后，把Store文件夹拖到项目中。
2. Store/modules/weStore.js是举的一个例子，可以仿照它定义自己的各modules。
3. 在index.js中，AppStore初始化时，注册这些modules。

modules中定义的各项使用说明如下：

```
const state = {
// 定义需要缓存的变量
}

const getters = {
// 定义外部可以获取到的值，可以是state的返回，也可以对state做一些计算后的结果返回
}
// 在vue的组件中将其map到computed中
// 指定需要使用的state即可
computed: {
   ...AppStore.getters(['storeId', 'storeName'])
}

const mutations = {
// 定义对state的修改
}

const actions = {
// 定义外部可执行的操作
}
// 用dispatch来派发这些actions，如下
AppStore.dispatch('updateAll', data)
```