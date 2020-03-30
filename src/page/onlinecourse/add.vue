<template>
	<div id="onlinecourse-add">
		<v-title-bar>
      <span v-if="type === 'FREE'">添加免费课程</span>  
      <span v-else-if="type === 'UPLOAD'">添加打卡课程</span>
      <span v-else>添加付费课程</span>
    </v-title-bar>

    <el-form label-width="150px" label-position="right" size="small">
      <el-form-item label="课程封面简介" required>
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

      <el-form-item label="课程奖励介绍" required>
        <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="uploadDesc">
          <div v-if="model.descFileId" class="img-wrap" @click.stop="descImgMaskVisible=!descImgMaskVisible">
            <img :src="`${model.descImgThumbnailUrl}?imageView2/1/w/200/h/200`" class="avatar">
            <div v-if="descImgMaskVisible" class="mark"></div>
            <div v-if="descImgMaskVisible" class="btn-wrap">
              <i class="el-icon-delete" @click.stop="deleteDesc"></i>
              <i class="el-icon-zoom-in" @click.stop="descImgDialogVisible = true"></i>
            </div>
          </div>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="课程名称" required>
        <el-input v-model="model.name" placeholder="请输入作品名称" style="width: 270px;"></el-input>
      </el-form-item>
      <el-form-item label="课程类别" required>
        <el-select v-model="model.courseClassId" placeholder="请选择课程类别" style="width: 270px;">
          <el-option v-for="item in courseClass"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="课程价格(元)" v-if="type === 'PAYMENT'" required>
        <el-input-number v-model="model.amount" :precision="1" :min="0" ></el-input-number>
      </el-form-item>

      <el-form-item label="在册人员是否免费" v-if="type === 'PAYMENT'" required>
        <el-radio-group v-model="model.studentFree" style="margin-right: 10px;">
          <el-radio :label="false">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="奖励次数" v-if="type === 'UPLOAD'" required>
        <el-input-number v-model="model.rewardCount" :min="0" :max="99"></el-input-number>
      </el-form-item>

      <el-form-item label="助力活动" v-if="type === 'FREE' || type === 'PAYMENT'" required>
        <el-checkbox v-model="model.activity"></el-checkbox>
        <el-date-picker style="margin-left: 30px;" v-if="model.activity" size="mini" v-model="model.activityExpiryDate" type="date" placeholder="选择限时活动截止时间"></el-date-picker>
        
      </el-form-item>

      <el-form-item label="折扣价(元)" v-if="model.activity" required>
        <el-input-number v-model="model.discountAmount" :precision="1" :step="0.1"></el-input-number>
      </el-form-item>

      <el-form-item label="课程名称" required>
        <el-button type="primary" plain size="mini" @click="addCatalogueVisible = true">添加章节</el-button>
      </el-form-item>

      <el-form-item>
        <el-table :data="model.catalogue" border style="width: 50%">
          <el-table-column prop="name" label="章节名称"></el-table-column>
          <el-table-column prop="videoName" label="视频名称"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" plain @click="handleEditCatalogueVisible(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="removeCatalogue(scope.$index, scope.row)" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="back">返回</el-button>
        <el-button type="success" @click="submit">提交</el-button>
        <el-button type="success" @click="saveAndUpload">上传视频</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="coverImgDialogVisible">
      <img width="100%" :src="model.coverImgUrl" alt="">
    </el-dialog>
    <el-dialog :visible.sync="descImgDialogVisible">
      <img width="100%" :src="model.descImgUrl" alt="">
    </el-dialog>

    <el-dialog title="添加章节" :visible.sync="addCatalogueVisible" width="30%">
      <el-input v-model="catalogueModel.name" placeholder="请输入章节名称" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCatalogueVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCatalogue">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑章节" :visible.sync="editCatalogueVisible" width="30%">
      <el-input v-model="editCatalogueModel.name" placeholder="请输入章节名称" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCatalogueVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCatalogue">确 定</el-button>
      </span>
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
        addCatalogueVisible: false,
        editCatalogueVisible: false,
        coverImgMaskVisible: false,
        coverImgDialogVisible: false,
        descImgMaskVisible: false,
        descImgDialogVisible: false,
        courseClass: [],
      	model: {
          coverFileId: null,
          coverImgUrl: null,
          coverImgThumbnailUrl: null,
          descFileId: null,
          descImgUrl: null,
          descImgThumbnailUrl: null,
          catalogue: [],
          activity: false,
          rewardCount: 0,
          discountAmount: 0,
          amount: 0,
          studentFree: false
        },
        catalogueModel: {},
        editCatalogueModel: {
          index: null,
          name: null
        }
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
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
      },
      deleteDesc() {
        this.model.descFileId = null
      },
      uploadDesc(item) {
        let formData = new FormData(),
          me = this
        formData.append('file', item.file)
        formData.append('type', 'article')
        this.post('/admin/store/upload', formData, (response) => {
          me.model.descFileId = response.data.fileName
          me.model.descImgUrl = response.data.original_url
          me.model.descImgThumbnailUrl = response.data.thumbnail_url
          console.log(me.model)
        })
      },
      addCatalogue() {
        let me = this
        this.model.catalogue.push({
          name: me.catalogueModel.name
        })
        this.catalogueModel.name = null
        this.addCatalogueVisible = false
      },
      handleEditCatalogueVisible(index, row) {
        this.editCatalogueModel.name = this.model.catalogue[index].name
        this.editCatalogueModel.index = index
        this.editCatalogueVisible = true
      },
      editCatalogue() {
        let m = this.model.catalogue[this.editCatalogueModel.index]
        m.name = this.editCatalogueModel.name
        this.editCatalogueModel.name = null
        this.editCatalogueModel.index = null
        this.editCatalogueVisible = false
      },
      removeCatalogue(index, row) {
        this.model.catalogue.splice(index, 1)
      },
      saveAndUpload() {
        //TODO save
        this.$router.push(`/onlinecourse/catalogue/upload/${this.model.id}`)
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
    width: 270px;
    height: 200px;
    position: absolute;
    top: 0;
    border-radius: 15px;
  }

  .img-wrap .btn-wrap {
    width: 270px;
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
    width: 270px;
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
    width: 270px;
    height: 200px;
    display: block;
    border-radius: 15px;
  }

</style>