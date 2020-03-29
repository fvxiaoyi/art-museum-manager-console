<template>
	<div id="onlinecourse-add">
		<v-title-bar>
      <span v-if="type === 'FREE'">添加免费课程</span>  
      <span v-else-if="type === 'UPLOAD'">添加打卡课程</span>
      <span v-else>添加付费课程</span>
    </v-title-bar>

    <el-form label-width="100px" size="small">
      <el-form-item label="课程封面简介">
        <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="uploadCover">
          <div v-if="model.coverFileId" class="img-wrap" @click.stop="coverImgMaskVisible=!coverImgMaskVisible">
            <img :src="`${model.coverImgThumbnailUrl}?imageView2/1/w/200/h/200`" class="avatar">
            <div v-if="coverImgMaskVisible" class="mark"></div>
            <div v-if="coverImgMaskVisible" class="btn-wrap">
              <i class="el-icon-delete" @click.stop="deleteCover"></i>
              <i class="el-icon-zoom-in" @click.stop="coverImgDialogVisible = true"></i>
            </div>
          </div>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!--<el-form-item label="课程奖励介绍">
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
      </el-form-item> -->
      
      <el-form-item label="课程名称" required>
        <el-input v-model="model.name" placeholder="请输入作品名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="课程类别" required>
        <el-select v-model="model.courseClassId" placeholder="请选择课程类别" style="width: 200px;">
          <el-option v-for="item in courseClass"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="back">返回</el-button>
        <el-button type="success" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="coverImgDialogVisible">
      <img width="100%" :src="model.coverImgUrl" alt="">
    </el-dialog>
	</div>
</template>

<script>
	export default {
		created() {
      console.log(this.$route.params)
		},
		data() {
      return {
        coverImgMaskVisible: false,
        coverImgDialogVisible: false,
        courseClass: [],
      	model: {
          coverFileId: null,
          coverImgUrl: null,
          coverImgThumbnailUrl: null
        }
      }
    },
    methods: {
      deleteCover() {
        this.model.coverFileId = null
      },
    	uploadCover(item) {
        let formData = new FormData(),
          me = this
        formData.append('file', item.file)
        formData.append('type', 'article')
        this.post('/admin/store/upload', formData, (response) => {
          me.model.coverFileId = response.data.fileName
          me.model.coverImgUrl = response.data.original_url
          me.model.coverImgThumbnailUrl = response.data.thumbnail_url
          console.log(me.model)
        })
      }
    },
    computed: {
      type() {
        return this.$route.params.type
      }
    }
	}
</script>

<style scoped>
	 
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