<template>
	<div class="review-view">
		<v-title-bar>评审信息</v-title-bar>
		
		<el-form label-width="150px" :inline="true" size="small">
      <el-form-item label="学生姓名：">张三</el-form-item>
      <el-form-item label="性别：">男</el-form-item>
      <el-form-item label="年龄：">18</el-form-item>
      <el-form-item label="联系电话：">13515969683</el-form-item>
    </el-form>
    <el-form label-width="150px" :inline="true" size="small">
      <el-form-item label="课程名称：">21天绘画</el-form-item>
      <el-form-item label="课程分类：">综合艺术</el-form-item>
    </el-form>
    <div class="title">学生作品：</div>
    <div style="width: 500px; margin-left: 68px; margin-bottom: 20px;">
	    <el-carousel trigger="click" :autoplay="false" height="250px">
	      <el-carousel-item v-for="url in urls" :key="url">
	        <h3 class="small">
	        	<img @click="detail(url)" :src="url">
	        </h3>
	      </el-carousel-item>
	    </el-carousel>
    </div>
    <div class="title">作品评分（分值为1~5分）</div>
    <el-form label-width="150px" :inline="true" size="small">
      <el-form-item label="线条运用：">
      	<el-input-number v-model="model.line" :min="1" :max="5" :precision="0" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="形象表现：">
      	<el-input-number v-model="model.image" :min="1" :max="5" :precision="0" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="色彩表达：">
      	<el-input-number v-model="model.color" :min="1" :max="5" :precision="0" :step="1"></el-input-number>
      </el-form-item>
    </el-form>
    <el-form label-width="150px" :inline="true" size="small">
      <el-form-item label="空间表现：">
      	<el-input-number v-model="model.space" :min="1" :max="5" :precision="0" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="画面组织：">
      	<el-input-number v-model="model.picture" :min="1" :max="5" :precision="0" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="创意思维：">
      	<el-input-number v-model="model.creative" :min="1" :max="5" :precision="0" :step="1"></el-input-number>
      </el-form-item>
    </el-form>
    <el-form label-width="150px" size="small">
      <el-form-item label="综合评定：">
      	 <el-input :rows="10" type="textarea" v-model="model.remark" style="width: 500px;"></el-input>
      </el-form-item>
      <el-form-item label="升级课程建议：">
      	<el-input :rows="10" type="textarea" v-model="model.suggest" style="width: 500px;"></el-input>
      </el-form-item>
      <el-form-item>
      	<el-button type="primary" @click="back">返回</el-button>
      	<el-button type="success" @click="submit">保存提交</el-button>
      	<el-button type="success" @click="reportLink">生成报告</el-button>
      </el-form-item>
    </el-form>
			
	</div>
</template>

<script>
	export default {
		created() {

		},
		data() {
      return {
      	model: {
      		line: 1,
      		image: 1,
      		color: 1,
      		space: 1,
      		picture: 1,
      		creative: 1
      	},
      	urls: [
      		"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585912416652&di=777856535ec4e430584a5dfddf79b008&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg",
      		"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585912416651&di=b28b53e0a7cb96b223c669cea12d4684&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F78%2F52%2F01200000123847134434529793168.jpg",
      		"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585912416651&di=6c1b963f66f0a87d32b403869b19032d&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F21%2F09%2F01200000026352136359091694357.jpg",
      		"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585912416651&di=a0e1fb110f54b3d3328fa9004ade0366&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201607%2F31%2F20160731101714_NsALZ.thumb.700_0.jpeg"
      	]
      }
    },
    methods: {
    	detail(url) {
    		console.log(url)
    	},
    	reportLink() {

    	},
    	back() {
    		this.$router.push('/review/list')
    	},
    	submit(){

    	}
    }
	}
</script>

<style scoped>
	.title {
		margin-left: 68px; 
		font-size: 14px;
		margin-bottom: 10px;
		font-weight: bold;
	}
</style>