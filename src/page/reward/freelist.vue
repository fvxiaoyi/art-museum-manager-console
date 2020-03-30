<template>
  <div id="reward-freelist">
    <v-title-bar>助力奖励信息列表</v-title-bar>

    <div class="btn-wrap clear">
      <div class="right">
        <el-radio-group v-model="searchParam.status" style="margin-right: 10px;">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">已奖励</el-radio>
          <el-radio :label="2">未奖励</el-radio>
        </el-radio-group>
        <el-input size="mini" v-model="searchParam.name" placeholder="输入课程名称识别搜索" style="width: 250px;"></el-input>
        <el-input size="mini" v-model="searchParam.studentSearch" placeholder="输入学生名称或联系电话识别搜索" style="width: 250px;"></el-input>
        <el-button type="info" size="mini" plain @click="handleSearch" >查找</el-button>
        <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh" style="margin: 0;"></el-button>
      </div>
    </div>

    <div class="list-wrap">
      <el-table
        :data="list"
        border
        style="width: 96%">
        <el-table-column prop="name" label="课程名称"></el-table-column>
        <el-table-column prop="studentName" label="学生名称"></el-table-column>
        <el-table-column prop="studentName" label="年龄"></el-table-column>
        <el-table-column prop="studentName" label="联系电话"></el-table-column>
        <el-table-column prop="studentName" label="助力状态"></el-table-column>
        <el-table-column fixed="right" label="是否获得奖励" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain @click="yes(scope.row)">是</el-button>
            <el-button type="danger" size="mini" @click="no(scope.row)" plain>否</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      @current-change="onPageChange"
      background
      layout="prev, pager, next"
      :page-size="$pageSize"
      :total="total"
      :current-page="currentPage"
      >
    </el-pagination>

  </div>
</template>

<script>
  export default {
    created() {
      let me = this
      // course class
      this.getData()
    },
    data() {
      return {
        searchParam: {
          status: 0
        },
        list: [{
          id: 1,
          name: "test"
        }],
        total: 0,
        currentPage: 1
      }
    },
    methods: {
      handleRefresh() {
        let me = this
        this.searchParam = {}
        this.currentPage = 1
        this.getData()
      },
      handleSearch() {
        this.currentPage = 1
        this.getData()
      },
      getData() {
        let params = {}
        Object.assign(params, this.searchParam)
        if(params.expireDate) {
          params.expireDate = params.expireDate.getTime()
        }
        console.log(params)
      },
      yes(row) {
        let me = this
        this.$confirm('此操作将标记该学员获得奖励, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '标记成功!'
          })
        }).catch(() => {       
        })
      },
      no(row) {
        let me = this
        this.$confirm('此操作将取消标记该学员获得奖励, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '取消成功!'
          })
        }).catch(() => {       
        })
      }
    }
  }
</script>

<style scoped>
  .btn-wrap .right {
    margin-right: 4%;
  }

  .list-wrap, .btn-wrap {
    margin-bottom: 12px;
  }
</style>