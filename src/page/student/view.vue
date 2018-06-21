<template>
  <div id="student-view">
    <v-title-bar>
      <span v-if="model.id">编辑学员</span>
      <span v-else>添加学员</span>
    </v-title-bar>

    <el-form label-width="100px" size="small">
      <el-form-item label="学员名称" required>
        <el-input v-model="model.name" placeholder="请输入学员名称" style="width: 200px;"></el-input>
      </el-form-item>

      <el-form-item label="学员生日" required>
        <el-date-picker
          v-model="model.brithday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期" style="width: 200px;">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="性别" required>
        <el-radio-group v-model="model.sex">
          <el-radio label="BOY">男孩</el-radio>
          <el-radio label="GRIL">女孩</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="家长名称" required>
        <el-input v-model="model.parentName" placeholder="请输入家长名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="家长电话" required>
        <el-input v-model="model.phone" placeholder="请输入家长电话" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="校区" required>
        <el-select v-model="model.localId" placeholder="请选择所属校区" style="width: 200px;">
          <el-option
            v-for="item in locals"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实验室">
        <el-checkbox-group v-model="selectCourse">
          <el-checkbox :key="item.id" :label="item.name" v-for="item in courses"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="back">返回</el-button>
        <el-button type="success" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'studentList',
  created() {
    let me = this
    this.post('admin/course/list', {}, (response) => me.courses = response.data)
    this.post('admin/local/all', {}, (response) => me.locals = response.data)
    if(me.$route.params.id) {
      me.loadData(me.$route.params.id);
    }
  },
  data () {
    return {
      model: {
        sex: 'BOY'
      },
      locals: [],
      courses: [],
      selectCourse: []
    }
  },
  methods: {
    back() {
      this.$router.push('/student')
    },
    loadData(id) {
      let me = this
      this.post('admin/student/get', {id}, (response) => {
        me.model = response.data
        me.selectCourse = me.model.courses.map(m => m.name)
      })
    },
    submit() {
      let me = this
      if(me.selectCourse.length === 0) {
        me.model.courseIds = []
      } else {
        console.log(1)
        me.model.courseIds = me.courses.filter(x => me.selectCourse.indexOf(x.name) !== -1).map(m => m.id)
      }
      if(me.$route.params.id) {
        me.$message({
          message: '修改成功',
          type: 'success'
        })
        this.post(`admin/student/update`, me.model, (response) => me.$router.push('/student'))
      } else {
        me.$message({
          message: '添加成功',
          type: 'success'
        })
        this.post(`admin/student/add`, me.model, (response) => me.$router.push('/student'))
      }
    }
  }
}
</script>


<style scoped>
  #student-view {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }
</style>
