import Header from '@/components/header.vue'
export const zlRouter = [
  {
    path: '/test123',
    components: {
      default: () => import('@/views/Scan/index.vue'),
      navbar: Header
    }
  }
]
