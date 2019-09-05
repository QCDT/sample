import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import '@/assets/css/app.css'
// import '@/assets/css/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import echarts from 'echarts'
axios.defaults.baseURL = 'http://192.168.1.78:8071'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.filter('dateFilter', function (value) {
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
  // t = t.substring(0, t.length - 3)
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
