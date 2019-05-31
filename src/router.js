import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {
        title: '泰斗公众号聊天系统-登录页面',
        keepAlive: true
      },
      component: login
    },
    {
      path: '/main',
      name: 'main',
      meta: {
        title: '泰斗公众号聊天系统-聊天页面',
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "main" */ './views/main.vue')
    }
  ]
})
