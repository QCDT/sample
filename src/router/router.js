import Vue from 'vue'
import Router from 'vue-router'
import { navBar } from '@/router/nav'
import login from '@/views/login.vue'
import Header from '@/components/header.vue'
import DataSetting from '@/views/set/DataSetting'
import ProjectSetting from '@/views/set/ProjectSetting/index'
import UserConfiguration from '@/views/set/UserConfiguration'
import cardReader from '@/views/set/cardReader'
import Printer from '@/views/set/Printer'
import Centrifuge from '@/views/set/Centrifuge'
import refrigerator from '@/views/set/refrigerator'
import choicelaboratory from '@/views/set/refrigerator/choicelaboratory'

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
    //  数据设置页
    {
      path: '/set/DataSetting',
      components: {
        default: DataSetting,
        navbar: Header
      }
    },
    // 项目设置页
    {
      path: '/set/ProjectSetting',
      components: {
        default: ProjectSetting,
        navbar: Header
      }
    },
    // 用户设置页
    {
      path: '/set/UserConfiguration',
      components: {
        default: UserConfiguration,
        navbar: Header
      }
    },
    // 读卡器设置
    {
      path: '/set/cardReader',
      components: {
        default: cardReader,
        navbar: Header
      }
    },
    // 打印机设置
    {
      path: '/set/Printer',
      components: {
        default: Printer,
        navbar: Header
      }
    },
    // 离心机设置
    {
      path: '/set/Centrifuge',
      components: {
        default: Centrifuge,
        navbar: Header
      }
    },
    // 冰箱设置
    {
      path: '/set/refrigerator',
      components: {
        default: refrigerator,
        navbar: Header
      }
    },
    {
      path: '/set/refrigerator/choicelaboratory',
      components: {
        default: choicelaboratory,
        navbar: Header
      }
    },
    // scan为扫描页面
    {
      path: '/scan/caixue',
      name: 'caixue',
      components: {
        default: () => import('@/views/Scan/saomiao/caixue'),
        navbar: Header
      }
    },
    // 检测计划
    {
      path: '/scan/detection',
      name: 'detection',
      components: {
        default: () => import('@/views/Scan/saomiao/Detection/index.vue'),
        navbar: Header
      }
    },
    {
      path: '/scan/fenzu',
      name: 'fenzu',
      components: {
        default: () => import('@/views/Scan/saomiao/FenZuHeYan/index.vue'),
        navbar: Header
      }
    },
    {
      path: '/scan/transport',
      name: 'zhuanyun',
      components: {
        default: () => import('@/views/Scan/saomiao/zhuanyun.vue'),
        navbar: Header
      }
    },
    // 转入
    {
      path: '/scan/transport/in',
      name: 'zhuanru',
      components: {
        default: () => import('@/views/Scan-Transport-In/index.vue'),
        navbar: Header
      }
    },
    // 转出
    {
      path: '/scan/transport/out',
      name: 'zhuanchu',
      components: {
        default: () => import('@/views/Scan-Transport-Out/index.vue'),
        navbar: Header
      }
    },
    // 转出里边的修改
    {
      path: '/scan/transport/out/change',
      name: 'outchange',
      components: {
        default: () => import('@/views/Scan-Transport-Out-Change/index.vue'),
        navbar: Header
      }
    },
    // 修改转运样本盒
    {
      path: '/scan/transport/out/change/eidt',
      name: 'outchangeedit',
      components: {
        default: () => import('@/views/Scan-Transport-Out-Change-Edit/index.vue'),
        navbar: Header
      }
    },
    // 盘点
    {
      path: '/scan/transport/out/change/eidt/check',
      name: 'check',
      components: {
        default: () => import('@/views/Scan-Transport-Out-Change-Check/index.vue'),
        navbar: Header
      }
    },
    {
      path: '/scan/zidong',
      name: 'zidong',
      components: {
        default: () => import('@/views/Scan/saomiao/zidong.vue'),
        navbar: Header
      }
    },
    {
      path: '/scan/lixin',
      name: 'lixin',
      components: {
        default: () => import('@/views/Scan/saomiao/lixin.vue'),
        navbar: Header
      }
    },
    // 借出
    {
      path: '/scan/loan123',
      name: 'loan',
      components: {
        default: () => import('@/views/Scan/botGropLink/Loan/index.vue'),
        navbar: Header
      }
    },
    // 归还
    {
      path: '/scan/guihuan啊士大夫立刻',
      name: 'guihuan',
      components: {
        default: () => import('@/views/Scan/botGropLink/guihuan.vue'),
        navbar: Header
      }
    },
    // 垃圾
    {
      path: '/scan/laji',
      name: 'laji',
      components: {
        default: () => import('@/views/Scan/botGropLink/laji.vue'),
        navbar: Header
      }
    },
    // 标签
    {
      path: '/scan/biaoqian',
      name: 'biaoqian',
      components: {
        default: () => import('@/views/Scan/botGropLink/biaoqian.vue'),
        navbar: Header
      }
    },
    // 转运
    {
      path: '/scan/zhuanyunbot',
      name: 'zhuanyunbot',
      components: {
        default: () => import('@/views/Scan/botGropLink/zhuanyunbot.vue'),
        navbar: Header
      }
    },
    //  ↓ 查询 [日志信息] [样本信息]
    {
      path: '/query/log',
      name: 'log',
      components: {
        default: () => import('@/views/Query/Log/index.vue'),
        navbar: Header
      }
    },
    {
      path: '/query/sample',
      name: 'sample',
      components: {
        default: () => import('@/views/Query/Sample/index.vue'),
        navbar: Header
      }
    },
    // 修改样本
    {
      path: '/query/changsample',
      name: 'changsample',
      components: {
        default: () => import('@/views/Query/ChangeSample/index.vue'),
        navbar: Header
      }
    },
    // 转移
    {
      path: '/query/transfer',
      name: 'transfer',
      components: {
        default: () => import('@/views/Query/Transfer/index.vue'),
        navbar: Header
      }
    },
    //  ↓ test.vue
    {
      path: '/test',
      name: 'test',
      components: {
        default: () => import('@/views/TEST.vue'),
        navbar: Header
      }
    }
  ]
})
