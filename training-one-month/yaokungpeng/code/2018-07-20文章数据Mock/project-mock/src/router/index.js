import Vue from 'vue'
import Router from 'vue-router'
import Page from '@/components/Page'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/blog/userid01/0'
    },
    {
      path:'/blog/:userid/:pageid',
      name:'Page',
      component:Page
    }
  ]
})
