export default {
    // 抽象组件
    abstract: true,
    // props在抽象组件中同样有效
    props: {
        threshold: {
            type: Array
        }
    },

    // render函数
    render() {
        // 没有包装组件的话，我们只能呈现一个子组件。
        try {
            return this.$slots.default[0];
        } catch (e) {
            throw new Error('IntersectionObserver.vue can only render one, and exactly one child component.');
        }
        return null;
    },

    mounted() {
        // 不需要将观察者声明为数据属性，
        // 因为它不需要响应

        this.observer = new IntersectionObserver((entries) => {
            this.$emit(entries[0].isIntersecting ? 'intersect-enter' : 'intersect-leave', [entries[0]]);
        }, {
                threshold: this.threshold || 0
            });

        // 必须等到下一个时刻 子元素才会被渲染
        this.$nextTick(() => {
            this.observer.observe(this.$slots.default[0].elm);
        });
    },

    destroyed() {
        // 取名叫disconnect感觉很奇怪啊，lol
        this.observer.disconnect();
    }
}

// use
/*
<intersection-observer @intersect-enter="handleEnter" @intersect-leave="handleLeave" :threshold="[0, 0.5, 1]">
  <my-honest-to-goodness-component></my-honest-to-goodness-component>
</intersection-observer>
*/