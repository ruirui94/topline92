import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // import(xxx) 函数调用 和模块化导入（完整导入）本质不同，函数调用的好处：按需导入，节省资源
  // @ 符号 代表src目录的绝对路径地址 ：
  // name 属性作用：编程式导航使用
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  { path: '/home', name: 'home', component: () => import('@/views/home') }
]

const router = new VueRouter({
  routes
})

// 设置 全局前置守卫
router.beforeEach((to, from, next) => {
  // 用户如果是"非登录"状态，并且其还要访问 非登录 页面，那么就强制登录去
  var userinfo = window.sessionStorage.getItem('userinfo')
  if (!userinfo && to.path !== '/login') {
    // 路由导航到登录页面
    return next('/login') // ok
  }
  next()
})

export default router
