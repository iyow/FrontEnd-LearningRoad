# 2018-07-27 周报

> ## 本周完成工作

- [x] 完成为期三天的青苗训练营
- [x] vue-router动态路由，vuex状态管理，axios HTTP请求实现Mock文章数据展示
- [x] 设计规划文章管理展示系统界面及数据库

> ## 下周工作计划

- 总结汇报新人训项目
- 正式加入OA组

> ## 遇到的问题及解决

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
    - 将axios改写为Vue的原型属性
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
    this.$store.dispatch('getMyApi');
    ```
- VUE的对象中如果函数使用箭头函数会导致this指向的不是vue实例$vm,而是一个xxxx.a的一个类，尽量不要再VUE所定义的字段里面使用箭头函数
- 在组件初始化时请求文章数据会造成模板中某些数据未定义问题，将数据进行初始化即可解决

> ## 产出

- project-mock项目
- 完整的文章管理系统

> ## 学习与反思

- 团队协作，互帮互助，结交好友
- “凡事”全力以赴的精神
- 做教育->爱都不够，要用灵魂
- 做技术->不为繁华易匠心，用技术推动教育进步
- 匠心 -> 爱心+恒心+苦心+七巧玲珑心+寂寞心+金刚心+欢喜心 -> 其人虽已殁，千载有余情
- 好未来的使命，愿景，精神。
- 论复盘的重要性，复盘，围棋术语，也称 “复局”，指对局完毕后，复演该盘棋的记录，以检查对局中招法的优劣与得失关键，应用复盘的方法，向自己学习，随时随地提高自己
- 迈出了第一米剩下的9999米就交由时间来解决
- 心态转变，怎么这样啊->也就这样吧
- 相聚纯于偶然，无需事先安排；欢散纯于必然，无需太过感伤


> ## *Motto：天上的星星永恒坚定，地上的灯火踽踽而行。*