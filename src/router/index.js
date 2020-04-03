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
const onlineCourseUploadList = () => import('@/page/onlinecourse/uploadlist')
const onlineCoursePaymentList = () => import('@/page/onlinecourse/paymentlist')
const onlineCourseClassList = () => import('@/page/onlinecourse/classlist')
const onlineCourseAdd = () => import('@/page/onlinecourse/add')
const onlineCourseCatalogueUpload = () => import('@/page/onlinecourse/upload')

const rewardUploadList = () => import('@/page/reward/uploadlist')
const rewardFreeList = () => import('@/page/reward/freelist')

const orderList = () => import('@/page/order/list')
const reviewList = () => import('@/page/review/list')
const reviewView = () => import('@/page/review/view')

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: index,
      redirect: '/article',
      children: [
        {
          path: '/review/list',
          component: reviewList
        },
        {
          path: '/review/view/:id',
          component: reviewView
        },
        {
          path: '/order/list',
          component: orderList
        },
        {
          path: '/reward/freeList',
          component: rewardFreeList
        },
        {
          path: '/reward/uploadlist',
          component: rewardUploadList
        },
        {
          path: '/onlinecourse/classlist',
          component: onlineCourseClassList
        },
        {
          path: '/onlinecourse/freelist',
          component: onlineCourseFreeList
        },
        {
          path: '/onlinecourse/uploadlist',
          component: onlineCourseUploadList
        },
        {
          path: '/onlinecourse/paymentlist',
          component: onlineCoursePaymentList
        },
        {
          path: '/onlinecourse/add/:type',
          component: onlineCourseAdd
        },
        {
          path: '/onlinecourse/edit/:type/:id',
          component: onlineCourseAdd
        },
        {
          path: '/onlinecourse/catalogue/upload/:type/:id',
          component: onlineCourseCatalogueUpload
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
  /*if(to.path !== '/login') {
    let token = localStorage.getItem("token")
    if(!token) {
      next('/login')
    } 
  }*/
  next()
})

export default router