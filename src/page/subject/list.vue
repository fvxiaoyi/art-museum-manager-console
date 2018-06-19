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
      <el-radio-group v-model="searchParam.hot">
        <el-radio :label="1">全部</el-radio>
        <el-radio :label="2">推荐</el-radio>
        <el-radio :label="3">未推荐</el-radio>
      </el-radio-group>
      <div class="searchCourse">
        <el-select v-model="searchParam.courseId" placeholder="请选择要过滤的实验室" size="small">
          <el-option
            v-for="item in courses"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-input placeholder="输入专题名字识别搜索" v-model="searchParam.name" size="small" style="width:350px;margin-left:20px;">
        <el-tooltip slot="append" content="搜索" placement="right" >
          <el-button icon="el-icon-search" @click="search"></el-button>
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
        <el-table-column label="推荐">
          <template slot-scope="scope">
            <span v-if="scope.row.hot">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ formatCreateTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="scope.row.hot" @click="handleHot(scope.row.id, false, scope.$index)">取消推荐</el-button>
            <el-button type="text" size="small" v-else @click="handleHot(scope.row.id, true, scope.$index)">设为推荐</el-button>
            <el-button type="text" size="small" @click="eidt(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row.id)">删除</el-button>
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
  name: 'subjectList',
  created() {
    let me = this
    this.loadCourseData((data) => me.courses = data)
    this.loadData(1)
  },
  data () {
    return {
      searchParam: {
        hot: 1,
        name: null,
        courseId: null
      },
      courses: [],
      list:[],
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    handleAdd() {
      this.$router.push('/subject/view')
    },
    handleRefresh() {
      this.searchParam = {
        hot: 1
      }
      this.loadData(1)
    },
    onPageChange(page) {
      this.currentPage = page
      this.loadData(page)
    },
    search() {
      this.loadData(1)
    },
    handleHot(id, hot, index) {
      let me = this
      this.post('admin/subject/hot', { id: id, hot: hot }, (response) => {
        me.$message({
          message: hot ? '推荐成功' : '取消成功',
          type: 'success'
        })
        me.list[index].hot = hot
      })
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
      let params = { start, limit },
        _params = me.searchParam
      if(_params) {
        for(let x in _params) {
          if(!_params[x]) {
            delete _params[x]
          }
        }
        Object.assign(params, _params)
        if(params.hot === 1) {
          delete params.hot
        } else if(params.hot === 2) {
          params.hot = true
        } else if(params.hot === 3) {
          params.hot = false
        }
        if(params.name) {
          params.name = `%${params.name}%`
        }
      }
      this.post('admin/subject/list', params, (response) => {
        me.list = response.data
        me.total = response.total
      })
    },
    remove(id) {
      let me = this
      this.post(`admin/subject/remove/${id}`, {}, (response) => {
        me.$message({
          message: '删除成功',
          type: 'success'
        })
        me.loadData(1)
      })
    },
    eidt(id) {
      this.$router.push(`/subject/view/${id}`)
    }
  }
}
</script>


<style scoped>
  #subject-list {
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
