import Home from '@/views/Home.vue'
import Header from '@/components/header.vue'
import check from '@/views/check.vue'
import query from '@/views/Query/index.vue'
import scan from '@/views/Scan/index.vue'
import set from '@/views/set.vue'
import analyze from '@/views/analyze.vue'
export const navBar = [
  {
    path: '/home',
    components: {
      default: Home,
      navbar: Header
    }
  },
  {
    path: '/check',
    components: {
      default: check,
      navbar: Header
    }
  },
  {
    path: '/query',
    components: {
      default: query,
      navbar: Header
    }
  },
  {
    path: '/scan',
    components: {
      default: scan,
      navbar: Header
    }

  },
  {
    path: '/set',
    components: {
      default: set,
      navbar: Header
    }
  },
  {
    path: '/analyze',
    components: {
      default: analyze,
      navbar: Header
    }
  }
]
