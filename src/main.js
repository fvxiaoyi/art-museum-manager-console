// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import titleBar from './components/titleBar'
import { 
  Button,
  Select,
  Option,
  Input,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Form,
  FormItem,
  Upload,
  Radio,
  RadioGroup,
  RadioButton,
  Tooltip,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  MenuItem,
  Message,
  MessageBox,
  DatePicker
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import storeConfig from './store/index'

Vue.use(Vuex)

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Input.name, Input)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Pagination.name, Pagination)
Vue.component(Dialog.name, Dialog)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Upload.name, Upload)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(RadioButton.name, RadioButton)
Vue.component(Tooltip.name, Tooltip)
Vue.component(Checkbox.name, Checkbox)
Vue.component(CheckboxButton.name, CheckboxButton)
Vue.component(CheckboxGroup.name, CheckboxGroup)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Menu.name, Menu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(DatePicker.name, DatePicker)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message

Vue.component('v-title-bar', titleBar)

Vue.prototype.$http = axios

Vue.prototype.$pageSize = 10

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
	me.$http.post('http://127.0.0.1:8080' + url, param).then(function (response) {
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

const store = new Vuex.Store(storeConfig)

if(localStorage.getItem("createTime")) {
  let current = Date.parse(new Date())
  if(current > Number(localStorage.getItem("createTime"))) {
    localStorage.removeItem("token")
    localStorage.removeItem("createTime")
  }
}

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
