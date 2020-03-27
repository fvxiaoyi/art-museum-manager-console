<template>
	<div id="app-wrap">
    <div id="header" class="clear">
      <div class="title">管理控制台</div>
      <div class="info">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            管理员<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
            <el-dropdown-item command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div id="body">
      <el-menu id="menu" class="el-menu-vertical"
        :default-active="currentActive"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <i class="collapse" 
          :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"
          @click="onCollapseClick"></i>
        <el-menu-item index="1" @click="onMenuItemClick('article')" >
          <i class="el-icon-picture-outline"></i>
          <span slot="title">学员作品</span>
        </el-menu-item>
        <el-menu-item index="2" @click="onMenuItemClick('student')">
          <i class="el-icon-mobile-phone"></i>
          <span slot="title">学员信息</span>
        </el-menu-item>
        <el-menu-item index="3" @click="onMenuItemClick('coupon')">
          <i class="el-icon-phone-outline"></i>
          <span slot="title">预约试听</span>
        </el-menu-item>
        <el-menu-item index="4" @click="onMenuItemClick('subject')">
          <i class="el-icon-edit"></i>
          <span slot="title">专题</span>
        </el-menu-item>
        <el-menu-item index="5" @click="onMenuItemClick('gift')">
          <i class="el-icon-goods"></i>
          <span slot="title">兑换奖品</span>
        </el-menu-item>
        <el-menu-item index="6" @click="onMenuItemClick('star')">
          <i class="el-icon-star-off"></i>
          <span slot="title">点赞查询</span>
        </el-menu-item>
        <el-menu-item index="7" @click="onMenuItemClick('local')">
          <i class="el-icon-location-outline"></i>
          <span slot="title">校区</span>
        </el-menu-item>
        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>课程管理</span>
          </template>
          <el-menu-item index="8-1" @click="onMenuItemClick('onlinecourse/classlist')"><span slot="title">课程分类信息</span></el-menu-item>
          <el-menu-item index="8-2"><span slot="title">免费课程</span></el-menu-item>
          <el-menu-item index="8-3"><span slot="title">付费课程</span></el-menu-item>
          <el-menu-item index="8-4"><span slot="title">打卡课程</span></el-menu-item>
        </el-submenu>

      </el-menu>
      <div id="contentWrap">
        <keep-alive include="ArticleList,StudentList,subjectList">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="passwordDialogVisible"
      width="30%">
      <el-input v-model="password" placeholder="请输入新密码" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passwordDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
	export default {
		created() {

		},
		data() {
      return {
      	isCollapse: false,
	      passwordDialogVisible: false,
	      password: null
      }
    },
    methods: {
	    onCollapseClick() {
	      this.isCollapse = !this.isCollapse
	    },
	    onMenuItemClick(path) {
	      this.$router.push(`/${path}`)
	    },
	    handleCommand(command) {
	      if(command === 'a') {
	        this.passwordDialogVisible = true
	      }
	      if(command === 'b') {
	        this.logout()
	      }
	    },
	    changePassword() {
	      let me = this
	      if(this.password && this.password.length >= 4) {
	        this.post('/admin/security/changePassword', {password: me.password}, (response) => {
	          this.passwordDialogVisible = false;
	          this.$message({
	            message: '修改成功',
	            type: 'success'
	          })
	        })
	      } else {
	        this.$message({
	          message: '密码长度至少4位',
	          type: 'warning'
	        })
	      }
	    },
	    logout() {
	      let me = this
	      this.post('/admin/security/logout', {}, (response) => {
	        me.$message({
	          message: '退出成功',
	          type: 'success'
	        })
	        localStorage.removeItem("token")
	        localStorage.removeItem("createTime")
	        location.reload()
	      })
	    }
    
  	},
  	computed: {
	    token() {
	      return localStorage.getItem("token")
	    },
	    currentActive() {
	      let path = this.$route.path
	      if(path === '/article') {
	        return '1'
	      } else if(path === '/student') {
	        return '2'
	      } else if(path === '/coupon') {
	        return '3'
	      } else if(path === '/subject') {
	        return '4'
	      } else if(path === '/gift') {
	        return '5'
	      } else if(path === '/star') {
	        return '6'
	      } else if(path === '/local') {
          return '7'
        } else if(path === '/onlinecourse/classlist') {
          return '8-1'
        } 
        else {
	        return ''
	      }
	    }
	  }
	}
</script>

<style scoped>
	#app-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #header {
    width: 100%;
    height: 64px;
    background-color: #555C63;
  }

  #header .title, #header .info  {
    height: 100%;
  }

  #header .title {
    width: 106px;
    color: #fff;
    text-align: center;
    line-height: 64px;
    font-size: 14px;
    float: left;
  }

  #header .info {
    width: 120px;
    text-align: center;
    line-height: 64px;
    float: right;
  }

  #header .info .el-dropdown-link {
    color: #fff;
  }

  #header .info .el-dropdown-link:hover {
    color: #ffd04b;
  }

  #body {
    width: 100%;
    display: flex;
    flex: 1;
  }

  #menu {

  }

  #menu .collapse {
    text-align: center;
    display: block;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background-color: #434A50;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 160px;
    min-height: 400px;
  }

  #contentWrap {
    padding: 10px;
    flex: 1;
  }

</style>