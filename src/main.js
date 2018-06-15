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

let screenHeight = window.screen.height
let pageSize = screenHeight < 1050 ? screenHeight < 900 ? 6 : 8 : 10
Vue.prototype.$pageSize = pageSize

Vue.prototype.$server_uri = 'http://localhost'

Vue.prototype.post = function(url, param, cb) {
	let me = this
	param = param || {}
	param.token = localStorage.getItem("token")
	me.$http.post(`${me.$server_uri}/${url}`, param).then(function (response) {
		if(response.data.success) {
			cb(response.data)
		} else {
			me.$message.error(response.data.msg)
		}
	})
}

Vue.prototype.loadCourseData = function(cb) {
	let me = this
	this.post('course/list', {}, (response) => cb && cb(response.data))
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
