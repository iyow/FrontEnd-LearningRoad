// 直接 把按钮组件 封装 生成 新的组件形式
// 可使用该方式 全局复写按钮组件 实现一键热替换(类似monkey patch概念？)
import { debounce } from 'loadsh';


function hoc(WrappedComponent, options) {
  return {
    inheritAttrs: false,
    mounted() {
      console.log('I have already mounted')
    },
    render(h) {
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        .map(vnode => {
          vnode.context = this._self
          return vnode
        })

      return h(WrappedComponent, {
        on: this.$listeners,
        props: this.$props,
        // 透传 scopedSlots
        scopedSlots: this.$scopedSlots,
        attrs: this.$attrs,
        ...options.call(this)
      }, slots)
    }
  }
}

export default {
  name: 'DebounceButton',
  props: {
    wait: {
      type: Number,
      default: 300
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  ...hoc('button', function () {
    return {
      on: {
        ...this.$listeners,
        click: debounce(this.$listeners.click, this.wait, this.options)
      }
    }
  })
}

// 使用方式
// 全局或局部注册后
// <debounce-button :wait="250" :options="{maxWait: 1000}" @click="clickHandler">测试</debounce-button>



// 导出新组件
// export default {
//   name: 'DebounceButton',
//   inheritAttrs: false,
//   props: {
//     wait: {
//       type: Number,
//       default: 300
//     },
//     options: {
//       type: Object,
//       default() {
//         return {};
//       }
//     }
//   },
//   mounted() {
//     console.log('HOC succeed')
//   },
//   render(h) {
//     const slots = Object.keys(this.$slots)
//       .reduce((arr, key) => arr.concat(this.$slots[key]), [])
//       .map(vnode => {
//         vnode.context = this._self
//         return vnode
//       })
//     //eg. el-button
//     return h('Button', {
//       on: {
//         click: debounce(this.$listeners.click, this.wait, this.options)
//       },
//       props: this.$props,
//       // 透传 scopedSlots
//       scopedSlots: this.$scopedSlots,
//       attrs: this.$attrs
//     }, slots)
//   }
// }