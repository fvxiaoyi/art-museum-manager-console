<template>
  <div id="article-list">
    <div class="title">作品列表</div>
    <div class="btn-wrap">
      <el-input placeholder="输入学员或作品名称识别搜索" v-model="searchName" size="small" style="width:350px;margin-right:10px;">
        <el-tooltip slot="append" content="搜索" placement="top" >
          <el-button icon="el-icon-search"></el-button>
        </el-tooltip>
      </el-input>
      <el-tooltip content="刷新" placement="right" >
        <el-button type="info" icon="el-icon-refresh" plain size="small" ></el-button>
      </el-tooltip>
    </div>
    <div class="list-wrap">
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  data () {
    return {
      searchName: null
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
  
  #article-list .title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #DDDDDD;
    font-size: 14px;
  }

  #article-list .btn-wrap {
    height: 60px;
    line-height: 60px;
  }
</style>
