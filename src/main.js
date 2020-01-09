import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入axios相关代码：
import '@/utils/ax.js'

// 1.完整引入事件和方法：
import ElementUI from 'element-ui'

// 引入全局初始化样式文件
import '@/assets/css/global.css'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
