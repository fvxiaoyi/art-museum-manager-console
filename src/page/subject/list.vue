<template>
  <div id="subject-list">
    <v-title-bar>专题列表</v-title-bar>
    <div class="btn-wrap clear">
      <el-button class="left" type="primary" plain size="mini" @click="handleAdd">添加</el-button>
      <div class="right">
        <el-radio-group v-model="searchParam.hot" size="mini">
          <el-radio-button :label="1">全部</el-radio-button>
          <el-radio-button :label="2">推荐</el-radio-button>
          <el-radio-button :label="3">未推荐</el-radio-button>
        </el-radio-group>
        <el-select v-model="searchParam.courseId" placeholder="请选择要过滤的作品类型" size="mini">
          <el-option
            v-for="item in courses"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input size="mini" v-model="searchParam.name" placeholder="输入专题名称识别搜索" style="width: 250px;"></el-input>
        <el-button type="info" size="mini" plain @click="handleSearch" >查找</el-button>
        <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh" style="margin: 0;"></el-button>
      </div>
    </div>

    <div class="list-wrap">
      <el-table :data="list" border style="width: 96%">
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
            <el-button type="warning" size="mini" plain v-if="scope.row.hot" @click="handleHot(scope.row.id, false, scope.$index)">取消推荐</el-button>
            <el-button type="success" size="mini" plain v-else @click="handleHot(scope.row.id, true, scope.$index)">设为推荐</el-button>
            <el-button type="primary" size="mini" plain @click="edit(scope.row.id)">编辑</el-button>
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

  </div>
</template>

<script>
export default {
  name: 'subjectList',
  activated() {
    this.getData()
  },
  created() {
    let me = this
    this.post('/admin/course/list', {}, (response) => me.courses = response.data)
    this.getData()
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
    handleHot(id, hot, index) {
      let me = this
      this.post('/admin/subject/hot', { id: id, hot: hot }, (response) => {
        me.$message({
          message: hot ? '推荐成功' : '取消成功',
          type: 'success'
        })
        me.list[index].hot = hot
      })
    },
    getData() {
      let me = this
      me.getListData('/admin/subject/list', me.currentPage, me.searchParam, (data, total) => {
        me.total = total
        me.list = data
        if(me.currentPage > 1 && me.list.length == 0) {
          me.currentPage --
          me.getData()
        }
      }, (param) => {
        if(param.hot === 1) {
          delete param.hot
        } else if(param.hot === 2) {
          param.hot = true
        } else if(param.hot === 3) {
          param.hot = false
        }
        if(param.name) {
          param.name = `%${param.name}%`
        }
      })
    },
    remove(id) {
      let me = this
      this.post('/admin/subject/remove', {id}, (response) => {
        me.$message({
          message: '删除成功',
          type: 'success'
        })
        me.getData()
      })
    },
    edit(id) {
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

  .list-wrap, .btn-wrap {
    margin-bottom: 12px;
  }

  .btn-wrap .right {
    margin-right: 4%;
  }

</style>
