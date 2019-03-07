<template>
  <div class="toast" v-if="visiable">
    <div class="bg"><div class="content">{{ message }}</div></div>
    
  </div>
</template>
<script>
export default {
  data () {
    return {
      visiable: true,
      message:''
    }
  }
}
</script>
<style lang="less" scoped>
.toast{
  .bg{
    width: 100%;
    height: 100%;
    background:rgba(255,255,255,0);
    position:fixed;
    top: 0;
    left: 0;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    .content{
      max-width: 150px;
      text-align: center;
      font-size: 24px;
      line-height: 36px;
      border-radius: 10px;
      padding: 50px 50px;
      color: #ffffff;
      background: rgba(0,0,0,0.7);
    }
  }

}
</style>


