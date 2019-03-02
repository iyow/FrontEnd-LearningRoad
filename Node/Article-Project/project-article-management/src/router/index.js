import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
const Article = ()=> import('@/components/Article')
const Login = ()=> import('@/components/Login')
const NotFound = ()=> import('@/NotFound')
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/article/:aid',
      name: 'Article',
      component: Article
    },
    {
      path: '/articlefix/:aid',
      name: 'ArticleFix',
      component: Article
    },
    {
      path: '/*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
