<template>
  <div id="app">
    <div id="app-wrap"  v-if="token">
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
          default-active="1"
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
            <span slot="title">试听券</span>
          </el-menu-item>
          <el-menu-item index="4" @click="onMenuItemClick('local')">
            <i class="el-icon-location-outline"></i>
            <span slot="title">校区</span>
          </el-menu-item>
          <el-menu-item index="5" @click="onMenuItemClick('subject')">
            <i class="el-icon-date"></i>
            <span slot="title">专题</span>
          </el-menu-item>
        </el-menu>
        <div id="contentWrap">
          <router-view></router-view>
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
    <div id="login-wrap" v-else>
      <div class="login-text">
        <div class="text">
          <span class="title" style="color:#1CBAD2;">美</span><span class="title" style="color:#9FCC3B;">学</span><span class="title" style="color:#FFE71A;">艺</span><span class="title" style="color:#FF89B0;">术</span><span class="title" style="color:#FF7C7C;">馆</span>
          <span class="title" style="color:#999;">-</span>
          <span class="title">管理控制台</span>
        </div>
        <div class="copyright">XXXXX @2018 All rights reserved</div>
      </div>
      <div class="login-form">
        <div class="form-wrap" >
          <div style="margin-bottom:16px;">登录</div>
          <el-input style="margin-bottom:10px;" placeholder="请输入账号" v-model="account">
            <template slot="prepend">账号</template>
          </el-input>
          <el-input style="margin-bottom:16px;" type="password" placeholder="请输入密码" v-model="accountPassword">
            <template slot="prepend">密码</template>
          </el-input>
          <el-button type="warning" size="medium" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isCollapse: false,
      passwordDialogVisible: false,
      password: null,
      account: null,
      accountPassword: null
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
        sessionStorage.removeItem('token')
        location.reload()
      }
    },
    changePassword() {
      if(this.password && this.password.length >= 6) {
        this.passwordDialogVisible = false;
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '密码长度必须大于等于6位',
          type: 'warning'
        })
      }
      
      console.log(this.password)
    },
    login() {
      if(this.account && this.account.length > 0 && this.accountPassword && this.accountPassword.length > 0) {
        sessionStorage.setItem("token","token")
        location.reload()
      } else {
        this.$message({
          message: '账号密码不能为空',
          type: 'warning'
        })
      }
    }
  },
  computed: {
    token() {
      return sessionStorage.getItem("token")
    }
  }
}
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: #606266;
  }

  @media screen and (min-height: 800px){
    #login-wrap .login-text span {
      font-weight: bold;
      font-size: 60px;
    }

    #login-wrap .login-text .text {
      margin-top: 340px;
    }

    #login-wrap .login-form .form-wrap {
      margin: 280px 0 0 120px; 
      padding: 20px;
      height: 180px;
      width: 350px;
      border: 1px solid #DCDFE6;
    }
    
  }

  @media screen and (max-height: 800px){
    #login-wrap .login-text span {
      font-weight: bold;
      font-size: 40px;
    }

    #login-wrap .login-text .text {
       margin-top: 240px;
    }

    #login-wrap .login-form .form-wrap {
      margin: 180px 0 0 120px; 
      padding: 20px;
      height: 180px;
      width: 350px;
      border: 1px solid #DCDFE6;
    }
  }

  .clear:after{
    content: '';
    display: block;
    clear: both;
  }

  .clear{
    zoom:1;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  #login-wrap  {
    height: 100%;
    padding: 0 200px;
    display: flex;
  }

  #login-wrap .login-text {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  #login-wrap .login-text .text {
    text-align: center;
    flex: 1;
  }

  #login-wrap .login-text .copyright {
    margin-bottom: 20px;
    height: 14px;
    font-size: 10px;
  }

  #login-wrap .login-form {
    height: 100%;
    flex: 1;
  }

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
    height: 100%;
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
