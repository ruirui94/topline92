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
  </div>
</template>

<script>
export default {
  // name: 'article',
  watch: {
    // timetotime: function (newV, oldV) {
    // oldV 不用可以不用写
    timetotime: function (newV) {
      // console.log(newV + '-----------' + oldV)
      // 判断是否有值：
      if (newV) {
        this.search.begin_pubdate = newV[0]
        this.search.end_pubdate = newV[1]
      } else {
        // 清除时间信息
        this.search.begin_pubdate = ''
        this.search.end_pubdate = ''
      }
    }
  },
  data () {
    return {
      channelList: [], // 声明“频道”data成员
      timetotime: '', // 事件范围临时接收成员
      searchForm: {
        begin_pubdate: '',
        end_pubdate: '',
        // channel_id: '',
        status: 2 // 文章状态：需要参考接口文档
      }
    }
  },
  created () {
    this.getChannelList()
  },
  methods: {
    // 获得真实列表数据
    getChannelList () {
      let pro = this.$http({
        url: '/mp/v1_0/channels',
        method: 'get'
      })
      pro
        .then(result => {
          console.log(result)
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
</style>
