import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 1.完整引入时间和方法：
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
