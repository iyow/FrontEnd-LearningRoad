# 2018-07-26 日报

> Mock文章数据模拟

---

## 事宜
- [x] vue-router动态路由，vuex状态管理，axios HTTP请求实现Mock文章数据

## 问题及解决
- vue全局使用axios的方法
    - 结合vue-axios使用
    ```
    //引入
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    Vue.use(VueAxios,axios);
    //使用
    this.axios.get('url').then((res)=>{}).catch((res)=>{});
    ```
    - axios改写为Vue的原型属性
    ```
    //首先在主入口文件中引用并挂载在vue的原型链上
    import axios from 'axios'
    Vue.prototype.$ajax = axios
    //使用
    this.$ajax.get('url').then((res)=>{}).catch((res)=>{})
    ```
    - 结合Vuex的action使用
    ```
    //在vuex的仓库文件中引用，使用action添加方法
    import Vue from 'vue'
    import Vuex from 'vuex'
    import axios from 'axios'
    Vue.use(Vuex)

    const actions = {
        getMyApi({commit}){
            axios.get('url').then((res)=>{
                commit(SOMEMUTATION,res.data);
            })
        }
    }

    // 组件中使用
    this.$store.dispatch('getMyApi');
    ```
- VUE的对象中如果函数使用箭头函数会导致this指向的不是vue实例$vm,而是一个xxxx.a的一个类，尽量不要再VUE所定义的字段里面使用箭头函数
- 在组件初始化时请求文章数据会造成模板中某些数据未定义问题，将数据进行初始化即可解决
