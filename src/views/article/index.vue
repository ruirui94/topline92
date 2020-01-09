<template>
  <div>
    <!-- 文章页面（也是home的子路由） -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!-- 绘制form表单相关： -->
      <el-form ref="searchFormRef" :model="searchForm" label-width="100px">
        <el-form-item label="文章列表:">
          <!-- 添加项目  本质是：单选框 -->
          <el-radio v-model="searchForm.status" label>全部</el-radio>
          <el-radio v-model="searchForm.status" :label="0">草稿</el-radio>
          <el-radio v-model="searchForm.status" :label="1">待审核</el-radio>
          <el-radio v-model="searchForm.status" :label="2">审核通过</el-radio>
          <el-radio v-model="searchForm.status" :label="3">审核失败</el-radio>
        </el-form-item>
        <el-form-item label="频道列表:">
          <el-select v-model="searchForm.channel_id" clearable placeholder="请选择">
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择:">
          <el-date-picker
            v-model="timetotime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- --------------文章列表-------------- -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{tot}}条符合条件的内容</span>
      </div>
      <el-table :data="articleList" style="width: 100%">
        <!-- 图标 -->
        <el-table-column prop="cover.images[0]" label="图标">
          <!-- 在prop里面（列组件）使用cover合理，但是在src里面不能直接使用 -->
          <!-- 采用作用域插槽 关键字（名称）row -->
          <img
            slot-scope="stData"
            :src="stData.row.cover.images[0]"
            alt="没有图标"
            width="150"
            height="100"
          />
        </el-table-column>
        <!-- ------------------------------------- -->
        <el-table-column prop="title" label="标题" width="300"></el-table-column>
        <el-table-column prop="status" label="文章状态" width="120">
          <!-- 获得文章的状态数据：作用域插槽，与获取图标的原理一致 -->
          <!-- --------- tag ------------ -->
          <template slot-scope="stData">
            <el-tag size="medium" v-if="stData.row.status===0">草稿</el-tag>
            <el-tag size="medium" v-else-if="stData.row.status===1" type="success">待审核</el-tag>
            <el-tag size="medium" v-else-if="stData.row.status===2" type="info">审核通过</el-tag>
            <el-tag size="medium" v-else-if="stData.row.status===3" type="warning">审核失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <!-- 修改删除 不属于数据部分 知识普通按钮 -->
        <el-table-column label="操作">
          <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- ---------------- 分页效果 ----------------- -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="searchForm.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tot"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  // name: 'article',
  watch: {
    // 监听searchForm的变化：
    searchForm: {
      handler: function (newV) {
        // console.log(newV)
        // 根据变化后的筛选条件重新获得文章列表
        this.getArticleList()
        // 可以去掉下方的handleSizeChange() handleCurrentChange() 方法
      },
      deep: true
    },

    // timetotime: function (newV, oldV) {
    // oldV 不用可以不用写
    timetotime: function (newV) {
      // console.log(newV + '-----------' + oldV)
      // 判断是否有值：
      if (newV) {
        this.searchForm.begin_pubdate = newV[0]
        this.searchForm.end_pubdate = newV[1]
      } else {
        // 清除时间信息
        this.searchForm.begin_pubdate = ''
        this.searchForm.end_pubdate = ''
      }
    }
  },
  data () {
    return {
      tot: 0,
      articleList: [],
      channelList: [], // 声明“频道”data成员
      timetotime: '', // 事件范围临时接收成员
      searchForm: {
        page: 1, // 当前数据记录页面
        per_page: 10, // 当前页码数据条数
        begin_pubdate: '',
        end_pubdate: '',
        channel_id: '', // 频道列表
        status: '' // 文章状态：需要参考接口文档
      }
    }
  },
  created () {
    this.getArticleList()
    this.getChannelList()
  },
  methods: {
    // handleSizeChange() {},
    // 页码变化的回调处理：
    handleCurrentChange (val) {
      // val 代表变化后的页码
      // 更新（接收）变化后的页码：
      this.searchForm.page = val
      // 更新数据（重新获得文章列表）：
      this.getArticleList()
      // 更新
    },
    getArticleList () {
      // 把searchForm内部为空的成员都过滤掉
      let searchData = {}
      for (var i in this.searchForm) {
        // i:代表对象的成员属性名称, status、channel_id、begin_pudate等等
        if (this.searchForm[i] || this.searchForm[i] === 0) {
          // 成员值非空
          searchData[i] = this.searchForm[i]
        }
      }
      let pro = this.$http({
        url: '/mp/v1_0/articles',
        method: 'get',
        params: searchData // 传递参数
      })
      pro
        .then(result => {
          // console.log(result)
          // 获得文章列表
          this.articleList = result.data.data.results
          // 获得文章总条数
          this.tot = result.data.data.total_count
        })
        .catch(err => {
          return this.$message.error('获得频道失败' + err)
        })
    },
    // 获得真实列表数据
    getChannelList () {
      let pro = this.$http({
        url: '/mp/v1_0/channels',
        method: 'get'
      })
      pro
        .then(result => {
          // console.log(result)
          // 获得频道列表
          this.channelList = result.data.data.channels
        })
        .catch(err => {
          return this.$message.error('获得频道失败' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
// 给卡片去设置样式：
.box-card {
  // 设置下外边距，让两个卡片区之间有间隔
  margin-bottom: 20px;
}
.el-pagination {
  margin-bottom: 20px;
}
</style>
