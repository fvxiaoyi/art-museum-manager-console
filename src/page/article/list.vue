<template>
  <div id="article-list">
    <v-title-bar>作品列表</v-title-bar>
    <div class="btn-wrap clear">
      <el-button class="left" type="primary" plain size="mini" @click="handleAdd">添加</el-button>
      <div class="right">
        <el-select v-model="searchParam.courseId" @change="onCourseChange" placeholder="请选择作品类型" size="mini" style="width:160px;">
          <el-option v-for="item in courses" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="searchParam.subjectId" placeholder="请选择作品专题" size="mini" style="width:160px;">
          <el-option v-for="item in subjects" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="searchParam.localId" placeholder="请选择校区" size="mini" style="width:160px;">
          <el-option v-for="item in locals" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-input size="mini" v-model="searchParam.name" placeholder="输入作品、学员名称识别搜索" style="width: 250px;"></el-input>
        <el-button type="info" size="mini" plain @click="getData(1)" >查找</el-button>
        <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh" style="margin: 0;"></el-button>
      </div>
    </div>

    <div class="list-wrap">
      <el-table
        :data="list"
        border
        style="width: 96%">
        <el-table-column prop="name" label="作品名称"></el-table-column>
        <el-table-column prop="studentName" label="学员名称"></el-table-column>
        <el-table-column prop="courseName" label="作品类型"></el-table-column>
        <el-table-column prop="subjectName" label="发布专题"></el-table-column>
        <el-table-column prop="studentLocalName" label="校区"></el-table-column>
        <el-table-column prop="monthStar" label="当月赞"></el-table-column>
        <el-table-column prop="totalStar" label="总赞数"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="info" size="mini" plain @click="comment(scope.row.id)">留言管理</el-button>
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

    <el-dialog title="作品留言" :visible.sync="commentDialogVisible">
      <div>
        <div class="comment-wrap" v-for="(item, index) in comments">
          <div class="comment">
            <div class="publisher">
              <span>{{item.name}}</span>
              <span>{{formatFullCreateTime(item.createTime)}}</span>
            </div>
            <div class="content">
              <span>{{item.content}}</span>
              <div>
                <el-button type="danger" size="mini" @click="removeComment(item.id, item.articleId)" plain>删除</el-button>
              </div>
            </div>
          </div>
          <div class="subCommnet" v-if="item.subComments.length>0" v-for="sub in item.subComments">
            <div class="publisher">
              <span>{{sub.name}}</span>
              <span>{{formatFullCreateTime(sub.createTime)}}</span>
            </div>
            <div class="content">
              <span>{{sub.content}}</span>
              <div>
                <el-button type="danger" size="mini" @click="removeComment(sub.id, item.articleId)" plain>删除</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  created() {
    let me = this
    this.post('admin/course/list', {}, (response) => me.courses = response.data)
    this.post('admin/local/all', {}, (response) => me.locals = response.data)
    this.post('admin/subject/all', {}, (response) => me.subjects = response.data)
    this.getData(1)
  },
  data () {
    return {
      commentDialogVisible: false,
      searchParam: {
      },
      courses: [],
      subjects: [],
      locals: [],
      list: [],
      comments: [],
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    getData(page) {
      let me = this
      me.getListData('admin/art/list', page, me.searchParam, (data, total) => {
        me.total = total
        me.list = data
      }, (param) => {
        if(param.name) {
          param.name = `%${param.name}%`
        }
      })
    },
    edit(id) {
      this.$router.push(`/article/view/${id}`)
    },
    remove(id) {
      let me = this
      this.$confirm('此操作将永久删除该作品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.post('admin/art/remove', {id}, (response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          me.getData(me.currentPage)
        })
      }).catch(() => {       
      })
    },
    onPageChange(page) {
      this.currentPage = page
      this.getData(page)
    },
    handleRefresh() {
      let me = this
      this.searchParam = {}
      this.post('admin/subject/all', {}, (response) => me.subjects = response.data)
      this.getData(1)
    },
    handleAdd() {
      this.$router.push('/article/view')
    },
    onCourseChange(newValue) {
      let me = this
      if(newValue) {
        me.subject = null
        me.student = null
        this.post('admin/subject/all', {courseId: newValue}, (response) => me.subjects = response.data)
      }
    },
    comment(articleId) {
      let me = this
      this.post('admin/comment/list', { articleId }, (response) => {
        me.comments = response.data
        me.commentDialogVisible = true
      })
    },
    removeComment(id, articleId) {
      let me = this
      this.post('admin/comment/remove', { id }, (response) => {
        me.comment(articleId)
      })
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
  
  .btn-wrap .right {
    margin-right: 4%;
  }

  .list-wrap, .btn-wrap {
    margin-bottom: 12px;
  }

  .comment-wrap {
    border-bottom: 1px solid #DCDFE6;
  }

  .comment, .subCommnet {
    min-height: 60px;
    max-height: 180px;
    padding-bottom: 10px;
  }

  .comment {
    font-size: 14px;
  }

  .comment-wrap .publisher {
    height: 30px;
    line-height: 30px;
  }

  .comment-wrap .content{
    display: flex;
  }

  .comment-wrap .content span{
    flex: 1;
  }
 
  .subCommnet {
    font-size: 12px;
    padding-left: 20px;
    border-top: 1px dashed #DCDFE6;
  }
</style>
