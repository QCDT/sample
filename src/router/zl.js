import Header from '@/components/header.vue'
export const zlRouter = [
  {
    path: '/test',
    components: {
      default: () => import('@/views/Scan/saomiao/Detection/index.vue'),
      navbar: Header
    }
  }
]
