import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false


function vueGlobalRegister(gVue, component, name) {
  let cString = component.replace(/export default/, 'return')
  let c = new Function(cString)
  let cObj = c()
  gVue.component(name || cObj.name, cObj)
  console.log(c)
  console.log(cString)
  console.log(c())
}


class MatrixView {
  constructor(config) {
    this.core = config.core
    this.rightArea = config.rightArea
  }
  async init() {
    if (this.rightArea.componentList) {
      let result = await axios.all(this.rightArea.componentList.map(url => axios.get(url)))
      console.log('=x=x==安徽省高地阿斯供电所')
      console.log(result)
      result.forEach(c => {
        vueGlobalRegister(Vue, c.data)
      })
    }


    let rightAreaName = 'mx-right-component'
    Vue.prototype.__MXRightSection = rightAreaName
    let res = await axios(this.rightArea.main)

    vueGlobalRegister(Vue, res.data, rightAreaName)


    let hah = router.addRoutes([{
      path: '/mx-right-component',
      name: 'remote',
      component: Vue.component('mx-right-component')
    }])

    // 开始跳转路由
    // 执行第一层beforeEach路由导航函数
    // 执行第二层beforeEach路由导航函数
    router.beforeEach((to, from, next) => {
      console.log(to)
      console.log(from)
      console.log('=x动态修改后的导航路由=xxxxx')
      next()

    })
    console.log(hah)
    console.log(router)




    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')



    // let constructor = Vue.extend(c())
    // yi
    // Object.assign(new constructor(), {
    //   msg: '什么没事没事没事没事没事没事没什么没什么'
    // }).$mount('#__MXRightSection')
    // er
    // let instance = new constructor()
    // let Dom = instance.$mount().$el
    // Object.assign(instance,{msg:'什么没事没事没事没事没事没事没什么没什么'})
    // document.getElementById('__MXRightSection').appendChild(Dom)
    // console.log('=x===x=x=x==constructor====',constructor)
  }
}


let matrixView = new MatrixView({
  compiler:false,
  core: {
    mx: {
      host: '12345'
    }
  },
  rightArea: {
    // 新的语法及新api需要babel转换
    // componentList子组件依赖，需要按照依赖顺序写
    // 最好打包为一个main入口引入
    main: 'http://127.0.0.1:5500/remote-test/src/components/Remote.js',
    componentList: ['http://127.0.0.1:5500/remote-test/src/components/HelloWorld.js', 'http://127.0.0.1:5500/remote-test/src/components/HelloWorld.js', 'http://127.0.0.1:5500/remote-test/src/components/Remote.js']
  }
})
matrixView.init()