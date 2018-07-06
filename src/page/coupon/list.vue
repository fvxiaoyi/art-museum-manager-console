<template>
  <div id="coupon-list">
    <v-title-bar>预约试听列表</v-title-bar>
    <div class="btn-wrap">
      <el-radio-group v-model="searchParam.status" size="mini">
        <el-radio-button :label="1">全部</el-radio-button>
        <el-radio-button :label="2">未回访</el-radio-button>
        <el-radio-button :label="3">未试听</el-radio-button>
      </el-radio-group>
      <el-input size="mini" v-model="searchParam.phone" placeholder="输入电话号码识别搜索" style="width: 250px;"></el-input>
      <el-button type="info" size="mini" plain @click="handleSearch" >查找</el-button>
      <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh" style="margin: 0;"></el-button>
    </div>
    <div class="list-wrap">
      <el-table
        :data="list"
        border
        :row-style="tableRowStyle"
        style="width: 96%">
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="phone" label="家长电话" width="150"></el-table-column>
        <el-table-column label="回访时间" width="150">
          <template slot-scope="scope">
            <span>{{renderTimePoint(scope.row.timePoint)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{renderStatus(scope.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="预约时间">
          <template slot-scope="scope">
            <span>{{ formatFullCreateTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain @click="remark(scope.row.id, scope.row.remark)">备注</el-button>
            <el-button type="warning" plain size="mini" disabled v-if="scope.row.callBack" >回访</el-button>
            <el-button type="warning" plain size="mini" @click="handleCallBack(scope.row.id, scope.$index)" v-else >回访</el-button>
            <el-button type="success" plain size="mini" disabled v-if="scope.row.archive" >使用</el-button>
            <el-button type="success" plain size="mini" @click="use(scope.row.id, scope.$index)" v-else >使用</el-button>
            <!-- <el-button type="danger" plain size="mini" @click="remove(scope.row.id)">删除</el-button> -->
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

    <el-dialog title="添加备注" :visible.sync="remarkDialogVisible" width="480px">
      <div>
        <el-input v-model="model.remark" type="textarea" placeholder="请输入作品备注" style="width: 400px;" :rows="10"></el-input>
        <el-button type="primary" style="margin-top:20px;" @click="submitRemark">提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'CouponList',
  created() {
    this.getData()
  },
  data () {
    return {
      remarkDialogVisible: false,
      searchCode: null,
      total: 80,
      list:[],
      total: 0,
      currentPage: 1,
      searchParam: {
        status: 1
      },
      model: {
        remark: null
      }
    }
  },
  methods: {
    getData() {
      let me = this
      me.getListData('/admin/coupon/list', me.currentPage, me.searchParam, (data, total) => {
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
        if(param.phone) {
          param.phone = `${param.phone}%`
        }
      })
    },
    handleRefresh() {
      this.searchParam = {
        status: 1
      }
      this.currentPage = 1
      this.getData()
    },
    handleSearch() {
      this.currentPage = 1
      this.getData()
    },
    onPageChange(page) {
      this.currentPage = page
      this.getData()
    },
    renderTimePoint(timePoint) {
      if(timePoint==='MORNING') {
        return '早上(9~12:30)'
      } else if(timePoint==='AFTERNOON') {
        return '中午(14~18:00)'
      } else {
        return '晚上(18~21:30)'
      }
    },
    renderStatus(model) {
      if(model.callBack) {
        if(model.archive) {
          return '已试听'
        }
        return '已回访'
      } else {
        return '未回访'  
      }
    },
    tableRowStyle({row, rowIndex}) {
      if (row.archive) {
        return 'backgroundColor:#FAB6B6'
      } else if (row.callBack) {
        return 'backgroundColor:#F3D19E'
      }
      return ''
    },
    use(id, index) {
      let me = this
      this.$confirm(`此操作是标记该家长已经试听, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.post('/admin/coupon/use', {id}, (response) => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          me.list[index].archive = true
        })
      }).catch(() => {       
      })
    },
    handleCallBack(id, index){
      let me = this
      this.$confirm(`此操作是标记该家长已经回访过, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.post('/admin/coupon/callBack', {id}, (response) => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          me.list[index].callBack = true
        })
      }).catch(() => {       
      })
    },
    remove(id) {
      let me = this
      this.$confirm('此操作将永久删除该试听记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.post('/admin/coupon/remove', {id}, (response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          me.getData()
        })
      }).catch(() => {       
      })
    },
    remark(id, remark) {
      this.model.id = id
      this.model.remark = remark
      this.remarkDialogVisible = true
    },
    submitRemark() {
      this.post('/admin/coupon/addRemark', this.model, (response) => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.remarkDialogVisible = false
        this.getData()
      })
    }
  }
}
</script>


<style scoped>
  #coupon-list {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }

  .list-wrap, .btn-wrap {
    margin-bottom: 12px;
  }
   
</style>
