import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
import login from '@/views/login.vue'
import Home from '@/views/Home.vue'
=======
import Home from '@/views/login.vue'

>>>>>>> f4a5008891a2e01d0cca32dcd08658d2b81e4aee
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
<<<<<<< HEAD
      component: login
    },
    {
      path: '/Home',
      name: 'home',
      component: Home
    }
    // {
=======
      component: Home
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
>>>>>>> f4a5008891a2e01d0cca32dcd08658d2b81e4aee
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    // }
  ]
})
