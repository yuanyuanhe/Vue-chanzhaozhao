<template>
  <div class='vip-center-box'>
    <div class="vip-set" @click="pageJump('setting')"></div>
    <div class="vip-center-user">
      <div @click="pageJump('vipinfo')" class="vip-center-user-info">
        <div class="vip-center-user-img">
          <img :src="userInfo.avatarUrl">
          <!--<open-data type="userAvatarUrl"></open-data>-->
          <!--<button class="get-user-info" open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo"></button>-->
        </div>
        <div class="vip-center-user-permsg">
          <div class="vip-center-user-num">{{phone}}</div>
          <img class="vip-center-user-level" src="../assets/icons/vipLevel.png">
        </div>
      </div>
      <div class="vip-center-user-card" @click="pageJump('vipCard')">
        <img src="../assets/icons/vipCenterCard.png">
      </div>
    </div>
    <div class="my-order-box">
      <div class="my-order-top">
        <div class="my-order-title">我的订单</div>
        <div class="my-order-all" @click="toOrderList">
          查看全部订单
          <div class="user-block-entericon"></div>
        </div>
      </div>
      <div class="my-order-classify-list">
        <div class="my-order-classify-name" @click="waitPay">
          <img class="my-order-classify-icon" src="../assets/icons/orderdfk.png">
          <div class="my-order-classify-title">待付款</div>
        </div>
        <div class="my-order-classify-name" @click="waitTransfer">
          <img class="my-order-classify-icon" src="../assets/icons/orderdps.png">
          <div class="my-order-classify-title">待配送</div>
        </div>
        <div class="my-order-classify-name" @click="assigned">
          <img class="my-order-classify-icon" src="../assets/icons/orderyfh.png">
          <div class="my-order-classify-title">已发货</div>
        </div>
        <div class="my-order-classify-name" @click="waitPraise">
          <img class="my-order-classify-icon" src="../assets/icons/orderypj.png">
          <div class="my-order-classify-title">待评价</div>
        </div>
        <!--<div class="my-order-classify-name" @click="afterFinished">
          <img class="my-order-classify-icon" src="../assets/icons/ordersh.png">
          <div class="my-order-classify-title">售后</div>
        </div>-->
      </div>
      <!--<div class="my-code-order">-->
        <!--<div class="my-code-order-tit">扫码购订单</div>-->
        <!--<div class="my-code-order-icon"></div>-->
      <!--</div>-->
    </div>
    <div class="my-wallet">
      <div class="my-wallet-title">我的钱包</div>
      <div class="my-wallet-classify">
        <div class="my-wallet-classify-list">
          <div class="my-wallet-number">12</div>
          <div class="my-wallet-classify-name">预售券</div>
        </div>
        <div @click="pageJump('coupon')" class="my-wallet-classify-list">
          <div class="my-wallet-number">{{couponNum}}</div>
          <div class="my-wallet-classify-name">优惠券</div>
        </div>
        <div class="my-wallet-classify-list">
          <div class="my-wallet-number">{{integralNum}}</div>
          <div class="my-wallet-classify-name">积分</div>
        </div>
      </div>
    </div>
    <div class="my-wallet">
      <div class="my-wallet-title">服务帮助</div>
      <div class="service-list">
        <div @click="pageJump" class="service-box">
          <img class="service-box-icon" src="../assets/images/membershipCard/service-help-01.png" alt="">
          <div class="service-box-name">我的收藏</div>
        </div>
        <div @click="pageJump('address')" class="service-box">
          <img class="service-box-icon" src="../assets/images/membershipCard/service-help-02.png" alt="">
          <div class="service-box-name">地址管理</div>
        </div>
        <a href="tel:123456" class="service-box">
          <img class="service-box-icon" src="../assets/images/membershipCard/service-help-03.png" alt="">
          <div class="service-box-name">联系客服</div>
        </a>
        <div @click="pageJump('feedback')" class="service-box">
          <img class="service-box-icon" src="../assets/images/membershipCard/service-help-04.png" alt="">
          <div class="service-box-name">意见反馈</div>
        </div>
        <div @click="pageJump" class="service-box">
          <img class="service-box-icon" src="../assets/images/membershipCard/service-help-05.png" alt="">
          <div class="service-box-name">下载APP</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Header from '@/components/common/header.vue'
import avatarUrl from '../assets/icons/default_user.png'
import api from './../units/config'
export default {
  components:{
    Header,
  },
  data () {
    return {
      msg: '会员中心',
      userInfo: {
        avatarUrl: avatarUrl
      },                 //用户信息
      telNumber:'123456',           //官方电话
      isLogined:false,              //判断是否登录
      phone:'123',                     //用户电话号码
      couponNum:0,                  //优惠券数量
      integralNum:0,                //积分
      service:[
        {
          imgIcon: require("../assets/images/membershipCard/service-help-01.png"),
          name: '我的收藏',
          id: ''
        },
        {
          imgIcon: require("../assets/images/membershipCard/service-help-02.png"),
          name: '地址管理',
          id: 'address'
        },
        {
          imgIcon: require("../assets/images/membershipCard/service-help-03.png"),
          name: '联系客服',
          id: 'contact'
        },
        {
          imgIcon: require("../assets/images/membershipCard/service-help-04.png"),
          name: '意见反馈',
          id: 'feedback'
        },
        {
          imgIcon: require("../assets/images/membershipCard/service-help-05.png"),
          name: '下载APP'
        },
      ],
      usrNumId:'',
      accessToken:''
    }
  },
  methods:{
    toOrderList () {
      this.$router.push('orderlist')
    },
    /**
     * 页面跳转
     * @param where 跳转到哪一个页面指定参数
     */
    pageJump (where) {
      switch (where) {
        case 'address':
          this.$router.push({
            name:'address'
          })
          break;
        case 'vipinfo':
          this.$router.push({
            name:'vipDetail'
          })
          break;
        case 'feedback':
          this.$router.push({
            name:'suggestion'
          })
          break;
        case 'vipCard':
          this.$router.push({
            name:'membershipCard'
          })
          break;
        case 'coupon':
          this.$router.push({
            name:'myCoupons'
          })
          break;
        case 'setting':
          this.$router.push({
            name:'Setting'
          })
          break;
      }
    },
    /**
     * 我的优惠券
     */
    getCoupons(){
      const self = this;
      this.httpAjax({
        method: api.myCoupons.getCoupons,
        data:{
          "usr_num_id": self.usrNumId,
          "status": "1",
          "member_tights_type": 1,
          "coupontype": null,
          "page": 1,
          "rows": 1000
        }
      }).then(res=>{
        if(!res.usr_vouchers){
          self.couponNum = 0
        }else{
          self.couponNum = res.usr_vouchers.length
        }
      },res=>{
        console.log(res);
      })
    },
    /**
     * 积分
     */
    getIntegral(){
      const self = this;
      this.httpAjax({
        method: api.vip.integral,
        data:{
          // "usr_num_id": 1055240050001,
          "access_token": self.accessToken
        }
      }).then(res=>{
        self.integralNum = res.point;
      },res=>{
        console.log(res);
      })
    },
    toOrderList(){  //全部订单
      this.$router.push({path:'/orderlist',query:{orderStatus:0}})
    },
    waitPay(){ //待付款
      this.$router.push({path:'/orderlist',query:{orderStatus:1}})
    },
    waitTransfer(){ //带配送
     this.$router.push({path:'/orderlist',query:{orderStatus:2}})
    },
    assigned(){ //已发货
     this.$router.push({path:'/orderlist',query:{orderStatus:3}})
    },
    waitPraise(){ //待评价
     this.$router.push({path:'/orderlist',query:{orderStatus:4}})
    },
//  afterFinished(){ //售后
//   this.$router.push({path:'/orderlist',query:{orderStatus:5}})
//  }
    onCancel () {
      console.log('on cancel')
    },
    onConfirm (msg) {
      console.log('on confirm')
      if (msg) {
        alert(msg)
      }
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
  },
  created(){
    this.usrNumId = this.local('usr_num_id');
    this.accessToken = this.local('access_token')
    this.getCoupons();
    this.getIntegral();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  .vip-center-box{
    color:#666666;
    background: #F3F4F6;
    padding: 200px 20px 0;
    -webkit-overflow-scrolling: touch;
    background: #F3F4F6 url("../assets/images/membershipCard/userbg.png") no-repeat top center;
    background-size: 100% auto;
    box-sizing: border-box;
    .vip-set{
      width: 80px;
      height: 80px;
      background: url("../assets/images/membershipCard/setup.png") no-repeat center;
      position: absolute;
      top: 110px;
      right: 21px;
      background-size: 50% auto;
    }
    .vip-center-user{
      height: 200px;
      position: relative;
      display: flex;
      padding-left: 45px;
      padding-right: 33px;
      justify-content: space-between;
      background: #fff;
      div{
        position: relative;
      }

      .vip-center-user-bgimg{
        position: absolute;
        width: 100%;
        height: 100%;
        height: 100%;
        z-index: 0;
        left: 0;
        right: 0;
      }
      .vip-center-user-info{
        height: 100%;
        display: flex;
        .vip-center-user-img{
          width: 115px;
          height: 115px;
          border-radius: 50%;
          background: #fff;
          align-self: center;
          box-shadow: 0 0 5px #c9f8e2;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          img{
            width: 105px;
            height: 105px;
            border-radius: 50%;
            align-items: center;
          }
          .get-user-info{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: transparent;
            position: absolute;
            left: 0;
            top: 0;
            border: 0;
            outline: none;
            &:after{
              border: none;
            }
          }
        }
        .vip-center-user-permsg{
          padding-top: 50px;
          font-size: 30px;
          padding: 39px;
          .vip-center-user-num{
            display: block;
            padding-bottom: 15px;
          }
          .vip-center-user-level{
            width: 97px;
            height: 33px;
            display: block;
          }
        }
      }
      .vip-center-user-card{
        margin-top: 58px;
        img{
          width: 160px;
          height: 84px;
        }
      }
    }
    .my-order-box{
      background: #fff;
      margin-bottom: 24px;
      .my-order-top{
        display: flex;
        justify-content: space-between;
        color: #208656;
        padding: 0 30px;
        line-height: 80px;
        .my-order-title{
          font-size: 28px;
          color: #000;
        }
        .my-order-all{
          font-size: 22px;
          position: relative;
          padding-right: 35px;
          .my-order-allicon{
            color: #CFCFCF;
          }
        }
      }
      .my-order-classify-list{
        display: flex;
        border-top: 1px solid #EFEFEF;
        border-bottom: 1px solid #EFEFEF;
        .my-order-classify-name{
          display: flex;
          flex: 1;
          align-self: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          padding: 25px 0;
          .my-order-classify-icon{
            width: 41px;
            height: 41px;
            display: block;
            margin: 0 auto;
          }
          .my-order-classify-title{
            padding-top: 13px;
            font-size: 24px;
          }
        }
      }
      .my-code-order{
        height: 90px;
        line-height: 90px;
        font-size: 28px;
        color: #000;
        padding-left: 42px;
        position: relative;
        .my-code-order-icon{
          position: absolute;
          width: 60px;
          height: 60px;
          top: 20px;
          right: 20px;
          &:before{
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            border: 1px solid #ccc;
            border-width: 2px 0 0 2px;
            transform: rotate(135deg);
            top: 19px;
            left: 10px;
          }
        }
      }
    }
    .my-wallet{
      background: #fff;
      margin-bottom: 24px;
      .my-wallet-title{
        padding-left: 42px;
        border-bottom: 1px solid #EFEFEF;
        height: 80px;
        line-height: 80px;
        font-size: 28px;
        color: #000;
      }
      .my-wallet-classify{
        display: flex;
        justify-content: space-around;
        padding: 0 100px;
        .my-wallet-classify-list{
          display: flex;
          align-items: center;
          text-align: center;
          flex-direction: column;
          padding: 40px 0;
          .my-wallet-number{
            color: #000;
            font-size: 30px;
            padding-bottom: 10px;
          }
          .my-wallet-classify-name{
            font-size: 26px;
          }
        }
      }
      .service-list{
        padding: 45px 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .service-box{
          width: 100px;
          .service-box-icon{
            display: block;
            font-size: 0;
            width: 95%;
            height: auto;
            margin: 0 auto;
          }
          .service-box-name{
            color: #666666;
            font-size: 24px;
            text-align: center;
          }
        }
      }
    }
    .user-block-list{
      background: #fff;
      color: #666666;
      font-size: 30px;
      .user-block-box{
        position: relative;
        border-bottom: 1px solid #EFEFEF;
        padding-left: 97px;
        height: 100px;
        line-height: 100px;
        .user-block-icon{
          position: absolute;
          width: 40px;
          height: 40px;
          transform: translateY(-50%);
          top: 50%;
          left: 42px;
        }

        .user-block-version{
          font-size: 20px;
          color: #CCCCCC;
          position: absolute;
          height: 100px;
          line-height: 100px;
          top: 0;
          right: 100px;
        }
      }
    }
    .user-block-entericon{
      position: absolute;
      width: 40px;
      height: 60px;
      top: 10px;
      right: 0;
      &:before{
        content: '';
        position: absolute;
        width: 15px;
        height: 15px;
        border: 2px solid #ccc;
        border-width: 4px 0 0 4px;
        transform: rotate(135deg);
        top: 19px;
        left: 10px;
      }
    }
  }
</style>
