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
import JsonExcel from 'vue-json-excel'
axios.defaults.baseURL = 'http://192.168.1.15:8071'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
Vue.config.productionTip = false
Vue.component('downloadExcel', JsonExcel)
Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.prototype.qs = qs
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
