import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login.vue'
import Header from '@/components/header.vue'
// import Home from '@/views/Home.vue'
import { navBar } from '@/router/nav'
// import caixue from '@/components/saomiao/caixue.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...navBar,
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/scan/caixue',
      name: 'caixue',
      components: {
        default: () => import('@/views/saomiao/caixue.vue'),
        navbar: Header
      }
    },
    {
      path: '/scan/fenzu',
      name: 'fenzu',
      components: {
        default: () => import('@/views/saomiao/fenzu.vue'),
        navbar: Header
      }
    },
    {
      path: '/scan/zhuanyun',
      name: 'zhuanyun',
      components: {
        default: () => import('@/views/saomiao/zhuanyun.vue'),
        navbar: Header
      }
    },
    {
      path: '/scan/zidong',
      name: 'zidong',
      components: {
        default: () => import('@/views/saomiao/zidong.vue'),
        navbar: Header
      }
    },
    {
      path: '/scan/lixin',
      name: 'lixin',
      components: {
        default: () => import('@/views/saomiao/lixin.vue'),
        navbar: Header
      }
    },
  
    // {
    //   path: '/Home',
    //   name: 'home',
    //   component: Home
    // }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    // }
  ]
})
