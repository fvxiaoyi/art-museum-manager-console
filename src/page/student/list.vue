<template>
  <div id="student-list">
    <div class="tbar clear">
      <div class="title">学员列表</div>
      <div class="btn-wrap">
        <el-tooltip content="刷新" placement="left" >
          <el-button type="info" icon="el-icon-refresh" plain size="mini" ></el-button>
        </el-tooltip>
        <el-button type="primary" size="mini" @click="handleAdd" >添加</el-button>
      </div>
    </div>
    <dir class="search-bar">
      <el-radio-group v-model="status">
        <el-radio :label="0">全部</el-radio>
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="2">未激活</el-radio>
        <el-radio :label="3">已停用</el-radio>
      </el-radio-group>
      <el-input placeholder="输入学员、家长名称或者手机号识别搜索" v-model="searchName" size="small" style="width:350px;margin-left:20px;">
        <el-tooltip slot="append" content="搜索" placement="right" >
          <el-button icon="el-icon-search"></el-button>
        </el-tooltip>
      </el-input>
    </dir>
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
          label="激活">
          <template slot-scope="scope">
            <span v-if="scope.row.active">已激活</span>
            <span v-else>{{ scope.row.activeCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.lock">已停用</span>
            <span v-else>正常</span>
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
            <el-button @click="handleEdit(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
            <el-button v-if="!scope.row.lock" type="text" size="small" @click="lock">停用</el-button>
            <el-button v-else type="text" size="small" @click="unlock">启用</el-button>
            <el-button type="text" size="small" @click="remove">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="6"
      :total="total">
    </el-pagination>

    <el-dialog
      title="修改学员基本资料"
      :visible.sync="studentEditDialogVisible"
      >
      <el-form label-width="80px">
        <el-form-item label="学员名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="家长名称">
          <el-input v-model="model.parentName"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="model.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="studentEditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">更 新</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'StudentList',
  data () {
    return {
      searchName: null,
      status: 0,
      studentEditDialogVisible: false,
      total: 100,
      model: {},
      editIndex: null,
      list: [{
        id: 1,
        name: '张三',
        parentName: '李四',
        phone: '123456789',
        active: true,
        activeCode: 'A3B4',
        lock: false,
        createTime: Date.now()
      },
      {
        id: 2,
        name: '张三',
        parentName: '李四',
        phone: '123456789',
        active: false,
        activeCode: 'A3B4',
        lock: false,
        createTime: Date.now()
      },
      {
        id: 3,
        name: '张三',
        parentName: '李四',
        phone: '123456789',
        active: true,
        activeCode: 'A3B4',
        lock: false,
        createTime: Date.now()
      },
      {
        id: 4,
        name: '张三',
        parentName: '李四',
        phone: '123456789',
        active: true,
        activeCode: 'A3B4',
        lock: true,
        createTime: Date.now()
      },
      {
        id: 5,
        name: '张三',
        parentName: '李四',
        phone: '123456789',
        active: true,
        activeCode: 'A3B4',
        lock: false,
        createTime: Date.now()
      },
      {
        id: 6,
        name: '张三',
        parentName: '李四',
        phone: '123456789',
        active: true,
        activeCode: 'A3B4',
        lock: false,
        createTime: Date.now()
      }]
    }
  },
  methods: {
    tableRowStyle({row, rowIndex}) {
      if (row.lock) {
        return 'backgroundColor:#FAB6B6'
      } else if (!row.active) {
        return 'backgroundColor:#F3D19E'
      }
      return ''
    },
    formatCreateTime(time) {
      if(time) {
        let d = new Date(time)
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      } else {
        return ''
      }
    },
    handleEdit(model, index) {
      this.studentEditDialogVisible = true
      Object.assign(this.model, model)
      this.editIndex = index
    },
    handleAdd() {
      this.$router.push('/student/add')
    },
    update() {
      if((this.model.name && this.model.name.length > 0) || (this.model.parentName && this.model.parentName.length > 0)) {
        Object.assign(this.list[this.editIndex], this.model)
        this.editIndex = null
        this.model = {}
        this.studentEditDialogVisible = false
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
      } else {
        this.$message({
          message: '至少要填写一个学员名字或家长名字',
          type: 'warning'
        })
      }
      
    },
    lock() {
      this.$confirm('此操作将停用帐号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '停用成功!'
        })
      }).catch(() => {        
      })
    },
    unlock() {
      this.$confirm('此操作将启用帐号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '启用成功!'
        })
      }).catch(() => {        
      })
    },
    remove() {
      this.$confirm('此操作将永久删除该帐号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {       
      })
    }
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
    font-size: 14px;
  }

  #student-list .tbar .btn-wrap {
    float: right;
  }

  #student-list .search-bar {
    padding: 0;
  }

  #student-list .list-wrap {
    margin-bottom: 12px;
  }
  
</style>
