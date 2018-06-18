<template>
  <div id="article-view">
    <div class="tbar">
      <div class="title" v-if="model.id">编辑作品</div>
      <div class="title" v-else>添加作品</div>
    </div>
    <el-form label-width="100px" size="small">
      <el-form-item label="预览图">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleUploadSuccess">
          <div v-if="model.displayImg" class="img-wrap" @click.stop="imgMaskVisible=true">
            <img :src="model.displayImg" class="avatar">
            <div v-if="imgMaskVisible" class="mark"></div>
            <div v-if="imgMaskVisible" class="btn-wrap">
              <el-tooltip content="重新上传" placement="left" >
                <el-button class="el-icon-delete"></el-button>
              </el-tooltip>
              <el-tooltip content="查看原图" placement="right" >
                <el-button class="el-icon-zoom-in"></el-button>
              </el-tooltip>
            </div>
          </div>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      
      <el-form-item label="作品名称" required>
        <el-input v-model="model.name" placeholder="请输入作品名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="作品类型">
        <el-select v-model="model.courseId" placeholder="请选择作品类型" style="width: 200px;">
          <el-option v-for="item in courses"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作品专题">
        <el-select v-model="model.courseId" placeholder="请选择发布专题" style="width: 200px;">
          <el-option v-for="item in subjects"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作者" required>
        <el-select v-model="model.courseId" placeholder="请选择学员" style="width: 200px;">
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
      <img width="100%" :src="model.displayImg" alt="">
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
        displayImg: "https://store-1256528427.cos.ap-guangzhou.myqcloud.com/2018-6/20d4dec8-1942-4d65-8b96-8a71968ba1c3"

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
      this.post('admin/subject/get', {id}, (response) => {
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
    handleUploadSuccess(response, file, fileList) {
      this.model.displayImg = response.data.original_url
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
