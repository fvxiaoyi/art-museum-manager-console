<template>
  <div id="article-list">
    <div class="tbar clear">
      <div class="title">作品列表</div>
      <div class="btn-wrap">
        <el-tooltip content="刷新" placement="left" >
          <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh"></el-button>
        </el-tooltip>
        <el-button type="primary" size="mini" @click="handleAdd" >添加</el-button>
      </div>
    </div>
    <div class="search-bar">
      <div class="searchCourse">
        <el-select v-model="searchParam.courseId" placeholder="请选择作品类型" size="small" style="width:150px;">
          <el-option
            v-for="item in courses"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="searchSubject">
        <el-select v-model="searchParam.courseId" placeholder="请选择作品专题" size="small" style="width:150px;">
          <el-option
            v-for="item in subjects"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="searchLocal">
        <el-select v-model="searchParam.localId" placeholder="请选择校区" size="small" style="width:160px;">
          <el-option
            v-for="item in locals"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-input placeholder="输入作品、学员名称识别搜索" v-model="searchParam.name" size="small" style="width:300px;margin-left:12px;">
        <el-tooltip slot="append" content="搜索" placement="right" >
          <el-button icon="el-icon-search" @click="getData(1)"></el-button>
        </el-tooltip>
      </el-input>
    </div>
    <div class="list-wrap">
      <el-table
        :data="list"
        border
        style="width: 96%">
        <el-table-column prop="name" label="作品名称"></el-table-column>
        <el-table-column prop="name" label="学员名称"></el-table-column>
        <el-table-column prop="name" label="作品类型"></el-table-column>
        <el-table-column prop="name" label="发布专题"></el-table-column>
        <el-table-column prop="name" label="校区"></el-table-column>
        <el-table-column prop="name" label="总赞数"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
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
  name: 'ArticleList',
  data () {
    return {
      searchParam: {
      },
      courses: [],
      subjects: [],
      locals: [],
      list: [],
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    getData(page) {
      
    },
    edit(id) {

    },
    remove(id) {

    },
    onPageChange(page) {
      this.currentPage = page
      this.getData(page)
    },
    handleRefresh() {
      this.getData(1)
    },
    handleAdd() {
      this.$router.push('/article/view')
    }
  }
}
</script>


<style scoped>
  #article-list {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }
  
  #article-list .tbar {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #DDDDDD;
    margin-bottom: 12px;
  }

  #article-list .tbar .title {
    float: left;
    font-size: 18px;
  }

  #article-list .tbar .btn-wrap {
    float: right;
  }

  #article-list .search-bar {
    margin: 12px 0;
  }

  #article-list .searchCourse {
    display: inline-block;
  }

  #article-list .searchLocal {
    margin-left: 12px;
    display: inline-block;
  }

  #article-list .searchSubject {
    margin-left: 12px;
    display: inline-block;
  }

  #article-list .list-wrap {
    margin-bottom: 12px;
  }
</style>
