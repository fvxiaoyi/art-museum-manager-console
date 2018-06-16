<template>
  <div id="student-list">
    <div class="tbar clear">
      <div class="title">学员列表</div>
      <div class="btn-wrap">
        <el-tooltip content="刷新" placement="left" >
          <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="refresh"></el-button>
        </el-tooltip>
        <el-button type="primary" size="mini" @click="handleAdd" >添加</el-button>
      </div>
    </div>
    <div class="search-bar">
      <el-radio-group v-model="searchParam.status" >
        <el-radio :label="1">全部</el-radio>
        <el-radio :label="2">正常</el-radio>
        <el-radio :label="3">未激活</el-radio>
        <el-radio :label="4">已停用</el-radio>
      </el-radio-group>
      <div class="searchCourse">
        <el-select v-model="searchParam.courseId" placeholder="请选择实验室" size="small" style="width:150px;">
          <el-option
            v-for="item in courses"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="searchLocal">
        <el-select v-model="searchParam.localId" placeholder="请选择校区" size="small" style="width:150px;">
          <el-option
            v-for="item in locals"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-input placeholder="输入手机号、名称搜索" v-model="searchParam.name" size="small" style="width:250px;margin-left:20px;">
        <el-tooltip slot="append" content="搜索" placement="right" >
          <el-button icon="el-icon-search" @click="getData(1)"></el-button>
        </el-tooltip>
      </el-input>
    </div>
    <div class="list-wrap">
      <el-table
        :data="list"
        border
        :row-style="tableRowStyle"
        style="width: 96%">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="parentName"
          label="家长姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="localName"
          label="校区">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span>{{ statusRender(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template slot-scope="scope">
            <span>{{ formatCreateTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.active && !scope.row.loginLock" type="text" size="small" @click="lock(scope.row.id)">停用</el-button>
            <el-button v-if="scope.row.active && scope.row.loginLock" type="text" size="small" @click="unlock(scope.row.id)">启用</el-button>
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
  name: 'StudentList',
  created() {
    let me = this
    this.loadCourseData((data) => me.courses = data)
    this.post('admin/local/all', {}, (response) => me.locals = response.data)
    this.getData(1)
  },
  data () {
    return {
      locals: [],
      courses: [],
      list: [],
      total: 0,
      currentPage: 1,
      searchParam: {
        status: 1
      }
    }
  },
  methods: {
    getData(page) {
      let me = this,
        limit = this.$pageSize,
        start
      if(page === 1) {
        start = 0
      } else {
        start = this.$pageSize * (page - 1)
      }
      let params = { start, limit }
      if(me.searchParam) {
        for(let x in me.searchParam) {
          if(!me.searchParam[x]) {
            delete me.searchParam[x]
          }
        }
        Object.assign(params, me.searchParam)
        if(params.status === 1) {
          delete params['status']
        }
        if(params.name) {
          params.name = `%${params.name}%`
        }
      }
      this.post('admin/student/list', params, (response) => {
        me.list = response.data
        me.total = response.total
      })
    },
    onPageChange(page) {
      this.currentPage = page
      this.getData(page)
    },
    refresh() {
      this.searchParam = {
        status: 1
      }
      this.getData(1)
    },
    tableRowStyle({row, rowIndex}) {
      if (row.loginLock) {
        return 'backgroundColor:#FAB6B6'
      } else if (!row.active) {
        return 'backgroundColor:#F3D19E'
      }
      return ''
    },
    handleEdit(id) {
      this.$router.push(`/student/view/${id}`)
    },
    handleAdd() {
      this.$router.push('/student/view')
    },
    lock(id) {
      let me = this
      this.$confirm('此操作将停用帐号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.post('admin/student/lock', {id}, (response) => {
          this.$message({
            type: 'success',
            message: '停用成功!'
          })
          me.getData(me.currentPage)
        })
      }).catch(() => {        
      })
    },
    unlock(id) {
      let me = this
      this.$confirm('此操作将启用帐号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.post('admin/student/unlock', {id}, (response) => {
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
          me.getData(me.currentPage)
        })
      }).catch(() => {        
      })
    },
    remove(id) {
      let me = this
      this.$confirm('此操作将永久删除该帐号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.post('admin/student/remove', {id}, (response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          me.getData(currentPage)
        })
      }).catch(() => {       
      })
    },
    statusRender(model) {
      if(model.active) {
        if(model.loginLock) {
          return '已冻结'
        } else {
          return '正常'
        }
      } else {
        return '未激活'
      }
    }
  },
  computed: {
  }
}
</script>


<style scoped>
  #student-list {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }

  #student-list .tbar {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #DDDDDD;
  }

  #student-list .tbar .title {
    float: left;
    font-size: 18px;
  }

  #student-list .tbar .btn-wrap {
    float: right;
  }

  #student-list .search-bar {
    margin: 12px 0;
  }

  #student-list .list-wrap {
    margin-bottom: 12px;
  }
  
  #student-list .searchCourse {
    margin-left: 12px;
    display: inline-block;
  }

  #student-list .searchLocal {
    margin-left: 12px;
    display: inline-block;
  }
  
</style>
