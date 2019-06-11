import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login.vue'
// import Home from '@/views/Home.vue'
import  {navBar} from '@/router/nav'
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
