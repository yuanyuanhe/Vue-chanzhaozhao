<template>
    <img class="img show1" v-show="show" :src="img" />
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        show: false
      }
    },
    methods:{
      close:function(){

      }
    }
  }
</script>

<style scoped>
  .img {
    height: 100px;
    width: 100px;
    position: fixed;
    left: calc(50% - 25px);
    top: 200px;
    z-index: 9999;
    border-radius: 100px;
    box-shadow: 0 0 4px 4px rgba(250,180,10,0.3);
  }

  .show1 {
    animation: popshow1 1000ms;
    animation-fill-mode: forwards;
  }

  @keyframes popshow1 {
    0% {
      left: calc(50% - 25px);
      top: 200px;
    }
    25% {
      transform: scale(2,2);
    }
    50% {
      transform: scale(1,1);
      left: calc(50% - 25px);
      top: 200px;
      opacity: 1;
    }
    100% {
      left: 0;
      top: calc(100% - 100px);
      opacity: 0.7;
    }
  }
</style>
