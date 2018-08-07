import Vue from 'vue'
import Router from 'vue-router'
import PccWhy from '@/components/main/PccWhy'
import PccDifficult from '@/components/main/PccDifficult'
import PccClass from '@/components/main/PccClass'
import PccServe from '@/components/main/PccServe'
import PccContact from '@/components/main/PccContact'
import PccMain from '@/components/PccMain'

Vue.use(Router)
const routes = [{
  path: '/',
  redirect: '/why'
}, {
  path: '/why',
  name: 'PccWhy',
  component: PccWhy
}, {
  path: '/difficult',
  name: 'PccDifficult',
  component: PccDifficult
}, {
  path: '/class',
  name: 'PccClass',
  component: PccClass
}, {
  path: '/serve',
  name: 'PccServe',
  component: PccServe
}, {
  path: '/contact',
  name: 'PccContact',
  component: PccContact
}, {
  path: '*',
  name: 'canotFound',
  component: PccMain
}
]

export default new Router({
  mode: 'history',
routes})
