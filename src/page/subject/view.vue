<template>
  <div id="subject-view">
    <v-title-bar>
      <span v-if="model.id">编辑专题</span>
      <span v-else>添加专题</span>
    </v-title-bar>

    <el-form label-width="100px" size="small">
      <el-form-item label="展示图">
        <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="upload">
          <img v-if="model.displayImg" :src="model.originalUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      
      <el-form-item label="专题名称" required>
        <el-input v-model="model.name" placeholder="请输入专题名称" style="width: 220px;"></el-input>
      </el-form-item>
      <el-form-item label="实验室" required>
        <el-select v-model="model.courseId" placeholder="请选择所属实验室" style="width: 220px;" >
          <el-option
            v-for="item in courses"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推荐" required>
        <el-radio-group v-model="model.hot">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
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
  created() {
    let me = this
    this.post('admin/course/list', {}, (response) => me.courses = response.data)
    if(me.$route.params.id) {
      me.loadData(me.$route.params.id);
    }
  },
  data () {
    return {
      model: {
        name: null,
        courseId: null,
        displayImg: null,
        hot: false,
        originalUrl: '',
        thumbnailUrl: ''
      },
      courses: []
    }
  },
  methods: {
    back() {
      this.$router.push('/subject')
    },
    loadData(id) {
      let me = this
      this.post('admin/subject/get', {id}, (response) => {
        me.model = response.data
      })
    },
    submit() {
      let me = this
      if(me.$route.params.id) {
        this.post('admin/subject/maintain', me.model, (response) => {
          me.$message({
            message: '修改成功',
            type: 'success'
          })
        })
      } else {
        this.post(`admin/subject/add`, me.model, (response) => {
          me.$message({
            message: '添加成功',
            type: 'success'
          })
          me.$router.push('/subject')
        })
      }
    },
    upload(item) {
      let formData = new FormData(),
        me = this
      formData.append('file', item.file)
      formData.append('type', 'banner')
      this.post('admin/store/upload', formData, (response) => {
        me.model.displayImg = response.data.fileName
        me.model.originalUrl = response.data.original_url
        me.model.thumbnailUrl = response.data.thumbnail_url
      })
    }
  },
  computed: {
  }
}
</script>


<style scoped>
  #subject-view {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 700px;
    height: 194px;
    line-height: 194px;
    border-radius: 15px;
    border: 1px dashed #d9d9d9;
    text-align: center;
  }

  .avatar-uploader-icon:hover {
    border-color: #409EFF;
  }

  .avatar {
    width: 700px;
    height: 194px;
    display: block;
    border-radius: 15px;
  }

  
</style>
