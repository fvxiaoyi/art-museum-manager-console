// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import titleBar from './components/titleBar'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('v-title-bar', titleBar)

Vue.prototype.$http = axios

Vue.prototype.$pageSize = 10

Vue.prototype.$server_uri = 'http://127.0.0.1:7000'

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
      me.$message.error(error)
    }
	})
}

Vue.prototype.getListData = function(url, page, params, cb, paramCb) {
  let me = this,
      limit = 10,
      start
    if(page === 1) {
      start = 0
    } else {
      start = limit * (page - 1)
    }
    let _params = { start, limit }
    for(let x in params) {
      if(!params[x]) {
        delete params[x]
      }
    }
    Object.assign(_params, params)
    paramCb && paramCb(_params)
    this.post(url, _params, (response) => {
      cb(response.data, response.total)
    })
}

Vue.prototype.formatCreateTime = function(time) {
  if(time) {
    let d = new Date(time)
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  } else {
    return ''
  }
}

Vue.prototype.formatFullCreateTime = function(time) {
  if(time) {
    let d = new Date(time)
    let hour = d.getHours() + '',
      min = d.getMinutes() + ''
    if(hour.length === 1) {
      hour = '0' + hour
    }
    if(min.length === 1) {
      min = '0' + min
    }
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + hour + ":" + min
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
