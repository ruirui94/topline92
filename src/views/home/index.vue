<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: #B3C0D1;
  }
  .el-aside {
    background-color: #D3DCE6;
  }
  .el-main {
    background-color: #E9EEF3;
  }
}
</style>
