<template>
  <div id="article-add">
    <el-steps :active="active" align-center style="margin: 30px 0 30px 0;">
      <el-step title="第一步" description="添加学员"></el-step>
      <el-step title="第二步" description="获取激活码"></el-step>
    </el-steps>
    <div v-if="active === 1" style="width:60%;margin:0 auto;">
      <el-form label-width="80px" size="small" >
        <el-form-item label="学员名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="家长名称">
          <el-input v-model="model.parentName"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="model.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="create">创 建</el-button>
    </div>
    <div v-else class="code-wrap">
      <i class="el-icon-success"></i>
      <span>学员添加成功</span>
      <div class="code">
        激活码: {{code}}
      </div>
      <el-tooltip content="返回学员列表" placement="left" >
        <el-button type="primary" @click="cancel">返 回</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleAdd',
  data () {
    return {
      active: 1,
      model: {},
      code: 1234
    }
  },
  methods: {
    cancel() {
      this.$router.push('/student')
    },
    create() {
      if((this.model.name && this.model.name.length > 0) || (this.model.parentName && this.model.parentName.length > 0)) {
        this.active = 2
      } else {
        this.$message({
          message: '至少要填写一个学员名字或家长名字',
          type: 'warning'
        })
      }
    }
  }
}
</script>


<style scoped>
  #article-add {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }

  #article-add .code {
    color: #E6A23C;
    margin: 40px 0;
  }

  #article-add .code-wrap {
    margin: 60px;
    color: #67C23A;
    font-size: 40px;
    text-align: center;
  }
  
</style>
