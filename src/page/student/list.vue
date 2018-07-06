<template>
  <div id="student-list">
    <v-title-bar>学员列表</v-title-bar>

    <div class="btn-wrap clear">
      <el-button class="left" type="primary" plain size="mini" @click="handleAdd">添加</el-button>
      <div class="right">
        <el-radio-group v-model="searchParam.status" size="mini">
          <el-radio-button :label="1">全部</el-radio-button>
          <el-radio-button :label="2">正常</el-radio-button>
          <el-radio-button :label="3">未激活</el-radio-button>
          <el-radio-button :label="4">已停用</el-radio-button>
        </el-radio-group>
        <el-select v-model="searchParam.courseId" placeholder="请选择实验室" size="mini" style="width:160px;">
          <el-option v-for="item in courses" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="searchParam.localId" placeholder="请选择校区" size="mini" style="width:160px;">
          <el-option v-for="item in locals" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-input size="mini" v-model="searchParam.name" placeholder="输入手机号、名称识别搜索" style="width: 250px;"></el-input>
        <el-button type="info" size="mini" plain @click="handleSearch" >查找</el-button>
        <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh" style="margin: 0;"></el-button>
      </div>
    </div>

    <div class="list-wrap">
      <el-table :data="list" border :row-style="tableRowStyle" style="width: 96%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="parentName" label="家长姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="localName" label="校区"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{ statusRender(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ formatCreateTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button v-if="!scope.row.loginLock" type="warning" plain size="small" @click="lock(scope.row.id)">停用</el-button>
            <el-button v-if="scope.row.loginLock" type="success" plain size="small" @click="unlock(scope.row.id)">启用</el-button>
            <!-- <el-button type="danger" plain size="small" @click="remove(scope.row.id)">删除</el-button> -->
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
  activated() {
    this.getData()
  },
  created() {
    let me = this
    this.post('/admin/course/list', {}, (response) => me.courses = response.data)
    this.post('/admin/local/all', {}, (response) => me.locals = response.data)
    this.getData()
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
    getData() {
      let me = this
      me.getListData('/admin/student/list', me.currentPage, me.searchParam, (data, total) => {
        me.total = total
        me.list = data
        if(me.currentPage > 1 && me.list.length == 0) {
          me.currentPage --
          me.getData()
        }
      }, (param) => {
        if(param.status === 1) {
          delete param['status']
        }
        if(param.name) {
          param.name = `%${param.name}%`
        }
      })
    },
    onPageChange(page) {
      this.currentPage = page
      this.getData()
    },
    handleRefresh() {
      this.currentPage = 1
      this.searchParam = {
        status: 1
      }
      this.getData()
    },
    handleSearch() {
      this.currentPage = 1
      this.getData()
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
        this.post('/admin/student/lock', {id}, (response) => {
          this.$message({
            type: 'success',
            message: '停用成功!'
          })
          me.getData()
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
        this.post('/admin/student/unlock', {id}, (response) => {
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
          me.getData()
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
        this.post('/admin/student/remove', {id}, (response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          me.getData()
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

  .list-wrap, .btn-wrap {
    margin-bottom: 12px;
  }
  
  .btn-wrap .right {
    margin-right: 4%;
  }

</style>
