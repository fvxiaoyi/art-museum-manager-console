<template>
  <div id="star-list">
    <v-title-bar>点赞查询</v-title-bar>
    <div>
      <el-input placeholder="输入学员名字、家长电话识别搜索" v-model="searchParam.name" size="mini" style="width:350px;">
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
            <el-button type="primary" size="mini" plain @click="detail(scope.row.id)">查看详细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="年度点赞统计" :visible.sync="dialogVisible" width="520px">
      <div>
        <div class="clear" style="margin-bottom: 20px;">
          <div class="left" style="height: 28px;line-height: 28px;">
            <span>{{detailStar.name}}</span>
            <span style="color: #409EFF;font-weight: bold;">{{searchYear}}</span>
            <span>年</span>
            <span style="color: #F56C6C;font-weight: bold;">{{detailStar.totalYearStar}}</span> 
            <span> 个赞, </span>
            <span>总共 </span>
            <span style="color: #F56C6C;font-weight: bold;">{{detailStar.totalStar}}</span>
            <span> 个赞</span>
          </div>
          <div class="right">
            <el-date-picker size="mini" value-format="yyyy" v-model="year" type="year" placeholder="选择年" :clearable="false" style="width: 120px;"></el-date-picker>
            <el-button size="mini" icon="el-icon-search" @click="detail(detailStar.id)"></el-button>
          </div>
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
      year: new Date().getFullYear() + '',
      searchYear: null
    }
  },
  methods: {
    search() {
      let me = this
      this.post('/admin/star/list', { name: `%${me.searchParam.name}%`}, (response) => me.list = response.data)
    },
    detail(id) {
      let me = this
      this.post('/admin/star/getForYear', { id, year: me.year }, (response) => {
        me.dialogVisible = true
        me.searchYear = me.year
        me.detailStar = response.data
      })
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

</style>
