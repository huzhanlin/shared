import Vue from 'vue'
import VueRouter from 'vue-router'
import Blog from './routerBlog'
import Admin from './admin'
import personalCenter from './personalCenter'
import memberLogin from './memberLogin'
import music from './music'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/blog'
  },
  Blog,
  Admin,
  music,
  personalCenter,
  memberLogin
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
