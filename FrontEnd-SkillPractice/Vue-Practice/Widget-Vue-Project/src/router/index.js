import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PhotoWall from '@/components/PhotoWall'
import JellyMenu from '@/components/menu/JellyMenu'
import PoppingMenu from '@/components/menu/PoppingMenu'
import NotFound from '@/components/404'

Vue.use(Router)
const routes = [{
    path: '/',
    redirect: '/HelloWorld'
  }, {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/PhotoWall',
    name: 'PhotoWall',
    component: PhotoWall
  },
  {
    path: '/Menu/JellyMenu',
    name: 'JellyMenu',
    component: JellyMenu
  }, {
    path: '/Menu/PoppingMenu',
    name: 'PoppingMenu',
    component: PoppingMenu
  },
  {
    path: '404',
    name: 'NotFound',
    component: NotFound
  }, {
    path: '*',
    name: 'Globbing',
    component: NotFound
  }
]

export default new Router({
  mode: 'history',
  routes
})