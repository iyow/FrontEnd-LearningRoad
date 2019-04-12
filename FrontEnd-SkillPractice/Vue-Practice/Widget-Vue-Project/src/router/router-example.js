import Vue from 'vue'
import Router from 'vue-router'
// 一级
// views
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login')
const Matrix = () => import(/* webpackChunkName: "matrix" */ '@/views/Matrix')
const Debug = () => import(/* webpackChunkName: "debug" */ '@/views/Debug')
// const RemoteOperation = () => import(/* webpackChunkName: "remoteoperation" */'@/views/RemoteOperation/RemoteOperation')

// 二级
// aside-list
const Session = () => import(/* webpackChunkName: "chat" */ '@/components/matrix-aside-list/Session')
const Contact = () => import(/* webpackChunkName: "contact-infos" */ '@/components/matrix-aside-list/Contact')
const ToolList = () => import(/* webpackChunkName: "more-tools" */ '@/components/matrix-aside-list/ToolList')
// right-container
const Chat = () => import(/* webpackChunkName: "chat" */ '@/components/matrix-chat')
const ContactInfos = () => import(/* webpackChunkName: "contact-infos" */ '@/components/matrix-contact-infos')
const MoreTools = () => import(/* webpackChunkName: "more-tools" */ '@/components/matrix-more-tools')

// 三级
// chat/tutor
const Tutor = () => import(/* webpackChunkName: "chat-tutor" */ '@/components/matrix-chat/tutor')
// contact-infos
const NewFriendList = () => import(/* webpackChunkName: "contact-infos" */ '@/components/matrix-contact-infos/NewFriendList')
const GroupList = () => import(/* webpackChunkName: "contact-infos" */ '@/components/matrix-contact-infos/GroupList')
const FriendList = () => import(/* webpackChunkName: "contact-infos" */ '@/components/matrix-contact-infos/FriendList')
// more-tools
const mass = () => import(/* webpackChunkName: "more-tools" */ '@/components/matrix-more-tools/mass')
const bind = () => import(/* webpackChunkName: "more-tools" */ '@/components/matrix-more-tools/bind')
const notice = () => import(/* webpackChunkName: "more-tools" */ '@/components/matrix-more-tools/notice')
const setting = () => import(/* webpackChunkName: "more-tools" */ '@/components/matrix-more-tools/setting')

const ChatChildrends = [{
  path: 'tutor',
  component: Tutor
}]

const ContactInfosChildrends = [{
  path: 'newfriend',
  name: 'NewFriend',
  component: NewFriendList
}, {
  path: 'group',
  name: 'Group',
  component: GroupList
}, {
  path: 'friend',
  name: 'Friend',
  component: FriendList
}]

const MoreToolsChildrens = [{
  path: 'mass',
  component: mass
}, {
  path: 'bind',
  component: bind
}, {
  path: 'notice',
  component: notice
}, {
  path: 'setting',
  component: setting
}]

const MatrixChildrens = [{
  path: 'chat',
  components: {
    'aside-list': Session,
    'right-container': Chat
  },
  children: ChatChildrends
}, {
  path: 'contact-infos',
  redirect: 'contact-infos/newfriend',
  components: {
    'aside-list': Contact,
    'right-container': ContactInfos
  },
  props: { 'right-container': (route) => ({ 'contactType': route.name }) },
  children: ContactInfosChildrends
}, {
  path: 'more-tools',
  redirect: 'more-tools/mass',
  components: {
    'aside-list': ToolList,
    'right-container': MoreTools
  },
  children: MoreToolsChildrens
}]

Vue.use(Router)
const routers = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/matrix',
    redirect: '/matrix/chat'
  },
  {
    path: '/matrix',
    name: 'Matrix',
    component: Matrix,
    children: MatrixChildrens
  },
  {
    path: '/debug',
    name: 'Debug',
    component: Debug
  },
  // {
  //   path: '/remoteoperation',
  //   name: 'RemoteOperation',
  //   component: RemoteOperation
  // },
  {
    path: '*',
    redirect: '/login'
  }
  ]
})

routers.beforeEach((to, from, next) => {
  console.log('============from', from.path)
  console.log('============to', to.path)
  let white = ['/login', '/debug']
  if (!global.isLogin() && !~white.indexOf(to.path)) {
    next('/login')
  } else {
    // 判断用户类型
    if (to.path === '/matrix/chat') {
      next('/matrix/chat/tutor')
    } else {
      next()
    }
  }
})

export default routers
