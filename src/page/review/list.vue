<template>
	<div class="review-list">
		<v-title-bar>评审信息列表</v-title-bar>

    <div class="btn-wrap clear">
    	<div class="left">
	    	<el-radio-group v-model="searchParam.status" style="margin-right: 10px;">
	        <el-radio :label="2">全部</el-radio>
	        <el-radio :label="1">已评审</el-radio>
	        <el-radio :label="0">未评审</el-radio>
	      </el-radio-group>
    	</div>
      <div class="right">
        <el-input size="mini" v-model="searchParam.studentSearch" placeholder="输入学生名称或联系电话识别搜索" style="width: 250px;"></el-input>
        <el-input size="mini" v-model="searchParam.courseSearch" placeholder="输入课程名称识别搜索" style="width: 250px;"></el-input>
        <el-select v-model="searchParam.courseClassId" placeholder="课程类别" size="mini" style="width: 250px;">
          <el-option v-for="item in courseClass" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button type="info" size="mini" plain @click="handleSearch" >查找</el-button>
        <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh" style="margin: 0;"></el-button>
      </div>
    </div>

    <div class="list-wrap">
      <el-table
        :data="list"
        border
        style="width: 96%">
        <el-table-column prop="studentName" label="学生姓名"></el-table-column>
        <el-table-column prop="studentPhone" label="联系电话"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column prop="studentAge" label="年龄"></el-table-column>
        <el-table-column prop="courseName" label="课程名称"></el-table-column>
        <el-table-column prop="courseClassName" label="课程类别"></el-table-column>
        <el-table-column label="报表链接">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain @click="review(scope.row.id)">评审</el-button>
            <el-button type="danger" size="mini" @click="visit(scope.row.id)" plain>回访</el-button>
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
		created() {

		},
		data() {
      return {
      	courseClass: [],
      	searchParam: {
      	},
      	list: [{
      		name: "test"
      	}],
      	total: 0,
      	currentPage: 1
      }
    },
    methods: {
    	getCourseClass() {
        let me = this
        this.post('/admin/onlinecourse/class/all', {courseType: 'UPLOAD'}, (response) => this.courseClass = response.data)
      },
    	onPageChange(page) {
        this.currentPage = page
        this.getData()
      },
    	handleRefresh() {
        let me = this
        this.searchParam = {}
        this.currentPage = 1
        this.getData()
      },
      handleSearch() {
	      this.currentPage = 1
	      this.getData()
	    },
	    getData() {
	    	let me = this
	    },
	    visit(id) {
	    	let me = this
        this.$confirm('此操作将标记该评审已回访, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '回访成功!'
          })
        }).catch(() => {       
        })
	    },
	    review(id) {
	    	this.$router.push(`/review/view/${id}`)
	    }
    }
	}
</script>

<style scoped>
	.btn-wrap .right {
    margin-right: 4%;
  }

  .list-wrap, .btn-wrap {
    margin-bottom: 12px;
  }
</style>