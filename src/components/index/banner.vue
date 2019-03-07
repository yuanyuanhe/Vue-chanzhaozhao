<template>
  <div class="banner-nav">
    <mt-swipe class="banner-box" :auto="3000" :speed="300" :continuous="true">
      <mt-swipe-item v-for="(item,index) in bannerList" :key="index"><img @click="jumpUrl(item)" :src="item.pic_url"></mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props:['pageData'],
  data () {
    return {
    }
  },
  computed: {
    bannerList: function() {
      return JSON.parse(this.pageData.widgets_data_params).pictures
    }
  },
  methods: {
    jumpUrl (item) {
      var pageType = item.linktype,
          id = item.linktarget;
      this.$emit('jumpUrl',{pageType,id})
    }
  }
}
</script>
<style lang="less" scoped>
  .banner-nav{
    padding: 30px 30px 20px 30px;
    background: #f8f8f8;
    .banner-box{
      height: 320px;
    }
    .vux-slider{
      border-radius: 10px;
    }
    .navigation{
      color: #007440;
      font-size: 24px;
      text-align: center;
      margin-top: 40px;
      &:before{
        content: '';
        width: 94px;
        height: 6px;
        vertical-align: middle;
        display: inline-block;
        background: url(../../assets/images/index/line_green@2x.png) no-repeat;
        background-size: 100% 100%;
        transform: rotate(180deg);
        margin-right: 20px;
      }
      &:after{
        content: '';
        width: 94px;
        height: 6px;
        vertical-align: middle;
        display: inline-block;
        background: url(../../assets/images/index/line_green@2x.png) no-repeat;
        background-size: 100% 100%;
        margin-left: 20px;
      }
    }
  }
</style>



