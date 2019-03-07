<template>
  <div class="index">
    <div class="menu-property" :class="isShowShopList ? 'z100': ''">
      <span class="location-address fl" @click="toNearByStore">{{ locationAddress }}</span>
      <span class="logo" @click="isShowShopList ? isShowShopList=false : isShowShopList=true"></span>
      <span class="scan-code fr"></span>
      <span class="search fr" @click="searchGoods"></span>
      <div class="final-address hidden" v-if="!isShowShopList">配送至：常州科教城</div>
    </div>
    <div class="hidden-box"></div>
    <div class="noSend hidden">
      <span class="address1 fl">无法配送至当前地址</span><span class="address2 fr">修改配送地址</span>
    </div>
    <div v-for="(item, index) in indexData" :key="index">
      <Banner :pageData="item" v-if="item && item.widgets_sign == 1" @jumpUrl="jumpUrl"></Banner>
      <Navigation :pageData="item" v-if="item && item.widgets_sign == 2" @jumpUrl="jumpUrl"></Navigation>
      <SpellImage :pageData="item" v-if="item && item.widgets_sign == 3" @jumpUrl="jumpUrl"></SpellImage>
      <GoodsShow :pageData="item" :shop_num_id="shop_num_id" v-if="item && item.widgets_sign == 4" @addGood="addGoods" @jumpUrl="jumpUrl"></GoodsShow>
    </div>
    <!-- 非常用地址 -->
    <div class="other-address hidden">
      <div class="bg"></div>
      <div class="address-list">
        <p class="address-title tc">温馨提示<span class="closebtn"></span></p>
        <p class="location-notice tc">当前定位不是您常用的位置<br/>请选择</p>
        <div class="list">
          <ul>
            <li class="present">浦江大厦</li>
            <li>花样年华别院(兆丰路站)</li>
          </ul>
        </div>
        <div class="change-address">修改配送地址</div>
      </div>
    </div>
    <!-- 选择门店 -->
    <div class="shop-list" v-if="isShowShopList">
      <div class="bg" @click="isShowShopList = false "></div>
      <div class="list-content">
        <div class="shop-nub">2个商家可为你配送</div>
        <ul>
          <li class="selected">
            <img class="shop-img" src="./../assets/images/index/logo.png" alt=""/>
            <div class="shop-detail">
              <p>龙湖汇百汇店</p>
              <p>距离您810米，支持60分钟到达</p>
            </div>
          </li>
          <li>
            <img class="shop-img" src="./../assets/images/index/logo.png" alt=""/>
            <div class="shop-detail">
              <p>龙湖汇百汇店</p>
              <p>距离您810米，支持60分钟到达</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 广告 -->
    <div class="advertiseMent" v-if="isShowAdvertise">
      <div class="bg"></div>
      <div class="adviertiseImg"><img src="./../assets/images/cat.jpg" /><div class="close-btn" @click="isShowAdvertise = false"></div></div>
    </div>
  </div>

</template>
<script>

  import api from './../units/config'
  import qs from 'qs'
  import { Scroller } from 'vux'
  import Banner from '@/components/index/banner.vue'
  import Navigation from '@/components/index/navigation.vue'
  import SpellImage from '@/components/index/spellImage.vue'
  import GoodsShow from '@/components/index/goodsShow.vue'

  export default {
    name: 'index',
    components:{
      Scroller,
      Navigation,
      SpellImage,
      Banner,
      GoodsShow
    },
    data () {
      return {
        locationX:"",  
        locationY:"",  
        shop_id: 202,
        locationAddress:'定位中',
        isShowShopList: false,
        isShowAdvertise: false,
        shop_num_id:202,
        indexData:[]
      }
    },
    methods:{
      jumpUrl (data){
        var pageType = data.pageType,
            id = data.id;
        switch (pageType){
          case 1:
            //分类页  
            this.$router.push({path: 'classify',query: { id:id }})
            break
          case 2:
            //详情页
            this.$router.push({path: 'goodDetial',query: { id:id }})
            break
          case 3:
            //活动详情页
            this.$router.push({path: 'activity',query: { id:id }})
            break
          case 4:
            //虚拟商品分类页
            console.log('虚拟商品分类页')
            break
          case 5:
            //社区文章
            console.log('社区文章')
            break
          case 6:
            //站内文章
            console.log('站内文章')
            break
          default:
            console.log('错误')
        }
        
      },
      addGoods (itemId) {
        let _this = this
        _this.httpAjax({
          method: api.index.addCart,
          data:{
            "message_series": null,
            "request_num_id": null,
            "check_repeat_sign": null,
            "expose_method": null,
            "usr_num_id": 1805230010001, //
            "shop_id": 202, //
            "item_num_id": itemId, //****
            "quantity": 1, //数量   ****
            "package_sku_ids": null,
            "package_id": null,
            "obj_type": "item",
            "mode": "cart",
            "emp_num_id": '', //
            "access_token": _this.local('access_token')
          }
        }).then(function(data){
          _this.$toasts('加入购物车成功')
        }).catch(function(error){})
      },
      toNearByStore(){
        this.$router.push({path:'/nearByStore'})
      },
      //获取店铺信息
      fetchShopData () {
        let _this = this 
        var data = {
            jsonParam:JSON.stringify({"lat": 31.27574,"lon": 121.41901,"tenant_num_id": 6,"data_sign": 1})
          }
        _this.fetchData({
          url:'https://wx.yiako.com/bbc-service/addressGaoDeService/getAddressByLocation',
          method:'GET',
          headers:{
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          params:data
        }).then(function(res){
          console.log(res)
        }).catch(function(error){
          console.log(error)
        })
      },
      //获取首页数据
      fetchIndexList (tmplid) {
        let _this = this
        _this.httpAjax({
          method:api.index.gettmpldetailList,
          data: {
            "tmpl_id":18091100010003,
            "ec_shop_num_id":"202"
          }
        }).then(function(data){
          _this.indexData = data.instance.data
        }).catch(function(error){})
      },
      searchGoods () {
        this.$router.push('searchgoods')
      }
    },
    created () {      
      let _this = this;
      // navigator.geolocation.getCurrentPosition(function(res){
      //   console.log(res);
      //   _this.locationX = res.coords.latitude;
      //   _this.locationY = res.coords.longitude;
      //   console.log(_this.locationX);
      //   console.log(_this.locationY);
      //   _this.fetchShopData()
      // })
      // _this.fetchShopData()

      //获取首页数据
      _this.fetchIndexList()
      
    }

  }
</script>


  

<style lang="less" scoped>
.index{
  .menu-property{
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    padding: 0 30px;
    background: #ffffff;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    .location-address{
      color: #2B653C;
      font-size: 28px;
      &:before{
        content: '';
        width: 20px;
        height: 28px;
        display: inline-block;
        vertical-align: middle;
        background: url(./../assets/icons/adress_green@2x.png) no-repeat;
        background-size:100% 100%;
        margin-right: 10px;
      }
    }
    .logo{
      &:before{
        content: '';
        width: 62px;
        height: 72px;
        display: inline-block;
        background: url(./../assets/icons/logo@2x.png) no-repeat;
        background-size:100% 100%;
      }
    }
    .search{
      margin-right: 36px;
      &:before{
        content: '';
        width: 40px;
        height: 40px;
        display: inline-block;
        vertical-align: middle;
        background: url(./../assets/icons/main_search@2x.png) no-repeat;
        background-size:100% 100%;
      }
    }
    .scan-code{
      &:before{
        content: '';
        width: 40px;
        height: 40px;
        display: inline-block;
        vertical-align: middle;
        background: url(./../assets/icons/main_scan@2x.png) no-repeat;
        background-size:100% 100%;
      }
    }
    .final-address{
      padding: 8px 24px;
      padding-top: 7px;
      line-height: normal;
      background: #208656;
      color: #ffffff;
      border-radius: 24px;
      font-size: 24px;
      position: absolute;
      z-index: 50;
      left: 20px;
      top: 80px;
    }
  }
  .hidden-box{
    width: 100%;
    height: 80px;
  }
  .nav-fix{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .z100{
    z-index: 100;
  }

  .noSend{
    width: 100%;
    height: 74px;
    line-height: 76px;
    box-sizing: border-box;
    background: #ffb0bb;
    padding: 0 30px;
    position: fixed;
    z-index: 11;
    color: #5a5859;
    .address1{
      vertical-align: middle;
      &:before{
        content: '';
        display: inline-block;
        width: 32px;
        height: 32px;
        vertical-align: middle;
        background: url(./../assets/icons/user-version.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
        top: -3px;
        margin-right: 10px;
      }
    }
    .address2{
      vertical-align: middle;
      &:after{
        content: '';
        display: inline-block;
        width: 13px;
        height: 22px;
        background: url(./../assets/icons/arrow_right_grey@2x.png) no-repeat;
        background-size: 100% 100%;
        margin-left: 20px;
      }
    }
  }
  .other-address{
    .bg{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .address-list{
      width: 570px;
      min-height:200px;
      background: #ffffff;
      position: fixed;
      top: 20%;
      left: 50%;
      z-index: 1000;
      transform: translate(-50%,0);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      .address-title{
        padding: 30px 0 20px;
        font-size: 32px;
        padding-top: 40px;
        position: relative;
        .closebtn{
          &::before{
            content: '';
            display: inline-block;
            background: url(./../assets/icons/icon_close@2x.png) no-repeat;
            background-size: 100% 100%;
            width: 36px;
            height: 36px;
            position: absolute;
            top: 36px;
            right: 30px;
          }
        }
      }
      .location-notice{
        color: #c1c1c1;
        line-height: 36px;
      }
      .list{
        margin-top: 30px;
        ul{
          padding-left:40px;
          border-top: 1px solid #efefef;
          border-bottom: 1px solid #efefef;
          li{
             border-bottom: 1px solid #efefef;
             height: 90px;
             line-height: 90px;
             color: #00713B;
             position: relative;
             &:last-child{
               border-bottom: none;
             }
             &:first-child{
               &::after{
                content: '当前';
                display: inline-block;
                padding: 5px 30px;
                color: #e1e1e1;
                border: 2px solid #c3c3c3;
                border-radius: 10px;
                line-height: normal;
                position: absolute;
                right: 30px;
                top: 18px;
               }
             }
          }
        }
      }
      .change-address{
        height: 90px;
        line-height: 90px;
        text-align: center;
        color: #c1c1c1;
      }
    }
  }
  .shop-list{
    .bg{
      width:100%;
      height:100%;
      background:rgba(0,0,0,0.5);
      position:fixed;
      top:0;
      left:0;
      z-index:99;
    }
    .list-content{
      width:690px;
      min-height:100px;
      background:#ffffff;
      position:fixed;
      top:100px;
      left:50%;
      z-index:100;
      transform:translate(-50%,0);
      padding:0 30px;
      border-radius: 10px;
      box-sizing:border-box;
      .shop-nub{
        font-size: 28px;
        color:#666666;
        padding-top:24px;
        padding-bottom:10px;
      }
      ul{
        li{
          display: flex;
          height: 132px;
          box-sizing: border-box;
          border-bottom:1px solid #dddddd;
          padding: 30px 20px 20px 20px;
          position: relative;
          &.selected{
            &:after{
              content: '';
              width: 31px;
              height: 22px;
              display: block;
              background: url(./../assets/icons/selected.png) no-repeat;
              background-size: 100% 100%;
              position: absolute;
              right: 0;
              top: 50%;
              margin-top: -11px;
            }
          }
          .shop-img{
            width:90px;
            height:90px;
            display: block;
            position: relative;
            top: -2px;
          }
          .shop-detail{
            margin-left: 20px;
            p{
              &:first-child{
                margin-bottom:15px;
                color:#666666;
              }
              &:nth-child(2){
                color:#898989;
              }
            }
          }
        }
      }
    }
  }
  .advertiseMent{
    .bg{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
    }
    .adviertiseImg{
      width: 560px;
      height: 762px;
      position: fixed;
      top: 20%;
      left: 50%;
      margin-left: -280px;
      z-index: 100;
      img{
        width: 100%;
        height: 100%;
      }
      .close-btn{
        width: 80px;
        height: 80px;
        background: url(./../assets/icons/userdelete@2x.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
        z-index: 100%;
        top: 100px;
        left: 50%;
        margin-left: -40px;
      }
    }
  }
}

</style>
