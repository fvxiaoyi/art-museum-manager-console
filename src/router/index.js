import Vue from 'vue'
import Router from 'vue-router'

const articleList = () => import('@/page/article/list')
const studentList = () => import('@/page/student/list')

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
    }
  ]
})
