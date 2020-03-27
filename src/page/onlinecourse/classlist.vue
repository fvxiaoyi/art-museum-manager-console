<template>
	<div id="onlinecourse-classlist">
		<v-title-bar>课程分类信息</v-title-bar>

    <div class="btn-wrap clear">
      <el-button class="left" type="primary" plain size="mini" @click="showAddDialog">添加</el-button>
      <div class="right">
        <el-select v-model="searchParam.courseType" placeholder="课程分类" size="mini" style="width:160px;">
          <el-option v-for="item in courseTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-input size="mini" v-model="searchParam.name" placeholder="输入课程类别识别搜索" style="width: 250px;"></el-input>
        <el-button type="info" size="mini" plain @click="handleSearch" >查找</el-button>
        <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh" style="margin: 0;"></el-button>
      </div>
    </div>

    <div class="list-wrap">
      <el-table
        :data="list"
        border
        style="width: 96%">
        <el-table-column prop="name" label="课程类别"></el-table-column>
        <el-table-column label="课程分类">
        	<template slot-scope="scope">
            <span>{{ formatCourseType(scope.row.courseType) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ formatFullCreateTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain @click="edit(scope.row)">编辑</el-button>
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

    <el-dialog title="添加" :visible.sync="addDialogVisible" width="30%">
      <el-select v-model="model.courseType" placeholder="课程分类" size="mini" style="width:300px; margin-bottom: 10px;">
        <el-option v-for="item in courseTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input v-model="model.name" placeholder="课程分类名称" size="mini" style="width:300px;" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="editDialogVisible" width="30%">
      <el-select disabled v-model="editModel.courseType" placeholder="课程分类" size="mini" style="width:300px; margin-bottom: 10px;">
        <el-option v-for="item in courseTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input  size="mini" v-model="editModel.name" placeholder="课程分类名称" style="width:300px;" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>

	</div>
</template>

<script>
	export default {
	  created() {
	    let me = this
	    this.getData()
	  },
		data() {
      return {
        addDialogVisible: false,
        editDialogVisible: false,
        model: {
        },
        editModel: {
          id: null,
          name: null
        },
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
    	getData() {
	      let me = this
	      me.getListData('/admin/onlinecourse/class/list', me.currentPage, me.searchParam, (data, total) => {
	        me.total = total
	        me.list = data
	        if(me.currentPage > 1 && me.list.length == 0) {
	          me.currentPage --
	          me.getData()
	        }
	      }, (param) => {
	        if(param.name) {
	          param.name = `%${param.name}%`
	        }
	      })
	    },
    	handleSearch() {
	      this.currentPage = 1
	      this.getData()
	    },
      formatCourseType(type) {
        if(type === 'FREE') {
          return '免费课程'
        } else if(type === 'UPLOAD') {
          return '打卡课程'
        } else {
          return '付费课程'
        }
      },
      showAddDialog() {
        this.addDialogVisible = true
      },
      handleAdd() {
        let me = this
        this.post('/admin/onlinecourse/class/add', me.model, (response) => {
          me.$message({
            message: '添加成功',
            type: 'success'
          })
          me.addDialogVisible = false
          me.model = {}
          me.handleSearch()
        })
      },
      edit(row) {
        Object.assign(this.editModel, row)
        this.editDialogVisible = true
      },
      handleEdit() {
        let me = this
        this.post('/admin/onlinecourse/class/maintain', me.editModel, (response) => {
          me.$message({
            message: '添加成功',
            type: 'success'
          })
          me.editDialogVisible = false
          me.handleSearch()
        })
      },
      remove(id) {
        this.$confirm('此操作将删除该课程分类信息,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let me = this
          this.post('/admin/onlinecourse/class/remove', {id}, (response) => {
            me.$message({
              message: '删除成功',
              type: 'success'
            })
            me.handleSearch()
          })
        }).catch(() => {       
        })
      }
    }
	}
</script>

<style scoped>
  .list-wrap, .btn-wrap {
    margin-bottom: 12px;
  }
</style>