// 独立文件，用于储存axios相关代码
import Vue from 'vue'
// // 导入路由对象：
import router from '@/router'

// 导入axios 模块
import axios from 'axios'

// 配置公共根地址：
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
// 配置为Vue 的成员，可以通过vue 调用
Vue.prototype.$http = axios

// 配置公共根地址：
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
// 配置为Vue 的成员，可以通过vue 调用
Vue.prototype.$http = axios

// 配置请求拦截器
axios.interceptors.request.use(function (config) {
  // userinfo并不是始终存在的，要做判断使用
  let userinfo = window.sessionStorage.getItem('userinfo')

  if (userinfo) {
    let token = JSON.parse(userinfo).token
    // 给axios请求头配置token
    config.headers.Authorization = 'Bearer ' + token
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

// 当token（2小时）失效后，服务端也会返回401状态码，如果出现这种情况，考虑怎样实现强制用户重新登录：
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.dir(error)
  if (error.response.status === 401) {
    // token 在服务端已经失效了（超2小时）--->强制用户重新登录系统
    router.push('/login')
  }
  return Promise.reject(error)
})
