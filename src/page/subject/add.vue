<template>
  <div id="subject-add">
    <div class="tbar clear">
      <div class="back">
        <el-tooltip content="返回" placement="bottom" >
          <el-button type="info" icon="el-icon-arrow-left" plain size="mini" @click="back"></el-button>
        </el-tooltip>
      </div>
      <div class="title">添加专题</div>
    </div>

    <el-form label-width="100px" size="small">

      <el-form-item label="展示图">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :multiple=false
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleUploadSuccess"
          :on-change="handleUploadChange">
          <img v-if="model.displayImg" :src="model.displayImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      
      <el-form-item label="专题名称" required>
        <el-input v-model="model.name" placeholder="请输入专题名称"></el-input>
      </el-form-item>
      <el-form-item label="实验室" required>
        <el-select v-model="model.courseId" placeholder="请选择所属实验室" >
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
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

    </el-form>
  </div>
</template>

<script>
export default {
  created() {
    let me = this
    // this.loadCourseData((data) => me.courses = data)
  },
  data () {
    return {
      model: {
        name: null,
        courseId: null,
        displayImg: '../../static/home-Banner-2.png',
        hot: 0
      },
      courses: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    back() {
      this.$router.push('/subject')
    },
    handleUploadSuccess(response, file, fileList) {
      this.model.displayImg = response.data.original_url
    },
    handleUploadChange(file, fileList) {
      console.log(file);
    },
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 2
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      return isLt1M;
    }
  },
  computed: {
    uploadUrl() {
      let me = this
      return `${me.$server_uri}/store/upload`
    }
  }
}
</script>


<style scoped>
  #subject-add {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }

  #subject-add .tbar {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #DDDDDD;
    margin-bottom: 12px;
  }

  #subject-add .back {
    float: left;
    margin-right: 16px;
  }

  #subject-add .tbar .title {
    float: left;
    font-size: 18px;
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
