<template>
	<div id="onlinecourse-uploadlist">
		<v-title-bar>打卡课程列表</v-title-bar>

    <div class="btn-wrap clear">
      <el-button class="left" type="primary" plain size="mini" @click="add">添加</el-button>
      <div class="right">
        <el-select v-model="searchParam.courseType" placeholder="课程分类" size="mini" style="width:160px;">
          <el-option v-for="item in courseTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-input size="mini" v-model="searchParam.name" placeholder="输入课程类别识别搜索" style="width: 250px;"></el-input>
        <el-date-picker size="mini" v-model="searchParam.expireDate" type="date" placeholder="选择限时活动截止时间"></el-date-picker>
        <el-button type="info" size="mini" plain @click="handleSearch" >查找</el-button>
        <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh" style="margin: 0;"></el-button>
      </div>
    </div>

    <div class="list-wrap">
      <el-table
        :data="list"
        border
        style="width: 96%">
        <el-table-column prop="name" label="课程名称"></el-table-column>
        <el-table-column prop="courseClassName" label="课程分类"></el-table-column>
        <el-table-column label="限时活动时间">
          <template slot-scope="scope">
            <span>{{ formatFullCreateTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ formatFullCreateTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="remove(scope.row.id)" plain>删除</el-button>
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
			let me = this
			// course class
	    this.getData()
		},
		data() {
      return {
      	courseClass: [],
      	courseTypes: [{
      		id: 'FREE',
      		name: '免费课程'
      	},{
      		id: 'UPLOAD',
      		name: '打卡课程'
      	},{
      		id: 'PAYMENT',
      		name: '付费课程'
      	}],
      	searchParam: {
      	},
      	list: [],
      	total: 0,
      	currentPage: 1
      }
    },
    methods: {
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
	    	let params = {}
	    	Object.assign(params, this.searchParam)
	    	if(params.expireDate) {
	    		params.expireDate = params.expireDate.getTime()
	    	}
	    	console.log(params)
	    },
	    add() {
	    	this.$router.push('/onlinecourse/add/UPLOAD')
	    },
      edit(id) {
        this.$router.push(`/onlinecourse/edit/UPLOAD/${id}`)
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