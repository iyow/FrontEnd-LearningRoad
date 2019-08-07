// 看过 Vue 源码的同学可以知道，<keep-alive>、<transition>、<transition-group>等组件
// 组件的实现是一个对象，注意它有一个属性 abstract 为 true，表明是它一个抽象组件。

// 抽象组件与普通组件类似，只是它们不向DOM呈现任何内容。他们只是为现有的行为添加额外的行为。
// 你可能熟悉Vue内置那些抽象组件，如<transition>，<component>和<slot>。

// Vue 的文档没有提这个概念，在抽象组件的生命周期过程中，我们可以对包裹的子组件监听的事件进行拦截，
// 也可以对子组件进行 Dom 操作，从而可以对我们需要的功能进行封装，而不需要关心子组件的具体实现。
import { get, debounce, set } from 'loadsh';

export default {
    name: 'debounce',
    abstract: true, //标记为抽象组件,没有此标记不影响组件正常运行
    props: {
        events: String,
        wait: {
            type: Number,
            default: 0
        },
        options: {
            type: Object,
            default() {
                return {};
            }
        }
    },

    render() {
        let vnode = this.$slots.default[0]; // 子组件的vnode

        if (vnode && this.events) {
            let eventList = this.events.split(',');
            eventList.forEach(eventName => {
                let event = get(vnode, `data.on[${eventName}]`); // 子组件绑定的click事件
                if (typeof event === 'function') {
                    /**
                     * 加上debounce操作, 参数与 lodash 的debounce完全相同
                     */
                    set(vnode, `data.on[${eventName}]`, debounce(event, this.wait, this.options));
                }
            });
        }
        return vnode;
    }
}

// 使用方式
// <debounce events="click" :wait="250" :options="{maxWait: 1000}">
//     <button @click="clickHandler">测试</button>
// </debounce>
// 我们同样可以为输入框的 input 事件进行 debouce 操作

// <debounce events="input" :wait="250" :options="{maxWait: 1000}">
//     <input @input="inputandler" placeholder="输入关键字进行搜索" />
// </debounce>

// Learn From  https://shellming.com/2019/05/06/vue-absract-components/