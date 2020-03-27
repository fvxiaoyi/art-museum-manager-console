<template>
	<div id="login-wrap">
      <div class="login-text">
        <div class="text">
          <span class="title" style="color:#1CBAD2;">美</span><span class="title" style="color:#9FCC3B;">学</span><span class="title" style="color:#FFE71A;">艺</span><span class="title" style="color:#FF89B0;">术</span><span class="title" style="color:#FF7C7C;">馆</span>
          <span class="title" style="color:#999;">-</span>
          <span class="title">管理控制台</span>
        </div>
        <div class="copyright">hi美学 @2018 All rights reserved</div>
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
		created() {

		},
		data() {
      return {
      	account: null,
     	  accountPassword: null
      }
    },
    methods: {
    	login() {
	      let me = this
	      if(this.account && this.account.length > 0 && this.accountPassword && this.accountPassword.length > 0) {
	        this.post('/admin/security/login', { accountName: me.account, password: me.accountPassword }, (response) => {
	          me.$message({
	            message: '登录成功',
	            type: 'success'
	          })
	          localStorage.setItem("token",response.data.token)
	          localStorage.setItem("createTime",response.data.createTime)
	          
	          this.$router.push('/article')
	        })
	      } else {
	        this.$message({
	          message: '账号密码不能为空',
	          type: 'warning'
	        })
	      }
	    }
    }
	}
</script>

<style scoped>

	@media screen and (min-height: 800px) {
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



</style>