<template>
  <div id="student-list">
    <div class="tbar clear">
      <div class="title">学员列表</div>
      <div class="btn-wrap">
        <el-tooltip content="刷新" placement="left" >
          <el-button type="info" icon="el-icon-refresh" plain size="mini" ></el-button>
        </el-tooltip>
        <el-button type="primary" size="mini" >添加</el-button>
      </div>
    </div>
    <dir class="search-bar">
      <el-input placeholder="输入学员或家长名称识别搜索" v-model="searchName" size="small" style="width:350px;">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </dir>
    <div class="list-wrap">
      <el-table
        :data="list"
        border
        :row-style="tableRowStyle"
        style="width: 100%;">
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
          prop="activeCode"
          label="激活">
        </el-table-column>
        <el-table-column
          prop="lock"
          label="停用">
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">{{scope.row.lock}}停用</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'StudentList',
  data () {
    return {
      searchName: null,
      list: [{
        name: '张三',
        parentName: '李四',
        phone: '123456789',
        active: true,
        activeCode: 'A3B4',
        lock: false
      },
      {
        name: '张三',
        parentName: '李四',
        phone: '123456789',
        active: false,
        activeCode: 'A3B4',
        lock: false
      },
      {
        name: '张三',
        parentName: '李四',
        phone: '123456789',
        active: true,
        activeCode: 'A3B4',
        lock: true
      }]
    }
  },
  methods: {
    tableRowStyle({row, rowIndex}) {
      if (row.lock) {
        return 'backgroundColor:#FDF0F0;'
      } else if (!row.active) {
        return 'backgroundColor:#FCF6EC;'
      }
      return ''
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
  
</style>
