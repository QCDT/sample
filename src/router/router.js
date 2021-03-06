import Vue from 'vue'
import Router from 'vue-router'
import { navBar } from '@/router/nav'
import login from '@/views/login.vue'
import Header from '@/components/header.vue'
import DataSetting from '@/views/set/DataSetting'
import ProjectSetting from '@/views/set/ProjectSetting/index.vue'
import UserConfiguration from '@/views/set/UserConfiguration.vue'
import cardReader from '@/views/set/cardReader'
import Printer from '@/views/set/Printer.vue'
import Centrifuge from '@/views/set/Centrifuge'
import refrigerator from '@/views/set/refrigerator'
import choicelaboratory from '@/views/set/refrigerator/choicelaboratory'
import equipmentInfo from '@/views/set/refrigerator/equipmentInfo'
import equipmentConstruction from '@/views/set/refrigerator/equipmentConstruction'
import receive from '@/views/Scan/saomiao/receive'
import { zlRouter } from './zl'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...navBar,
    ...zlRouter,
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
    {
      path: '/set/refrigerator/equipmentInfo',
      components: {
        default: equipmentInfo,
        navbar: Header
      }
    },
    {
      path: '/set/refrigerator/equipmentConstruction',
      components: {
        default: equipmentConstruction,
        navbar: Header
      }
    },
    // 检测计划
    {
      path: '/scan/detection',
      name: 'detection',
      component: () => import('@/views/Scan-Detection/index.vue')
    },
    /* 患者采血 */
    {
      path: '/scan/blood-collection',
      name: 'caixue',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection'),
        navbar: Header
      }
    },
    /* 单人核验 */
    {
      path: '/scan/blood-collection/checksingle',
      name: 'checkSingle',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CheckSingle'),
        navbar: Header
      },
      redirect: '/scan/blood-collection/checksingle',
      children: [
        {
          /* 患者信息 */
          path: '/scan/blood-collection/checksingle',
          name: 'patientInformation',
          components: {
            default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CheckSingle/CheckSingle'),
            navbar: Header
          }
        },
        {
          /* 订单信息 */
          path: '/scan/blood-collection/order-information',
          name: 'patientOrderInfo',
          components: {
            default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CheckSingle/PatientOrderInfo'),
            navbar: Header
          }
        },
        {
          /* 患者核验 */
          path: '/scan/blood-collection/order-information/check',
          name: 'patientsCheck',
          components: {
            default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CheckSingle/patientsCheck'),
            navbar: Header
          }
        }

      ]
    },
    /* 多人核验 */
    {
      path: '/scan/blood-collection/checkmore',
      name: 'checkMore',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CheckMore'),
        navbar: Header
      },
      redirect: '/scan/blood-collection/checkmore-1',
      children: [
        {
          path: '/scan/blood-collection/checkmore-1',
          name: 'checkMore-1',
          components: {
            default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CheckMore/CheckMore-1'),
            navbar: Header
          }
        },
        {
          path: '/scan/blood-collection/checkmore-2',
          name: 'checkMore-2',
          components: {
            default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CheckMore/CheckMore-2'),
            navbar: Header
          }
        },
        {
          path: '/scan/blood-collection/checkmore-3',
          name: 'checkMore-3',
          components: {
            default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CheckMore/CheckMore-3'),
            navbar: Header
          }
        }
      ]
    },
    /* 创建单人核验 */
    {
      path: '/scan/blood-collection/createsingle',
      name: 'createSingle',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CreateSingle'),
        navbar: Header
      },
      redirect: '/scan/blood-collection/createsingle-1',
      children: [
        {
          path: '/scan/blood-collection/createsingle-1',
          name: 'createSingle-1',
          components: {
            default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CreateSingle/createSingle-1'),
            navbar: Header
          }
        },
        {
          path: '/scan/blood-collection/createsingle-2',
          name: 'createSingle-2',
          components: {
            default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CreateSingle/createSingle-2'),
            navbar: Header
          }
        },
        {
          path: '/scan/blood-collection/createsingle-3',
          name: 'createSingle-3',
          components: {
            default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CreateSingle/createSingle-3'),
            navbar: Header
          }
        }
      ]
    },
    /* 创建多人核验 */
    {
      path: '/scan/blood-collection/createmore',
      name: 'createMore',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CreateMore'),
        navbar: Header
      },
      redirect: '/scan/blood-collection/createmore-1',
      children: [
        {
          path: '/scan/blood-collection/createmore-1',
          name: 'createMore-1',
          components: {
            default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CreateMore/createMore-1'),
            navbar: Header
          }
        },
        {
          path: '/scan/blood-collection/createmore-2',
          name: 'createMore-2',
          components: {
            default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BloodCollection-CreateMore/createMore-2'),
            navbar: Header
          }
        }
      ]
    },
    {
      path: '/scan/fenzu',
      name: 'fenzu',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-FenZuHeYan'),
        navbar: Header
      }
    },
    {
      path: '/scan/receive',
      name: 'receive',
      components: {
        default: receive,
        navbar: Header
      }
    },
    {
      path: '/scan/transport',
      name: 'zhuanyun',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan/saomiao/zhuanyun.vue'),
        navbar: Header
      }
    },
    // 转入
    {
      path: '/scan/transport/in',
      name: 'zhuanru',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-Transport-In/index.vue'),
        navbar: Header
      }
    },
    // 转入订单信息
    {
      path: '/scan/transport/in/order',
      name: 'orderinfo',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-Transport-In-OrderInfo'),
        navbar: Header
      }
    },
    // 转出
    {
      path: '/scan/transport/out',
      name: 'zhuanchu',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-Transport-Out/index.vue'),
        navbar: Header
      }
    },
    {
      path: '/scan/transport/out/add',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-Transport-Out/addOrder.vue'),
        navbar: Header
      }
    },
    // 转出里边的修改
    {
      path: '/scan/transport/out/change/:id',
      name: 'outchange',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-Transport-Out-Change/index.vue'),
        navbar: Header
      }
    },
    // 修改转运样本盒
    {
      path: '/scan/transport/out/eidt',
      name: 'outchangeedit',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-Transport-Out-Change-Edit/index.vue'),
        navbar: Header
      }
    },
    // 盘点
    {
      path: '/scan/transport/out/change/eidt/check',
      name: 'check',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-Transport-Out-Change-Check/index.vue'),
        navbar: Header
      }
    },
    {
      path: '/scan/zidong',
      name: 'zidong',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan/saomiao/zidong.vue'),
        navbar: Header
      }
    },
    {
      path: '/scan/lixin',
      name: 'lixin',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan/saomiao/lixin.vue'),
        navbar: Header
      }
    },
    /* 借出 */
    {
      path: '/scan/loan',
      name: 'loan',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-Loan/index.vue'),
        navbar: Header
      }
    },
    /* 借出详情 */
    {
      path: '/scan/loan/particulars/:id',
      name: 'particulars',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-Loan-Particulars'),
        navbar: Header
      }
    },
    // 归还
    {
      path: '/scan/guihuan',
      name: 'guihuan',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-GiveBack/index.vue'),
        navbar: Header
      }
    },
    // 查询->批量录入
    {
      path: '/scan/batchEntry',
      name: 'batchEntry',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BatchEntry'),
        navbar: Header
      }
    },
    // 查询->批量修改
    {
      path: '/scan/bulkEditing',
      name: 'bulkEditing',
      components: {
        default: () => import(/* webpackChunkName: "scan" */ '@/views/Scan-BulkEditing'),
        navbar: Header
      }
    },
    //  ↓ 查询 [日志信息] [样本信息]
    {
      path: '/query/log/:id',
      name: 'log',
      components: {
        default: () => import('@/views/Query/Log/index.vue'),
        navbar: Header
      }
    },
    {
      path: '/query/sample/:id',
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
      path: '/query/transfer/:id',
      name: 'transfer',
      components: {
        default: () => import('@/views/Query/Transfer/index.vue'),
        navbar: Header
      }
    }
    // {
    //   path: '/scan/sampleTransfer/:id',
    //   name: 'transferScan',
    //   components: {
    //     default: () => import('@/views/Query/Transfer/index.vue'),
    //     navbar: Header
    //   }
    // }
    //  ↓ test.vue
    // {
    //   path: '/test',
    //   name: 'test',
    //   components: {
    //     default: () => import('@/views/TEST.vue'),
    //     navbar: Header
    //   }
    // }
  ]
})
