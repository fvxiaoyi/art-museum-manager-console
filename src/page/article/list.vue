<template>
  <div id="article-list">
    <div class="tbar clear">
      <div class="title">作品列表</div>
      <div class="btn-wrap">
        <el-tooltip content="刷新" placement="left" >
          <el-button type="info" icon="el-icon-refresh" plain size="mini" @click="handleRefresh"></el-button>
        </el-tooltip>
        <el-button type="primary" size="mini" @click="handleAdd" >添加</el-button>
      </div>
    </div>
    <div class="search-bar">
      <div class="searchCourse">
        <el-select v-model="searchParam.courseId" @change="onCourseChange" placeholder="请选择作品类型" size="small" style="width:150px;">
          <el-option
            v-for="item in courses"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="searchSubject">
        <el-select v-model="searchParam.subjectId" placeholder="请选择作品专题" size="small" style="width:150px;">
          <el-option
            v-for="item in subjects"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="searchLocal">
        <el-select v-model="searchParam.localId" placeholder="请选择校区" size="small" style="width:160px;">
          <el-option
            v-for="item in locals"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-input placeholder="输入作品、学员名称识别搜索" v-model="searchParam.name" size="small" style="width:300px;margin-left:12px;">
        <el-tooltip slot="append" content="搜索" placement="right" >
          <el-button icon="el-icon-search" @click="getData(1)"></el-button>
        </el-tooltip>
      </el-input>
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
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="comment(scope.row.id)" type="text" size="small">留言管理</el-button>
            <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row.id)">删除</el-button>
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
              <div>{{item.name}}</div>
              <div class="time">{{formatFullCreateTime(item.createTime)}}</div>
            </div>
            <div class="content">习近平指出，中玻建交33年来，两国关系持续稳定发展，当前处于历史最好时期。中方赞赏玻方坚定奉行一个中国政策，积极响应“一带一路”倡议，大力推动深化中拉关系。我们愿同玻方一道，以两国建立战略伙伴关系为重要契机，不断深化各领域交流和合作，推动两国关系迈上新台阶、开辟新前景。</div>
            <div class="btn-wrap">
              <el-button type="text" size="small" @click="removeComment(item.id, index)">删除</el-button>
            </div>
          </div>
          <div class="subCommnet" v-if="item.subComments.length>0" v-for="sub in item.subComments">
            <div class="publisher">
              <div>{{sub.name}}</div>
              <div class="time">{{formatFullCreateTime(sub.createTime)}}</div>
            </div>
            <div class="content">{{sub.content}}</div>
            <div class="btn-wrap">
              <el-button type="text" size="small" >删除</el-button>
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
    this.loadCourseData((data) => me.courses = data)
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
      let me = this,
        limit = this.$pageSize,
        start
      if(page === 1) {
        start = 0
      } else {
        start = this.$pageSize * (page - 1)
      }
      let params = { start, limit },
        _params = me.searchParam
      if(_params) {
        for(let x in _params) {
          if(!_params[x]) {
            delete _params[x]
          }
        }
        Object.assign(params, _params)
        if(params.name) {
          params.name = `%${params.name}%`
        }
      }
      this.post('admin/art/list', params, (response) => {
        me.list = response.data
        me.total = response.total
      })
    },
    edit(id) {
      this.$router.push(`/article/view/${id}`)
    },
    remove(id) {

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
    removeComment(id, index) {
      let me = this
      this.post('admin/comment/remove', { id }, (response) => {
        me.comments.splice(index, 1)
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
  
  #article-list .tbar {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #DDDDDD;
    margin-bottom: 12px;
  }

  #article-list .tbar .title {
    float: left;
    font-size: 18px;
  }

  #article-list .tbar .btn-wrap {
    float: right;
  }

  #article-list .search-bar {
    margin: 12px 0;
  }

  #article-list .searchCourse {
    display: inline-block;
  }

  #article-list .searchLocal {
    margin-left: 12px;
    display: inline-block;
  }

  #article-list .searchSubject {
    margin-left: 12px;
    display: inline-block;
  }

  #article-list .list-wrap {
    margin-bottom: 12px;
  }

  .comment-wrap {
    border-bottom: 1px solid #DCDFE6;
  }

  .comment, .subCommnet {
    min-height: 60px;
    max-height: 180px;
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .comment-wrap .publisher {
    width: 120px;
  }

  .comment-wrap .publisher .time {
    font-size: 8px;
  }

  .comment-wrap .content {
    flex: 1;
  }

  .comment-wrap .btn-wrap {
    width: 100px;
    text-align: center;
  }

  .subCommnet {
    padding-left: 60px;
    border-top: 1px dashed #DCDFE6;
  }
</style>
