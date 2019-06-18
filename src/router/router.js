import Vue from 'vue'
import Router from 'vue-router'
import { navBar } from '@/router/nav'
import login from '@/views/login.vue'
import Header from '@/components/header.vue'
import DataSetting from '@/views/set/DataSetting'
import ProjectSetting from '@/views/set/ProjectSetting'
import UserConfiguration from '@/views/set/UserConfiguration'
import cardReader from '@/views/set/cardReader'
import Printer from '@/views/set/Printer'
import Centrifuge from '@/views/set/Centrifuge'
import refrigerator from '@/views/set/refrigerator'

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
      path: '/set/DataSetting',
      components: {
        default: DataSetting,
        navbar: Header
      }
    },
    {
      path: '/set/ProjectSetting',
      components: {
        default: ProjectSetting,
        navbar: Header
      }
    },
    {
      path: '/set/UserConfiguration',
      components: {
        default: UserConfiguration,
        navbar: Header
      }
    },
    {
      path: '/set/cardReader',
      components: {
        default: cardReader,
        navbar: Header
      }
    },
    {
      path: '/set/Printer',
      components: {
        default: Printer,
        navbar: Header
      }
    },
    {
      path: '/set/Centrifuge',
      components: {
        default: Centrifuge,
        navbar: Header
      }
    },
    {
      path: '/set/refrigerator',
      components: {
        default: refrigerator,
        navbar: Header
      }
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
    }
  ]
})
