import Vue from 'vue'
import router from '../router'

// Vue 挂载函数
export const getRegisterMethod = (c) => {
  let method = 'component'
  if (c.hasOwnProperty('install')) {
    method = 'use'
  } else if (typeof c === 'function') {
    method = 'proto'
  }
  return method
}
export const registerVueComponent = {
  'use': (c) => {
    Vue.use(c)
  },
  'component': (c) => {
    Vue.component(c.name, c)
  },
  'proto': (c) => {
    Vue.prototype[`$${c.name.toLocaleLowerCase()}`] = c
  }
}
// 生成全局显隐藏插件
export const generatorPopupComponent = (componentName, componentControlFunc, component) => {
  return {
    install (Vue, options) {
      const ComponentConstructor = Vue.extend(component)
      let instance
      const initInstance = () => {
        // router，vuex等需要作为构造函数参数传入才可用
        instance = new ComponentConstructor({ router })
        let Dom = instance.$mount().$el
        document.body.appendChild(Dom)
      }
      Vue.prototype[`$${componentName}`] = {
        show (options) {
          if (!instance) {
            initInstance()
          }
          Object.assign(instance, options)
          instance[componentControlFunc]()
        }
      }
    }
  }
}
