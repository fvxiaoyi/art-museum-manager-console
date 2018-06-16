import Vue from 'vue'
import Router from 'vue-router'

const articleList = () => import('@/page/article/list')
const studentList = () => import('@/page/student/list')
const studentView = () => import('@/page/student/view')
const couponList = () => import('@/page/coupon/list')
const localList = () => import('@/page/local/list')
const subjectList = () => import('@/page/subject/list')
const subjectView = () => import('@/page/subject/view')

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
      path: '/student/view',
      component: studentView
    },
    {
      path: '/student/view/:id',
      component: studentView
    },
    {
      path: '/coupon',
      component: couponList
    },
    {
      path: '/local',
      component: localList
    },
    {
      path: '/subject',
      component: subjectList
    },
    {
      path: '/subject/view',
      component: subjectView
    },
    {
      path: '/subject/view/:id',
      component: subjectView
    }
  ]
})
