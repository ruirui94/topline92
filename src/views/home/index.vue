<template>
  <el-container>
    <el-aside width="isCollapse?'65px':'200px'">
      <!-- default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router ：开启路由模式 true-->
      <el-menu
        background-color="#353B4E"
        text-color="#ccc"
        active-text-color="#3C9DFF"
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
      >
        <el-menu-item index="/welcome" :style="{width:isCollapse?'65px':'200px'}">
          <!-- disabled 未激活的导航菜单 -->
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2" :style="{width:isCollapse?'65px':'200px'}">
          <!-- el-submenu : 拥有子级的项目菜单 -->
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="2-1">发布文章</el-menu-item>
          <el-menu-item index="/article">内容列表</el-menu-item>
          <el-menu-item index="2-3">评论列表</el-menu-item>
          <el-menu-item index="2-4">素材管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" :style="{width:isCollapse?'65px':'200px'}">
          <i class="el-icon-document"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="4" :style="{width:isCollapse?'65px':'200px'}">
          <!-- el-menu-item ：（顶级）叶子菜单，没有子级的菜单 -->
          <!-- index 属性： 用于区分导航项的 -->
          <i class="el-icon-setting"></i>
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div id="lt">
          <i
            :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
            style="cursor:pointer;"
            @click="isCollapse=!isCollapse"
          ></i>
          <span>江苏传智播客教育科技股份有限公司</span>
        </div>

        <div id="rt">
          <el-input type="text" placeholder="请输入搜索的文章内容" style="width:300px;">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <span style="margin:0 10px;">消息</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="photo" alt style="border-radius:50%;width:40px;height:40px;" />
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>github地址</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
              <!-- 为啥加native ：使得组件的事件直接作用到HTML标签上（给组件添加事件） -->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <!-- 子组件显示占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false // false:展开   true:折叠
    }
  },
  methods: {
    // 退出系统
    logout () {
      this.$confirm('确定要提出系统?', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.clear()
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  },
  computed: {
    // 获得账户名称：
    name () {
      return JSON.parse(window.sessionStorage.getItem('userinfo')).name
    },
    // 获得账户头像：
    photo () {
      return JSON.parse(window.sessionStorage.getItem('userinfo')).photo
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-main {
    background-color: rgba(204, 204, 204, 0.39);
  }
  .el-aside {
    background-color: rgb(50, 55, 69);
  }
  .el-header {
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 9px;
    min-width: 950px;
    #lt {
      height: 100%;
      width: 40%;
      background-color: white;
      font-size: 20px;
      display: flex;
      align-items: center;
    }
    #rt {
      height: 100%;
      width: 50%;
      background-color: white;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-dropdown-link {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
