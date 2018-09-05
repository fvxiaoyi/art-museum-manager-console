<template>
  <div id="gift-list">
    <v-title-bar>奖品兑换</v-title-bar>
    <div class="btn-wrap">
      <el-input size="mini" v-model="phone" placeholder="输入电话号码识别搜索" style="width: 250px;"></el-input>
      <el-button type="info" size="mini" plain @click="getData" >查找</el-button>
      <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh" style="margin: 0;"></el-button>
    </div>
    <div class="sub-title">
      <i class="el-icon-search"></i>
      <span>查询结果</span>
    </div>
    <div v-if="searchModel.id">
      <div class="stu-info">
        <span class="cell">
          <span class="lable">名字: </span>
          <span class="value">{{searchModel.name}}</span>
        </span>
        <span class="cell">
          <span class="lable">校区: </span>
          <span class="value">{{searchModel.localName}}</span>
        </span>
        <span class="cell">
          <span class="lable">家长: </span>
          <span class="value">{{searchModel.parentName}}</span>
        </span>
      </div>
      <div class="socre-info">
        <span style="color: #409EFF; margin-right: 58px; font-weight: bold;">可用积分: {{canUseScore}}</span>
        <i class="el-icon-question" style="color: #E6A23C;"></i>
        <span style="font-weight: bold;">明细:</span>
        <span>
          <span style="color: #909399">(总赞){{searchModel.totalStar}}</span>
          <span>-</span>
          <span style="color: #F56C6C">(已兑换){{searchModel.totalScore}}</span>
          <span>=</span>
          <span style="color: #67C23A;">(可用){{canUseScore}}</span>
        </span>
      </div>
      <div class="sub-title clear">
        <div class="left" style="margin-right: 40px;">
          <i class="el-icon-goods"></i>
          <span>兑换记录</span>
        </div>
        <div class="left"><el-button type="primary" size="mini" plain @click="handleAddView" >添加</el-button></div>
      </div>
      <div class="list-wrap">
        <el-table :data="searchModel.gifts" border style="width: 96%"  height="250" >
          <el-table-column prop="giftDesc" label="奖品名称"></el-table-column>
          <el-table-column prop="score" label="兑换积分"></el-table-column>
          <el-table-column label="兑换时间">
            <template slot-scope="scope">
              <span>{{ formatFullCreateTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
    <el-dialog title="添加兑换记录" :visible.sync="addDialogVisible" width="30%">
      <el-input v-model="model.desc" placeholder="请输入奖品名称" style="margin-bottom: 20px;" ></el-input>
      <el-input v-model="model.score" type="number" placeholder="请输入奖品所需积分" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  name: 'CouponList',
  data() {
    return {
      phone: null,
      searchModel: {},
      model: {},
      addDialogVisible: false
    }
  },
  methods: {
    getData() {
      if(this.phone) {
        this.post('/admin/gift/summary', { phone: this.phone }, (response) => {
          this.searchModel = response.data || {}
        })
      } else {
        this.$message({
          message: '请输入电话号码识别搜索',
          type: 'warning'
        })
      }
      
    },
    handleAddView() {
      this.addDialogVisible = true
    },
    handleAdd() {
      if(this.model.desc && this.model.score) {
        this.model.studentId = this.searchModel.id
        this.post('/admin/gift/add', this.model, (response) => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.model = {}
          this.addDialogVisible = false
          this.getData()
        })
      } else {
        this.$message({
          message: '兑换奖品内容不能为空',
          type: 'warning'
        })
      }
    },
    handleRefresh() {
      this.phone = null
      this.model = {}
      this.searchModel = {}
    }
  },
  computed: {
    canUseScore() {
      return this.searchModel.totalStar - this.searchModel.totalScore
    }
  }
}
</script>

<style scoped>

  .btn-wrap {
    margin-bottom: 10px;
  }

  .sub-title {
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    font-size: 15px;
    border-top: 1px solid #DDDDDD;
  }

  .stu-info .lable {
    font-weight: bold;

  }

  .stu-info .cell {
    margin-right: 20px;
    height: 40px;
    line-height: 40px;
  }

  .socre-info {
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
  }

</style>
