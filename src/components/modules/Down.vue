<template>
  <div>
    <slot name="downButton" down="下一页" @click="prev()"></slot>
  </div>
</template>

<script>
export default {
  // methods:{
  //   prev:function(){
  //     $router.back()
  //   }
  // }
}
</script>

<style lang="less" scoped>
</style>
