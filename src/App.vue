<template>
  <div id="app">
    <h2>App根组件</h2>
    <router-view />
    <com-page></com-page>
    <!-- <com-up></com-up>
    <com-down></com-down> -->
  </div>
</template>
<script>
// 1.导入：
import ComPage from './components/Page6.vue'
// import ComUp from './modules/Up.vue'
// import ComDown from './modules/Down.vue'
export default {
  components: {
    ComPage
    // ComUp,
    // ComDown
  }
}
</script>

<style lang="less" scoped>
</style>
