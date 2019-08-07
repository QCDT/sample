import Header from '@/components/header.vue'
export const zlRouter = [
  {
    path: '/test123',
    components: {
      default: () => import('@/views/Scan/index.vue'),
      navbar: Header
    }
  },
  {
    path: '/scan/detection/addSamplePlanSteps',
    name: 'addSamplePlanSteps',
    components: {
      default: () => import('@/views/Scan-Detection-addSamplePlanSteps'),
      navbar: Header
    },
    redirect: '/scan/detection/addSamplePlanSteps/steps-2',
    children: [
      {
        path: '/scan/detection/addSamplePlanSteps/steps-2',
        name: 'steps-2',
        component: () => import('@/views/Scan-Detection-addSamplePlanSteps/steps-2')
      },
      {
        path: '/scan/detection/addSamplePlanSteps/steps-3',
        name: 'steps-3',
        component: () => import('@/views/Scan-Detection-addSamplePlanSteps/steps-3')
      }
    ]
  }
]
