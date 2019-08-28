// 不使用第三方库(Vuex等状态管理库)时
// Vue公共状态管理  及 借助 Vue的事件机制(Pub_Sub Pattern)通讯 方法
import Vue from 'vue'
// 直接挂在 Vue构造函数 原型上  注意使用Vue.observable() 让视图响应数据变更
// Vue组件实例 ---> VueComponent ---> Vue
// Vue实例 ---> Vue
Vue.prototype.$publicState = Vue.observable({
    middle: ''
})


// 新创建一个 Vue实例 作为事件总线和数据中心
let BUS = new Vue({
    // 只存在一个实例不需要使用函数模式
    data: {
        isLogin: false,
        middle: ''
    }
})
// 可以单独使用也可以 挂在Vue原型上 使得所有实例都可直接调用
Vue.prototype.$publicBus = BUS

// 公共数据调用方法
// this.$publicState.$data.middle 或者 this.$publicState.middle
// Bus.$data.middle 或者 Bus.middle

// 通讯机制
BUS.$emit()
BUS.$on()
BUS.$off()
BUS.$once()