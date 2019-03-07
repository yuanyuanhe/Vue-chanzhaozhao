<template>
<div class="spell">
  <div class="goods-image" v-if="styletag == 1"><img :src="activityList.length>0 ? activityList[0].pic_url :''" alt="" @click="jumpUrl(activityList[0])"></div>

  <div class="activity clearfix" v-else-if="styletag == 2">
    <div class="fl time-limit">
      <img :src="activityList.length>0 ? activityList[0].pic_url :''" alt="" @click="jumpUrl(activityList[0])">
    </div>
    <div class="fr time-limit">
      <img :src="activityList.length>0 ? activityList[1].pic_url :''" alt="" @click="jumpUrl(activityList[1])">
    </div>
  </div>

  <div class="activity clearfix" v-else-if="styletag == 3">
    <div class="fl time-limit">
      <img :src="activityList.length>0 ? activityList[0].pic_url :''" alt="" @click="jumpUrl(activityList[0])">
    </div>
    <div class="fr other-activity">
      <div class="life">
        <img :src="activityList.length>0 ? activityList[1].pic_url :''" alt="" @click="jumpUrl(activityList[1])">
      </div>
      <div class="reduce">
        <img :src="activityList.length>0 ? activityList[2].pic_url :''" alt="" @click="jumpUrl(activityList[2])">
      </div>
    </div>
  </div>

  <div class="activity clearfix" v-else-if="styletag == 4">
    <div class="fl other-activity">
      <div class="life">
        <img :src="activityList.length>0 ? activityList[0].pic_url :''" alt="" @click="jumpUrl(activityList[0])">
      </div>
      <div class="reduce">
        <img :src="activityList.length>0 ? activityList[1].pic_url :''" alt="" @click="jumpUrl(activityList[1])">
      </div>
    </div>
    <div class="fr other-activity">
      <div class="life">
        <img :src="activityList.length>0 ? activityList[2].pic_url :''" alt="" @click="jumpUrl(activityList[2])">
      </div>
      <div class="reduce">
        <img :src="activityList.length>0 ? activityList[3].pic_url :''" alt="" @click="jumpUrl(activityList[3])">
      </div>
    </div>
  </div>


</div>
</template>
<script>
export default {
  props: ['pageData'],
  data () {
    return {
    }
  },
  computed: {
    activityList: function(){
      return JSON.parse(this.pageData.widgets_data_params).pictures
    },
    styletag: function(){
      return JSON.parse(this.pageData.widgets_data_params).styletag
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
  .activity{
    background: #f8f8f8;
    padding: 20px 0 10px 0;
    .time-limit{
      width: 372px;
      height: 330px;
      background: #ffffff;
      position: relative;
      box-sizing: border-box;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .other-activity{
      .life{
        width: 368px;
        height: 160px;
        background: #ffffff;
        position: relative;
        box-sizing: border-box;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .reduce{
        width: 368px;
        height: 160px;
        background: #ffffff;
        margin-top: 10px;
        position: relative;
        box-sizing: border-box;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .goods-image{
    margin: 20px 19px 0 19px;
    width: 710px;
    height: 252px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>


