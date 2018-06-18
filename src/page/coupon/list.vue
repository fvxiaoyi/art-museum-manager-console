<template>
  <div id="coupon-list">
    <div class="title">预约试听列表</div>
    <div class="btn-wrap">
      <el-radio-group v-model="searchParam.status" >
        <el-radio :label="1">全部</el-radio>
        <el-radio :label="2">未回访</el-radio>
        <el-radio :label="3">未试听</el-radio>
      </el-radio-group>
      <el-input placeholder="输入电话号码识别搜索" v-model="searchParam.phone" size="small" style="width:350px;margin:0 10px;">
        <el-tooltip slot="append" content="搜索" placement="top" >
          <el-button icon="el-icon-search" @click="getData(1)"></el-button>
        </el-tooltip>
      </el-input>
      <el-tooltip content="刷新" placement="right" >
        <el-button type="info" icon="el-icon-refresh" plain size="small" @click="handleRefresh" ></el-button>
      </el-tooltip>
    </div>
    <div class="list-wrap">
      <el-table
        :data="list"
        border
        :row-style="tableRowStyle"
        style="width: 96%">
        <el-table-column
          prop="name"
          label="名字">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="家长电话" width="150">
        </el-table-column>
        <el-table-column
          label="回访时间" width="150">
          <template slot-scope="scope">
            <span>{{renderTimePoint(scope.row.timePoint)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span>{{renderStatus(scope.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="预约时间">
          <template slot-scope="scope">
            <span>{{ formatCreateTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="230">
          <template slot-scope="scope">
            <el-button type="warning" plain size="small" disabled v-if="scope.row.callBack" >回访</el-button>
            <el-button type="warning" plain size="small" @click="handleCallBack(scope.row.id, scope.$index)" v-else >回访</el-button>

            <el-button type="warning" plain size="small" disabled v-if="scope.row.archive" >使用</el-button>
            <el-button type="warning" plain size="small" @click="use(scope.row.id, scope.$index)" v-else >使用</el-button>
            <el-button type="danger" plain size="small" @click="remove(scope.row.id)">删除</el-button>
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
  name: 'CouponList',
  created() {
    let me = this
    this.getData(1)
  },
  data () {
    return {
      searchCode: null,
      total: 80,
      list:[],
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
        if(params.phone) {
          params.phone = `${params.phone}%`
        }
      }
      this.post('admin/coupon/list', params, (response) => {
        me.list = response.data
        me.total = response.total
      })
    },
    handleRefresh() {
      this.searchParam = {
        status: 1
      }
      this.getData(1)
    },
    onPageChange(page) {
      this.currentPage = page
      this.getData(page)
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
    formatCreateTime(time) {
      if(time) {
        let d = new Date(time)
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      } else {
        return ''
      }
    },
    use(id, index) {
      let me = this
      this.$confirm(`此操作是标记该家长已经试听, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
        this.post('admin/coupon/use', {id}, (response) => {
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
        this.post('admin/coupon/callBack', {id}, (response) => {
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
        this.post('admin/coupon/delete', {id}, (response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          me.getData(1)
        })
      }).catch(() => {       
      })
    }
  },
  computed: {
    pageSize() {
      return this.$pageSize
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

  #coupon-list .title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #DDDDDD;
    font-size: 18px;
  }

  #coupon-list .btn-wrap {
    height: 60px;
    line-height: 60px;
  }

  #coupon-list .list-wrap {
    margin-bottom: 12px;
  }
  
  
</style>
