import Vue from 'vue'
import Router from 'vue-router'

const articleList = () => import('@/page/article/list')
const studentList = () => import('@/page/student/list')
const studentAdd = () => import('@/page/student/add')
const couponList = () => import('@/page/coupon/list')
const localList = () => import('@/page/local/list')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/article',
      component: articleList
    },
    {
      path: '/student',
      component: studentList
    },
    {
      path: '/student/add',
      component: studentAdd
    },
    {
      path: '/coupon',
      component: couponList
    },
    {
      path: '/local',
      component: localList
    }
  ]
})
