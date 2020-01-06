import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 1.完整引入事件和方法：
import ElementUI from 'element-ui'
// 导入axios 模块
import axios from 'axios'
// 引入全局初始化样式文件
import '@/assets/css/global.css'
// import 'element-ui/lib/theme-chalk/index.css'

// 配置公共根地址：
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
// 配置为Vue 的成员，可以通过vue 调用
Vue.prototype.$http = axios
Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
