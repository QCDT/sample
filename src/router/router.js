import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import { navBar } from '@/router/nav'
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
      path: '/set/refrigerator',
      components: {
        default: refrigerator,
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
      path: '/set/UserConfiguration',
      components: {
        default: UserConfiguration,
        navbar: Header
      }
    }
  ]
})
