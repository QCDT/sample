import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import '@/assets/css/app.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import axios from 'axios'
import JsonExcel from 'vue-json-excel'
axios.defaults.baseURL = 'http://192.168.136.129:8071'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.config.productionTip = false
Vue.component('downloadExcel', JsonExcel)
Vue.use(ElementUI)

Vue.prototype.qs = qs
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
