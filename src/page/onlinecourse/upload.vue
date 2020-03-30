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

    <el-dialog title="上传视频进度" :visible.sync="dialogVisible" width="30%">
      <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">隐藏</el-button> -->
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.params)
    this.upload()
  },
  data () {
    return {
      dialogVisible: true,
      id: null,
      catalogues: [{
        id: 1,
        name: "test",
        videoName: "videoname"
      }],
      percentage: 0,
      timer: null
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    upload(index, row) {
      this.timer = setInterval(this.myInterval, 500)
      this.dialogVisible = true
    },
    myInterval() {
      this.percentage ++;
      if(this.percentage >= 100) {
        clearInterval(this.timer);
      }
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  }
}
</script>


<style scoped>
</style>
