<template>
  <div id="local-list">
    <v-title-bar>校区列表</v-title-bar>
    <div class="btn-wrap clear">
      <el-button class="left" type="primary" plain size="mini" @click="handleShowAddDialog">添加</el-button>
      <div class="right">
        <el-input size="mini" v-model="searchParam.name" placeholder="请输入校区名称识别搜索" style="width: 250px;"></el-input>
        <el-button type="info" size="mini" plain @click="getData(1)" >查找</el-button>
        <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh" style="margin: 0;"></el-button>
      </div>
    </div>

    <div class="list-wrap">
      <el-table :data="list" border style="width: 96%">
        <el-table-column prop="name" label="校区名"></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain @click="handleShowEditDialog(scope.row, scope.$index)">编辑</el-button>
            <!-- <el-button type="danger" size="mini" @click="remove(scope.row.id)" plain>删除</el-button> -->
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

    <el-dialog title="添加校区" :visible.sync="addDialogVisible" width="30%">
      <el-input v-model="model.name" placeholder="请输入校区名称" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改校区" :visible.sync="editDialogVisible" width="30%">
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
      searchParam: {},
      total: 0,
      currentPage: 1,
      addDialogVisible: false,
      editDialogVisible: false,
      editIndex: 0,
      model: {
        name: null
      },
      list: []
    }
  },
  methods: {
    getData(page) {
      let me = this
      me.getListData('/admin/local/list', page, me.searchParam, (data, total) => {
        me.total = total
        me.list = data
      }, (param) => {
        if(param.name) {
          param.name = `%${param.name}%`
        }
      })
    },
    handleAdd() {
      let me = this
      this.post('/admin/local/add', me.model, (response) => {
        me.$message({
          message: '添加成功',
          type: 'success'
        })
        me.addDialogVisible = false
        me.getData(1)
      })
    },
    handleRefresh() {
      this.searchParam = {}
      this.getData(1)
    },
    handleEdit() {
      let me = this
      this.post('/admin/local/maintain', me.model, (response) => {
        me.$message({
          message: '修改成功',
          type: 'success'
        })
        Object.assign(me.list[me.editIndex], me.model)
        me.editDialogVisible = false
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
        this.post('/admin/local/remove', {id}, (response) => {
          me.$message({
            message: '删除成功',
            type: 'success'
          })
          me.getData(1)
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
  
  .list-wrap, .btn-wrap {
    margin-bottom: 12px;
  }

  .btn-wrap .right {
    margin-right: 4%;
  }
</style>
