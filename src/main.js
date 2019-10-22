import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import '@/assets/css/app.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import echarts from 'echarts'
axios.defaults.baseURL = 'http://192.168.1.118:8071'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookies)
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
//     if (localStorage.token) { // 判断当前的token是否存在 ； 登录存入的token
//       next()
//     } else {
//       next({
//         path: '/',
//         query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   } else {
//     next()
//   }
// })
Vue.filter('dateFilter', function (value) {
  if (value === '') {
    return
  }
  let times = parseFloat(value) * 60
  let t = null
  if (times > -1) {
    var hour = Math.floor(times / 3600)
    var min = Math.floor(times / 60) % 60
    var sec = times % 60
    if (hour < 10) {
      t = '0' + hour + ':'
    } else {
      t = hour + ':'
    }
    if (min < 10) { t += '0' }
    t += min + ':'
    if (sec < 10) { t += '0' }
    t += sec.toFixed(2)
  }
  t = t.substring(0, t.length - 3)
  return t
})
Vue.prototype.qs = qs
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
