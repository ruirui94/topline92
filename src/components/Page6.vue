<template>
  <div>
    <h2>分页组件</h2>
    <com-up>
      <button slot="upButton" slot-scope="stData">{{stData.up}}</button>
    </com-up>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
    <com-down>
      <button slot="downButton" slot-scope="stData">{{stData.down}}</button>
    </com-down>
  </div>
</template>

<script>
import ComUp from './modules/Up'
import ComDown from './modules/Down'
export default {
  components: {
    ComUp,
    ComDown
  }
}
</script>

<style lang="less" scoped>
// ul {
//   display: inline-block;
//   li{
//     float: left;
//   }
// }
</style>
