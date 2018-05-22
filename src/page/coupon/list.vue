<template>
  <div id="coupon-list">
    <div class="title">试听券列表</div>
    <div class="btn-wrap">
      <el-input placeholder="输入试听码识别搜索" v-model="searchCode" size="small" style="width:350px;margin-right:10px;">
        <el-tooltip slot="append" content="搜索" placement="top" >
          <el-button icon="el-icon-search"></el-button>
        </el-tooltip>
      </el-input>
      <el-tooltip content="刷新" placement="right" >
        <el-button type="info" icon="el-icon-refresh" plain size="small" ></el-button>
      </el-tooltip>
    </div>
    <div class="list-wrap">
      <el-table
        :data="list"
        border
        :row-style="tableRowStyle"
        style="width: 96%">
        <el-table-column
          prop="code"
          label="试听码">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.use">已使用</span>
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
            <el-button type="warning" plain size="small" disabled v-if="scope.row.use" >使用</el-button>
            <el-button type="warning" plain size="small" @click="use(scope.row.id, scope.row.code)" v-else >使用</el-button>
            <el-button type="danger" plain size="small" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total">
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: 'CouponList',
  data () {
    return {
      searchCode: null,
      total: 80,
      list:[{
        id: 1,
        code: 'AB1234',
        use: false,
        createTime: Date.now()
      },{
        id: 2,
        code: '34S3SB',
        use: true,
        createTime: Date.now()
      }]
    }
  },
  methods: {
    handleUse() {

    },
    tableRowStyle({row, rowIndex}) {
      if(row.use) {
        return 'backgroundColor:#FAB6B6'
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
    use(id, code) {
      this.$confirm(`此操作将使用试听码: ${code}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id)
        this.$message({
          type: 'success',
          message: '使用成功!'
        })
      }).catch(() => {       
      })
    },
    remove(id) {
      this.$confirm('此操作将永久删除该试听码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
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
    font-size: 14px;
  }

  #coupon-list .btn-wrap {
    height: 60px;
    line-height: 60px;
  }

  #coupon-list .list-wrap {
    margin-bottom: 12px;
  }
  
  
</style>
