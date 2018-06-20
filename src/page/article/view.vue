<template>
  <div id="article-view">
    <div class="tbar">
      <div class="title" v-if="model.id">编辑作品</div>
      <div class="title" v-else>添加作品</div>
    </div>
    <el-form label-width="100px" size="small">
      <el-form-item label="预览图">
        <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="upload">
          <div v-if="model.displayImg" class="img-wrap" @click.stop="imgMaskVisible=!imgMaskVisible">
            <img :src="`${model.thumbnailUrl}?imageView2/1/w/200/h/200`" class="avatar">
            <div v-if="imgMaskVisible" class="mark"></div>
            <div v-if="imgMaskVisible" class="btn-wrap">
              <i class="el-icon-delete" @click.stop="deleteImg"></i>
              <i class="el-icon-zoom-in" @click.stop="dialogVisible = true"></i>
            </div>
          </div>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      
      <el-form-item label="作品名称" required>
        <el-input v-model="model.name" placeholder="请输入作品名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="作品类型">
        <el-select v-model="model.courseId" @change="onCourseChange" placeholder="请选择作品类型" style="width: 200px;">
          <el-option v-for="item in courses"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作品专题">
        <el-select v-model="model.subjectId" placeholder="请选择发布专题" style="width: 200px;">
          <el-option v-for="item in subjects"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作者" required>
        <el-select v-model="model.studentId" placeholder="请选择学员" style="width: 200px;">
          <el-option v-for="item in students"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作品尺寸">
        <el-select v-model="model.size" placeholder="请选择作品类型" style="width: 200px;">
          <el-option v-for="item in size"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-if="model.size === 'CUSTOM'" v-model="model.width" placeholder="宽度(厘米)" style="width: 90px;"></el-input>
        <span v-if="model.size === 'CUSTOM'">x</span>
        <el-input v-if="model.size === 'CUSTOM'" v-model="model.height" placeholder="高度(厘米)" style="width: 90px;"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="model.remark" type="textarea" placeholder="请输入作品备注" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="back">返回</el-button>
        <el-button type="success" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="model.originalUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'articleView',
  created() {
    let me = this
    this.loadCourseData((data) => me.courses = data)
    if(me.$route.params.id) {
      me.getData(me.$route.params.id);
    }
  },
  data () {
    return {
      imgMaskVisible: false,
      dialogVisible: false,
      model: {
        size: 'FOUR_K',
        displayImg: '',
        height: 0,
        width: 0,
        originalUrl: '',
        thumbnailUrl: ''
      },
      courses: [],
      subjects: [],
      students: [],
      size: [{
          value: 'EIGHT_K',
          label: '8K'
        },{
          value: 'FOUR_K',
          label: '4K'
        },{
          value: 'CUSTOM',
          label: '自定义'
      }]
    }
  },
  methods: {
    getData(id) {
      let me = this
      this.post('admin/subject/all', {}, (response) => me.subjects = response.data)
      this.post('admin/student/all', {}, (response) => me.students = response.data)
      this.post('admin/art/get', {id}, (response) => {
        me.model = response.data
      })
    },
    back() {
      this.$router.push('/article')
    },
    submit() {
      let me = this
      if(me.$route.params.id) {
        this.post('admin/art/maintain', me.model, (response) => {
          me.$message({
            message: '修改成功',
            type: 'success'
          })
        })
      } else {
        this.post(`admin/art/add`, me.model, (response) => {
          me.$message({
            message: '添加成功',
            type: 'success'
          })
          me.$router.push('/article')
        })
      }
    },
    onCourseChange(newValue) {
      let me = this
      if(newValue) {
        me.subject = null
        me.student = null
        this.post('admin/subject/all', {courseId: newValue}, (response) => me.subjects = response.data)
        this.post('admin/student/all', {courseId: newValue}, (response) => me.students = response.data)
      }
    },
    deleteImg() {
      this.model.displayImg = null
    },
    upload(item) {
      let formData = new FormData(),
        me = this
      formData.append('file', item.file)
      formData.append('type', 'article')
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
  #article-view {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }

  #article-view .tbar {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #DDDDDD;
    margin-bottom: 12px;
  }

  #article-view .tbar .title {
    font-size: 18px;
  }

  .img-wrap {
    position: relative;
  }

  .img-wrap .mark {
    background-color: #000;
    opacity: 0.5;
    z-index: 1;
    width: 200px;
    height: 200px;
    position: absolute;
    top: 0;
    border-radius: 15px;
  }

  .img-wrap .btn-wrap {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 0;
    border-radius: 15px;
    z-index: 2;
    line-height: 200px;
  }

  .img-wrap .btn-wrap i {
    display: inline-block;
    font-size: 26px;
    width: 30px;
    height: 30px;
    color: #fff;
  }

  .img-wrap .btn-wrap i:hover {
    cursor: pointer;
  }
  
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 194px;
    border-radius: 15px;
    border: 1px dashed #d9d9d9;
    text-align: center;
  }

  .avatar-uploader-icon:hover {
    border-color: #409EFF;
  }

  .avatar {
    width: 200px;
    height: 200px;
    display: block;
    border-radius: 15px;
  }
</style>
