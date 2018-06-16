// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$http = axios

Vue.prototype.$pageSize = 10

Vue.prototype.$server_uri = 'http://localhost'

axios.interceptors.request.use(
  config => {
  	if(localStorage.getItem("token")) {
  		config.headers.common['token'] = localStorage.getItem("token")
  	}
    return config
  },
  err => {
    return Promise.reject(err)
})

Vue.prototype.post = function(url, param, cb) {
	let me = this
	me.$http.post(`${me.$server_uri}/${url}`, param).then(function (response) {
		if(response.data.success) {
			cb(response.data)
		} else {
			me.$message.error(response.data.msg)
		}
	}).catch(function(error) {
		if (error.response) {
			if(error.response.status === 401) {
  			me.$alert('登录超时', '提醒', {
          confirmButtonText: '确定',
          callback: action => {
            localStorage.removeItem("token")
  					location.reload()
          }
        })
			}
    } else {
      me.$message.error('服务器挂了')
    }
	})
}

Vue.prototype.loadCourseData = function(cb) {
	let me = this
	this.post('admin/course/list', {}, (response) => cb && cb(response.data))
}

Vue.prototype.formatCreateTime = function(time) {
  if(time) {
    let d = new Date(time)
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  } else {
    return ''
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
