<template>
  <div id="catalogue-upload">
    <v-title-bar>上传视频</v-title-bar>
    <el-table :data="catalogues" border style="width: 80%; margin-bottom:10px;">
      <el-table-column prop="name" label="章节名称"></el-table-column>
      <el-table-column prop="videoName" label="视频名称"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" plain @click="upload(scope.$index, scope.row)">上传视频</el-button>
          <el-button type="danger" size="mini" @click="remove(scope.$index, scope.row)" plain>删除视频</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="back">返回</el-button>

    <el-dialog title="上传视频" :visible.sync="dialogVisible" width="30%">
      <el-upload ref="upload" :limit="1" :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
    </el-dialog> 
    
  </div>
</template>

<script>
export default {
  created() {
    this.getData()
  },
  data () {
    return {
      dialogVisible: false,
      catalogues: [],
      catalogueId: null
    }
  },
  methods: {
    submitUpload() {
      let formData = new FormData(),
          me = this
      formData.append('file', this.$refs.upload.uploadFiles[0].raw)
      formData.append('id', this.id)
      formData.append('catalogueId', this.catalogueId)
      this.post(`/admin/onlinecourse/${this.type.toLocaleLowerCase()}/addCatalogueVideo`, formData, (response) => {
        me.dialogVisible = false
        me.catalogueId = null
        me.getData()
      })
    },
    getData() {
      let id = this.$route.params.id
      this.post(`/admin/onlinecourse/${this.type.toLocaleLowerCase()}/getCatalogues`, {id}, (response) => {
        this.catalogues = response.data
      })
    },
    back() {
      this.$router.go(-1)
    },
    upload(index, row) {
      this.catalogueId = row.id
      this.dialogVisible = true
    },
    remove(index, row) {
      this.$confirm('此操作将删除该课程视频, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let me = this
          this.post(`/admin/onlinecourse/${this.type.toLocaleLowerCase()}/removeCatalogueVideo`, {id: me.id, catalogueId: row.id}, (response) => {
            me.$message({
              message: '删除成功',
              type: 'success'
            })
            me.getData()
          })
        }).catch(() => {       
      })
    }
  },
  computed: {
    type() {
      return this.$route.params.type
    },
    id() {
      return this.$route.params.id
    }
  }
}
</script>


<style scoped>
</style>
