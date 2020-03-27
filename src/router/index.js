import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('@/page/login')
const index = () => import('@/page/index')
const articleList = () => import('@/page/article/list')
const articleView = () => import('@/page/article/view')
const studentList = () => import('@/page/student/list')
const studentView = () => import('@/page/student/view')
const couponList = () => import('@/page/coupon/list')
const localList = () => import('@/page/local/list')
const subjectList = () => import('@/page/subject/list')
const subjectView = () => import('@/page/subject/view')
const starList = () => import('@/page/star/list')
const giftList = () => import('@/page/gift/list')
const onlineCourseFreeList = () => import('@/page/onlinecourse/freelist')
const onlineCourseClassList = () => import('@/page/onlinecourse/classlist')


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      redirect: '/article',
      children: [
        {
          path: '/onlinecourse/classlist',
          component: onlineCourseClassList
        },
        {
          path: '/onlinecourse/freelist',
          component: onlineCourseFreeList
        },
        {
          path: '/article',
          component: articleList
        },
        {
          path: '/article/view',
          component: articleView
        },
        {
          path: '/article/view/:id',
          component: articleView
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
        },
        {
          path: '/star',
          component: starList
        },
        {
          path: '/gift',
          component: giftList
        }
      ]
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path !== '/login') {
    let token = localStorage.getItem("token")
    if(!token) {
      next('/login')
    } 
  }
  next()
})

export default router