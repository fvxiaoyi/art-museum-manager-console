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
            <el-button type="text" size="small" @click="detail(scope.row.id)">查看详细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="年度点赞统计" :visible.sync="dialogVisible" width="520px">
      <div>
        <div class="clear">
          <div class="left">
            <el-date-picker value-format="yyyy" v-model="year" type="year" placeholder="选择年" :clearable="false"></el-date-picker>
            <el-button icon="el-icon-search" @click="detailSearch(detailStar.id)"></el-button>
          </div>
          <span class="right">{{detailStar.name}} 总共 <span style="color: #F56C6C;font-weight: bold;">{{detailStar.totalStar}}</span> 个赞</span>
        </div>
        <div class="cell">
          <span>{{year}} 年 <span style="color: #F56C6C;font-weight: bold;">{{detailStar.totalYearStar}}</span> 个赞</span>
        </div>
        <div>
          <table class="detailTable">
            <tr class="label">
              <td>一月</td>
              <td>二月</td>
              <td>三月</td>
              <td>四月</td>
              <td>五月</td>
              <td>六月</td>
            </tr>
            <tr>
              <td>{{detailStar.januaryStar}}</td>
              <td>{{detailStar.februaryStar}}</td>
              <td>{{detailStar.marchStar}}</td>
              <td>{{detailStar.aprilStar}}</td>
              <td>{{detailStar.mayStar}}</td>
              <td>{{detailStar.juneStar}}</td>
            </tr>
            <tr class="label">
              <td>七月</td>
              <td>八月</td>
              <td>九月</td>
              <td>十月</td>
              <td>十一月</td>
              <td>十二月</td>
            </tr>
            <tr>
              <td>{{detailStar.julyStar}}</td>
              <td>{{detailStar.augustStar}}</td>
              <td>{{detailStar.septemberStar}}</td>
              <td>{{detailStar.octoberStar}}</td>
              <td>{{detailStar.novemberStar}}</td>
              <td>{{detailStar.decemberStar}}</td>
            </tr>
          </table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'starList',
  data () {
    return {
      dialogVisible: false,
      searchParam: {},
      list: [],
      detailStar: {},
      year: new Date().getFullYear() + ''
    }
  },
  methods: {
    search() {
      let me = this
      this.post('admin/star/list', { name: `%${me.searchParam.name}%`}, (response) => me.list = response.data)
    },
    detail(id) {
      let me = this
      this.post('admin/star/getForYear', { id, year: me.year }, (response) => {
        me.dialogVisible = true
        me.detailStar = response.data
      })
    },
    detailSearch(id) {
      let me = this
      if(me.year) {
        this.post('admin/star/getForYear', { id, year: me.year }, (response) => {
          me.dialogVisible = true
          me.detailStar = response.data
        })
      }
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

  #star-list .detailTable td {
    width: 100px;
    height: 30px;
    text-align: center;
    border: 1px solid #DDDDDD;
  }
  
  #star-list .label td {
    font-weight: bold;
  }

  #star-list .cell {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    margin-top: 14px;
    margin-bottom: 10px;
  }
</style>
