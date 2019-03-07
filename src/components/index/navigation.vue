<template>
  <div class="navigation">
      <div class="navigation-title" v-if="pageData.widgets_data_show_title">{{ classifyTitle }}</div>
      <div v-if="layout == 1">
        <ul class="single-nav clearfix" ref="lefts" v-if="num<=5">
          <li v-for="(item, index) in classifyData" :key="index" @click="jumpUrl(item)">
            <img :src="item.pic_url" alt="" v-if="item.pic_url" />
            <img src="../../assets/images/index/food1.png" alt="" v-else />
            <p>{{ item.icon_name }}</p>
          </li>
        </ul>
        <scroller lock-y :scrollbar-x=false v-else>
          <ul class="single-nav" ref="lefts" :style="{width:totalWidth+'px'}">
            <li v-for="(item, index) in classifyData" :key="index" @click="jumpUrl(item)" :style="{width:liWidths+'px'}">
              <img :src="item.pic_url" alt="" v-if="item.pic_url" />
              <img src="../../assets/images/index/food1.png" alt="" v-else />
              <p>{{ item.icon_name }}</p>
            </li>
          </ul>
        </scroller>
      </div>
      <div class="pl5 pr5" v-else>
        <ul class="main-food">
          <li v-for="(item, index) in classifyData" :key="index" @click="jumpUrl(item)" :style="{width: (100/num)+'%'}">
            <img :src="item.pic_url" alt="" v-if="item.pic_url" />
            <img src="../../assets/images/index/food1.png" alt="" v-else />
            <p>{{ item.icon_name }}</p>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import { Scroller } from 'vux'

export default {
  props:['pageData'],
  components:{
    Scroller
  },
  data () {
    return {
      totalWidth:0,
    }
  },
  computed: {
    classifyTitle: function(){
      return this.pageData.widgets_data_title
    },
    classifyData: function(){
      return JSON.parse(this.pageData.widgets_data_params).navs
    },
    layout: function(){
      return JSON.parse(this.pageData.widgets_data_params).layout
    },
    num: function(){
      return JSON.parse(this.pageData.widgets_data_params).num
    },
    liWidths: function(){
      var bodyWidth = document.body.clientWidth;
      return bodyWidth/this.num
    }
  },
  methods: {
    jumpUrl (item) {
      var pageType = item.linktype,
          id = item.linktarget;
      this.$emit('jumpUrl',{pageType,id})
    }
  },

  created () {
    
  }
}
</script>
<style lang="less" scoped>
ul.single-nav{
  padding: 0 2px;
  box-sizing: border-box;
  background: #ffffff;
  li{
    float: left;
    margin-top: 26px;
    box-sizing: border-box;
    width: 20%;
    background: #ffffff;
    img{
      width: 100px;
      height: 100px;
      display: block;
      margin: 0 auto;
    }
    p{
      margin-top: 14px;
      text-align: center;
    }
  }
}
  .navigation-title{
    color: #007440;
    font-size: 24px;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
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
  ul.main-food{
    display: flex;
    flex-wrap: wrap;
    padding: 0 2px;
    box-sizing: border-box;
    background: #ffffff;
    li{     
      margin-top: 26px;
      box-sizing: border-box;
      width: 20%;
      img{
        width: 100px;
        height: 100px;
        display: block;
        margin: 0 auto;
      }
      p{
        margin-top: 14px;
        text-align: center;
      }
    }
  }
</style>




