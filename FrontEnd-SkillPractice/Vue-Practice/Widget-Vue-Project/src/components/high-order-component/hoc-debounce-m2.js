// 直接 把按钮组件 封装 生成 新的组件形式
// 可使用该方式 全局复写按钮组件 实现一键热替换(类似monkey patch概念？)
import { debounce } from 'loadsh';
// 导出新组件
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
    mounted() {
        console.log('HOC succeed')
    },
    methods: {
        handleClickLink(event) {
            console.log('debounce')
            // this.$listeners.click为绑定在该组件上的click函数
            debounce(this.$listeners.click, this.wait, this.options)
        }
    },
    render(h) {
        const slots = Object.keys(this.$slots)
            .reduce((arr, key) => arr.concat(this.$slots[key]), [])
            .map(vnode => {
                vnode.context = this._self
                return vnode
            })
        //eg. el-button
        return h('Button', {
            on: {
                click: this.handleClickLink //新组件绑定click事件
            },
            props: this.$props,
            // 透传 scopedSlots
            scopedSlots: this.$scopedSlots,
            attrs: this.$attrs
        }, slots)
    }
}


// 使用方式
// <debounce-button :wait="250" :options="{maxWait: 1000}" @click="clickHandler">测试</debounce-button>