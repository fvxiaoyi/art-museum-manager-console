<template>
  <div id="subject-list">
    <div class="tbar clear">
      <div class="title">专题列表</div>
      <div class="btn-wrap">
        <el-tooltip content="刷新" placement="left" >
          <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh"></el-button>
        </el-tooltip>
        <el-button type="primary" size="mini" @click="handleAdd" >添加</el-button>
      </div>
    </div>
    <div class="search-bar">
      <el-radio-group v-model="searchParam.status">
        <el-radio :label="0">全部</el-radio>
        <el-radio :label="1">推荐</el-radio>
        <el-radio :label="2">未推荐</el-radio>
      </el-radio-group>
      <div class="searchCourse">
        <el-select v-model="searchParam.course" placeholder="请选择要过滤的实验室" size="small">
          <el-option
            v-for="item in courses"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-input placeholder="输入专题名字识别搜索" v-model="searchParam.searchName" size="small" style="width:350px;margin-left:20px;">
        <el-tooltip slot="append" content="搜索" placement="right" >
          <el-button icon="el-icon-search"></el-button>
        </el-tooltip>
      </el-input>
    </div>
    <div class="list-wrap">
      <el-table
        :data="list"
        border
        style="width: 96%">
        <el-table-column prop="name" label="专题名"></el-table-column>
        <el-table-column prop="courseName" label="实验室"></el-table-column>
        <el-table-column prop="name" label="推荐"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'subjectList',
  created() {
    let me = this
    this.loadCourseData((data) => me.courses=data)
    this.loadData(1)
  },
  data () {
    return {
      searchParam: {
        status: 0,
        name: null,
        course: null
      },
      courses: [],
      list:[],
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    handleAdd() {
      this.$router.push('/subject/add')
    },
    handleRefresh() {

    },
    loadData(page) {
      let me = this,
        limit = this.$pageSize,
        start
      if(page === 1) {
        start = 0
      } else {
        start = this.$pageSize * (page - 1)
      }
      this.$http.post(`${me.$server_uri}/subject/list`, { start, limit }).then(function (response) {
        me.total = response.data.total
        me.list = response.data.data
      })
    }
  }
}
</script>


<style scoped>
  #local-list {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }

  #subject-list .tbar {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #DDDDDD;
    margin-bottom: 12px;
  }

  #subject-list .tbar .title {
    float: left;
    font-size: 18px;
  }

  #subject-list .tbar .btn-wrap {
    float: right;
  }

  #subject-list .search-bar {
    margin: 12px 0;
  }

  #subject-list .searchCourse {
    margin-left: 36px;
    display: inline-block;
  }
  
  #subject-list .list-wrap {
    margin-bottom: 12px;
  }
</style>
