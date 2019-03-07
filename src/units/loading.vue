<template>
  <div class="loading" v-show="visible">
    <div class="img"><img src="./../assets/icons/loading.gif" alt=""></div>
  </div>
</template>
<style lang="less" scoped>
  .loading{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    background: #ffffff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    .img{
      width: 280px;
      height: 280px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -140px;
      margin-top: -140px;
    }
  }
</style>
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

