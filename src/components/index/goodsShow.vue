<template>
  <div class="food-list">
    <div class="hot-cake">
      <p class="nav" v-if="pageData.widgets_data_show_title"><span class="title">{{ recommendMainTitle }}<span>{{ recommendViceTitle }}</span></span></p>

      <div class="recommond-box" v-if="layout == 'horizontal'">
        <scroller lock-y :scrollbar-x=false>
          <ul class="recommend-food" ref="lefts" :style="{width:totalWidth+'px'}">
            <li v-for="(item,index) in goodsList" :key="index"  @click="jumpUrl(item)">
              <img :src="item.image_default_id" alt=""/>
              <p class="goods-name txt-ellipsis">{{ item.title }}</p>
              <p class="price money-icon"><span class="money-nub">{{ item.price }}</span><span class="add-icon" @click="addGoods(item.default_item_num_id)"></span></p>
            </li>
          </ul>
        </scroller>
      </div>

      <div class="list" v-else-if="layout == 'vertical'">
        <ul class="classify-recommend clearfix">
          <li v-for="(item, index) in goodsList" :key="index" @click="jumpUrl(item)">
            <img :src="item.image_default_id" alt=""/>
            <p class="goods-name txt-ellipsis">{{ item.title }}</p>
            <p class="price money-icon"><span class="money-nub">{{ item.price }}</span><span class="add-icon" @click="addGoods(item.default_item_num_id)"></span></p>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
import api from '../../units/config'
import { Scroller } from 'vux'

export default {
  props:['pageData','shop_num_id'],
  components:{
    Scroller
  },
  data () {
    return {
      totalWidth:0,
      goodsList:[],
      postData:{}
    }
  },
  computed:{
    recommendMainTitle: function(){
      return this.pageData.widgets_data_title
    },
    recommendViceTitle: function(){
      return this.pageData.widgets_data_sub_title
    },
    layout: function(){
      return JSON.parse(this.pageData.widgets_data_params).layout
    },
    selectType: function(){
      return JSON.parse(this.pageData.widgets_data_params).select_type
    }
  },
  methods: {
    jumpUrl (item) {
      var pageType = 2,
          id = item.default_item_num_id;
      this.$emit('jumpUrl',{pageType,id})
    },
    //添加商品进购物车
    addGoods (itemId) {
      event.stopPropagation()
      this.$emit('addGood',itemId)
    },
    //获取商品列表
    fetchGoodsList (){
      let _this = this
      _this.httpAjax({
        method:api.index.getRecommendList,
        data:_this.postData
      }).then(function(data){
        _this.goodsList = data.lists
        if(_this.layout == 'horizontal'){
          _this.$nextTick(() => {
            let lilength = _this.$refs.lefts.getElementsByTagName('li').length
            let liwidth = _this.$refs.lefts.getElementsByTagName('li')[0].clientWidth
            _this.totalWidth = lilength * liwidth
          })
        }
      }).catch(function(error){})
    }

  },
  mounted (){
  },
  created () {
    let _this = this
    switch (_this.selectType)
    {
      //自选商品
      case 'goods':
        // _this.goodsList = _this.pageData.style
        _this.postData = { 
          "cat_id": JSON.parse(_this.pageData.widgets_data_params).cat_id,
          "shop_num_id": _this.shop_num_id, 
          "page_no": 1, 
          "page_size": _this.layout == 'horizontal' ? 10 : 6
        }
        _this.fetchGoodsList()
        break;
      //自选分类
      case 'cat':
        _this.postData = { 
          "cat_id": JSON.parse(_this.pageData.widgets_data_params).cat_id,
          "shop_num_id": _this.shop_num_id, 
          "page_no": 1, 
          "page_size": _this.layout == 'horizontal' ? 10 : 6 
        }
        _this.fetchGoodsList()
        break;
      //为你推荐
      case 'custom':
        _this.postData = { 
          "is_recommend": 1,
          "shop_num_id": _this.shop_num_id, 
          "page_no": 1, 
          "page_size": _this.layout == 'horizontal' ? 10 : 6 
        }
        _this.fetchGoodsList()
        break;
      //热销爆款
      case 'hot':
        _this.postData = { 
          "is_hot": 1, 
          "shop_num_id": _this.shop_num_id, 
          "page_no": 1, 
          "page_size": _this.layout == 'horizontal' ? 10 : 6 
        }
        _this.fetchGoodsList()
        break;
      //新款力荐
      case 'new':
        _this.postData = { 
          "is_new": 1,
          "shop_num_id": _this.shop_num_id, 
          "page_no": 1, 
          "page_size": _this.layout == 'horizontal' ? 10 : 6 
        }
        _this.fetchGoodsList()
        break;
      //推荐评价
      case 'great':
        _this.postData = { 
          "tenantNumId":6,
          "dataSign":1,
          "shop_num_id": _this.shop_num_id, 
          "page_no": 1, 
          "page_size": _this.layout == 'horizontal' ? 10 : 6 
        }
        _this.fetchGoodsList()
        break;
    }
  }
}
</script>
<style lang="less" scoped>
  .food-list{
    font-size: 24px;
    color: #666666;
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
    .hot-cake{
      padding-top: 24px;
      background: #ffffff;
      p.nav{
        height: 72px;
        line-height: 72px;
        font-size: 32px;
        color: #333333;
        padding: 0 28px;
        border-bottom: 2px solid #efefef;
        .title{
          display: inline-block;
          vertical-align: middle;
          margin-left: 12px;
          span{
            font-size: 24px;
            color: #9A9A9A;
            margin-left: 16px;
          }
        }
        &::before{
          content: '';
          display: inline-block;
          vertical-align: middle;
          height: 32px;
          border-left: 6px solid #00713B;
          position: relative;
          top: -3px;
        }
      }
      .recommond-box{
        width: 100%;
        height: 381px;
        background: #ffffff;
        padding: 20px 30px;
        box-sizing: border-box;
        overflow: hidden;
        ul.recommend-food{
          width: 1300px;
          li{
            width: 200px;
            float: left;
            padding-right: 34px;
            padding-bottom: 35px;
            &:last-child{
              padding-right: 0;
            }
            img{
              width: 200px;
              height: 200px;
            }
            p.goods-name{
              font-size: 24px;
              color: #333333;
              margin-top: 20px;
              margin-bottom: 30px;
            }
            p.price{
              font-size: 20px;
              color: #00713B;
              position: relative;
              height: 32px;
              .money-nub{
                font-size: 32px;
                margin-left: 4px;
                display: table-cell;
                vertical-align: bottom;
              }
              .add-icon{
                &:before{
                  content:'';
                  display: inline-block;
                  width: 36px;
                  height: 36px;
                  background: url(../../assets/icons/btnAdd.png) no-repeat;
                  background-size: 100% 100%;
                  position: absolute;
                  right: 0px;
                  top: -4px;
                }
              }
            }
          }
        }
      }

    }
      .list{
        ul.classify-recommend{
          padding: 0 15px;
          padding-top: 9px;
          background: #ffffff;
          li{
            float: left;
            width: 33.33%;
            padding: 8px 15px 41px 15px;
            box-sizing: border-box;
            border-bottom: 1px solid #efefef;
            border-right: 1px solid #efefef;
            &:nth-child(3){
              border-right: none;
            } 
            &:nth-child(6){
              border-right: none;
            } 
            img{
              width: 210px;
              height: 210px;
            }
            p.goods-name{
              font-size: 24px;
              color: #333333;
              margin-top: 20px;
              margin-bottom: 30px;
            }
            p.price{
              font-size: 20px;
              color: #00713B;
              position: relative;
              height: 32px;
              .money-nub{
                font-size: 32px;
                margin-left: 4px;
                display: table-cell;
                vertical-align: bottom;
              }
              .add-icon{
                &:before{
                  content:'';
                  display: inline-block;
                  width: 36px;
                  height: 36px;
                  background: url(../../assets/icons/btnAdd.png) no-repeat;
                  background-size: 100% 100%;
                  position: absolute;
                  right: 0;
                  top: -4px;
                }
              }
            }
          }
        }
      }

  }
</style>
