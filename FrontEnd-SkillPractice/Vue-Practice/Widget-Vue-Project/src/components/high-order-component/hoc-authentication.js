// right-hoc,authentication权限验证
export default (Comp, rightType) => ({
    components: {
        Comp,
        NoRightTips,
    },
    computed: {
        hasRight() {
            const { rightList } = this.$store.state.user;
            return rightList.indexOf(rightType);
        }
    },
    render(h) {
        return this.hasRight ? h(Comp, {}) : h(NoRightTips, {});
    }
})





// 提取出错误提示组件: no-right-tips
// export default {
//     template: `<div>不好意思，你没有权限访问本页面</div>`,
//     name: 'no-right-tips'
//   }

/**************** page1.vue ****************/
// export default {
//     template: `<div>欢迎访问 page1 !</div>`,
// }

/**************** page2.vue ****************/
// export default {
//     template: `<div>欢迎访问 page2 !</div>`,
// }






// 使用
// import Router from 'vue-router';
// import rightHoc from './right-hoc';

// // 以下是组件异步加载的写法, 功能上等同于直接import
// const Page1 = resolve => require(['./page1'], resolve);
// const Page2 = resolve => require(['./page2'], resolve);

// export default {
//     routes: [
//         { path: '/page1', component: rightHoc(Page1, 'RIGHT_PAGE_1') },
//         { path: '/page2', component: rightHoc(Page2, 'RIGHT_PAGE_2') },
//     ]
// }