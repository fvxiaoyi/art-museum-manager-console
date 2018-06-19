<template>
  <div id="star-list">
    <div class="tbar clear">
      <div class="title">点赞查询</div>
    </div>
    <div class="search-bar">
      <el-input placeholder="输入学员名字、家长电话识别搜索" v-model="searchParam.name" size="small" style="width:350px;">
        <el-tooltip slot="append" content="搜索" placement="right" >
          <el-button icon="el-icon-search" @click="search"></el-button>
        </el-tooltip>
      </el-input>
    </div>
    <div class="list-wrap">
      <el-table :data="list" border style="width: 96%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="parentName" label="家长姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="localName" label="校区"></el-table-column>
        <el-table-column prop="monthStar" label="当月赞"></el-table-column>
        <el-table-column prop="totalStar" label="总赞"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看详细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'starList',
  data () {
    return {
      searchParam: {},
      list: []
    }
  },
  methods: {
    search() {

    }
  }
}
</script>


<style scoped>
  #star-list {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
  }

  #star-list .tbar {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #DDDDDD;
    margin-bottom: 12px;
  }

  #star-list .tbar .title {
    float: left;
    font-size: 18px;
  }

  #star-list .list-wrap {
    margin-top: 12px;
  }
  
</style>
