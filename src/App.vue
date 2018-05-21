<template>
  <div id="app">
    <div id="header" class="clear">
      <div class="log">64x64 log</div>
      <div class="title">管理控制台</div>
      <div class="info">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            管理员<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
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
          <span slot="title">作品管理</span>
        </el-menu-item>
        <el-menu-item index="2" @click="onMenuItemClick('student')">
          <i class="el-icon-mobile-phone"></i>
          <span slot="title">学员管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="onMenuItemClick('coupon')">
          <i class="el-icon-service"></i>
          <span slot="title">试听券管理</span>
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
</template>

<script>
export default {
  name: 'App',
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
      this.passwordDialogVisible = true
    },
    changePassword() {
      if(this.password && this.password.length >= 6) {
        this.passwordDialogVisible = false;
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      } else {
        this.$message({
          message: '密码长度必须大于等于6位',
          type: 'warning'
        });
      }
      
      console.log(this.password)
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
    display: flex;
    flex-direction: column;
  }

  #header {
    width: 100%;
    height: 64px;
    background-color: #555C63;
  }

  #header .log, #header .title, #header .info  {
    height: 100%;
  }

  #header .log {
    width: 64px;
    background-color: orange;
    float: left;
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
