<template>
  <div id="local-list">
    <div class="tbar clear">
      <div class="title">校区列表</div>
      <div class="btn-wrap">
        <el-tooltip content="刷新" placement="left" >
          <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh"></el-button>
        </el-tooltip>
        <el-button type="primary" size="mini" @click="handleShowAddDialog" >添加</el-button>
      </div>
    </div>

    <div class="list-wrap">
      <el-table
        :data="list"
        border
        style="width: 96%">
        <el-table-column
          prop="name"
          label="校区名">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleShowEditDialog(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
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

    <el-dialog
      title="添加校区"
      :visible.sync="addDialogVisible"
      width="30%">
      <el-input v-model="model.name" placeholder="请输入校区名称" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改校区"
      :visible.sync="editDialogVisible"
      width="30%">
      <el-input v-model="model.name" placeholder="请输入校区名称" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'localList',
  created() {
    this.getData(1)
  },
  data () {
    return {
      total: 0,
      currentPage: 1,
      addDialogVisible: false,
      editDialogVisible: false,
      editIndex: 0,
      model: {
        name: null
      },
      list: [{
        id: 1,
        name: '河向东'
      }]
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
      this.$http.post(`${me.$server_uri}/local/list`, { start, limit }).then(function (response) {
        me.total = response.data.total
        me.list = response.data.data
      })
    },
    handleAdd() {
      let me = this
      this.$http.post(`${me.$server_uri}/local/add`, me.model).then(function (response) {
        if(response.data.success) {
          me.$message({
            message: '添加成功',
            type: 'success'
          })
          me.addDialogVisible = false
          me.getData(me.currentPage)
        } else {
          me.$message({
            message: response.data.msg,
            type: 'warning'
          })
        }
      })
    },
    handleRefresh() {
      this.currentPage = 1
      this.getData(1)
    },
    handleEdit() {
      let me = this
      this.$http.post(`${me.$server_uri}/local/maintain`, me.model).then(function (response) {
        if(response.data.success) {
          me.$message({
            message: '修改成功',
            type: 'success'
          })
          Object.assign(me.list[me.editIndex], me.model)
          me.editDialogVisible = false
        } else {
          me.$message({
            message: response.data.msg,
            type: 'warning'
          })
        }
      })
    },
    onPageChange(page) {
      this.currentPage = page
      this.getData(page)
    },
    handleShowEditDialog(model, index) {
      Object.assign(this.model, model)
      this.editIndex = index
      this.editDialogVisible = true
    },
    handleShowAddDialog(){
      this.addDialogVisible = true
      this.model = {
        name: null
      }
    },
    remove(id) {
      this.$confirm('此操作将删除该校区,删除后该校区下的学员校区信息将被清空, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let me = this
        this.$http.post(`${me.$server_uri}/local/remove/${id}`, {}).then(function (response) {
          if(response.data.success) {
            me.$message({
              message: '删除成功',
              type: 'success'
            })
            me.getData(1)
          } else {
            me.$message({
              message: response.data.msg,
              type: 'warning'
            })
          }
        })
      }).catch(() => {       
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

  #local-list .tbar {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #DDDDDD;
    margin-bottom: 12px;
  }

  #local-list .tbar .title {
    float: left;
    font-size: 14px;
  }

  #local-list .tbar .btn-wrap {
    float: right;
  }
  
  #local-list .list-wrap {
    margin-bottom: 12px;
  }
</style>
