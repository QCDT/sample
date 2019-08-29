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
axios.defaults.baseURL = 'http://192.168.1.99:8071'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.filter('dateFilter', function (value, fmt) {
  if (Object.prototype.toString.call(value) !== '[object Number]') {
    try {
      value = parseInt(value)
    } catch (e) {
      console.log('传入格式化时间不规范')
      value = 0
    }
  }
  if (value) {
    let date = new Date(value)
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    }
    return fmt
  } else {
    return ' -'
  }
})
Vue.prototype.qs = qs
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
