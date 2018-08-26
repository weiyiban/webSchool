import router from '@/router'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css' // Progress 进度条样式

router.beforeEach((to, from, next) => {
  // NProgress.start() // 开启Progress

  // 在登录页删除 sessionStorage
  if (to.path === '/login') {
    sessionStorage.removeItem('token')
  }
  next()
})
router.afterEach(() => {
  // NProgress.done() // 结束Progress
})