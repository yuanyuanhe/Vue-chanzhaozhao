<template>
  <div class="body">
    <Header v-if="!hideHeader" title="我的优惠券"></Header>
    <div class="t-tab">
      <div class="li" :class="typenum == 0 ? 'active' : ''" @click="menuClick(0)">可用优惠券（{{couponsNum}}）</div>
      <div class="li" :class="typenum == 1 ? 'active' : ''" @click="menuClick(1)">历史优惠券</div>
    </div>  
    <div class="coupons-wrap">
      <template v-if="typenum == 0">
        <template v-if="availableCoupons.length > 0">
          <div class="coupons" v-for="(item,index) in availableCoupons" :key="index">
            <img class="img-bg" src="../assets/images/myCoupons/bg.png" />
            <div class="wrap">
              <div class="fl left">
                <span class="fh">￥</span>
                <span class="amount">{{item.qmz}}</span>
                <span class="desc">{{couponStr(item.qname)}}</span>
              </div>
              <div class="fl right">
                <span class="desc1">仅限超市（绿标）使用</span>
                <span class="desc2">APP、小程序专用</span>
                <span class="user-date">{{dateStr(item.sdate)}} 至 {{dateStr(item.edate)}}</span>
              </div>
            </div>
            <div class="use-range">{{item.discount_description}}</div>  
          </div>
        </template>
        <template v-else>
          <div class="empty">
            <img class="empty-img" src="../assets/images/voucherCenter/empty.png" />
            <span class="desc">暂时还没有优惠券哟~</span>
        </div>
        </template>
      </template> 
      <template v-else>
        <template v-if="historicalCoupons.length > 0">
          <div class="coupons history" v-for="(item,index) in historicalCoupons" :key="index">
            <img class="img-bg" src="../assets/images/myCoupons/bg.png" />
            <template v-if="item.status == 8">
              <img class="use-pic" src="../assets/images/myCoupons/expired.png" />
            </template>
            <template v-else-if="item.status == 2 || item.status == 9">
              <img class="use-pic" src="../assets/images/myCoupons/used.png" />
            </template>
            <div class="wrap">
              <div class="fl left">
                <span class="fh">￥</span>
                <span class="amount">{{item.qmz}}</span>
                <span class="desc">{{couponStr(item.qname)}}</span>
              </div>
              <div class="fl right">
                <span class="desc1">仅限超市（绿标）使用</span>
                <span class="desc2">APP、小程序专用</span>
                <span class="user-date">{{dateStr(item.sdate)}} 至 {{dateStr(item.edate)}}</span>
              </div>
            </div>
            <div class="use-range">{{item.discount_description}}</div> 
          </div> 
        </template>
        <template v-else>
          <div class="empty">
            <img class="empty-img" src="../assets/images/voucherCenter/empty.png" />
            <span class="desc">暂时还没有优惠券哟~</span>
          </div>
        </template>
      </template>  
    </div>
     <div v-if="!hideFooter" class="bottom">
       <div class="b-li" @click="">逛商城</div>
       <div class="b-li" @click="toPage('voucherCenter')">去领券</div>
     </div>    
  </div>
</template>

<script>
import Header from "../components/common/header";
import api from './../units/config';
export default {
  name: 'myCoupons',
  components: {
    Header
  },
  props:['hideHeader','hideFooter'],
  data () {
    return {
      typenum: 0,     //0表示可用，1表示历史用券
      couponsNum: 0,  //可用优惠券数量
      availableCoupons:[],
      historicalCoupons:[],

    }
  },
  methods:{
    menuClick(num){
      this.typenum = num;
      console.log(this.typenum);
    },
    dateStr(date) {   
      return date.substring(0,10);
    },
    couponStr(qname) {    
      return qname.substring(3);
    },
    toPage(url){
      this.$router.push({
        name: url
      })
    }
  },
  mounted(){
    let _this = this;
    //隐藏底部tab
    _this.$store.dispatch('footerStatus/hideFooter');
    _this.$http.query({
      method: api.myCoupons.getCoupons,
      data:{
        "usr_num_id": 1805090010001,
        "status": "1",
        "member_tights_type": 1,
        "coupontype": null,
        "page": 1,
        "rows": 1000
      },
      success:function(res){
        if(res.data.code == 0 && res.data.usr_vouchers && res.data.usr_vouchers.length > 0){
          _this.availableCoupons = [];
          _this.historicalCoupons = [];
          res.data.usr_vouchers.forEach(function(value,index){
            if(value.status == "1"){
              _this.availableCoupons.push(value); 
            }else if(value.status == "8" || value.status == "9"){
              _this.historicalCoupons.push(value); 
            }
          });
          _this.couponsNum = _this.availableCoupons.length;
        }
        
      },
      error: function(res){
        console.log(res); 
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.body{
  height: 100%;
  font-family: PingFangSC-Regular;
  background-color: #f3f4f6;
  position: relative;
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .t-tab{
    position: fixed;
    left: 0;
    top: 128px;
    width: 100%;
    height: 81px;
    text-align: center;
    background-color: #fff;
    z-index: 9;
    .li{
      height: 80px;
      line-height: 80px;
      border-bottom: 1px solid #fff;
      float: left;
      width: 50%;
      font-size: 28px;
      color: #ccc;
      &.active{
        color: #2A8358;
        border-bottom: 1px solid #2A8358;
      }
      &:after{
        content:"";
        visibility:hidden;
        display:block;
        width:100%;
        height:0;
        clear:both;
      }
    }
    
  }
  .coupons-wrap{
    padding: 116px 0 98px;
    .empty{
      width: 100%;
      padding: 220px 0 100px;
      text-align: center;
      .empty-img{
        width: 268px;
        height: 268px;
        margin-bottom: 45px;
        display: inline-block;
      }
      .desc{
        display: block;
        font-size: 24px;
        color: #999;
      }
    } 
    .coupons{
      width: 680px;
      height: 240px;
      position: relative;
      margin: 0 auto 25px;
      .img-bg{
        width: 100%;
        height: 100%;
      }
      .wrap{
        width: 600px;
        position: absolute;
        left: 47px;
        top: 40px;
        overflow: hidden;
        .left{
          padding-top: 14px;
          width: 171px;
          float: left;
          .fh{
            font-family: PingFang-SC-Bold;
            color: #1F9459;
            line-height: 21px;
            font-size: 28px;
          }
          .amount{
            height: 45px;
            font-size: 42px;
            font-family: PingFang-SC-Bold;
            color: #1F9459;
            line-height: 21px;
            margin-bottom: 26px;
          } 
          .desc{
            display: block;
            height: 23px;
            font-size: 24px;
            color: #2A8358;
            line-height: 21px;
            margin-top: 18px;
          }
        }
        .right{
          float: left;
          width: 400px;
          overflow: hidden;
          .desc1{
            font-size: 28px;
            color: #333;
            line-height: 21px;
            margin-bottom: 28px;
            display: block;
          }
          .desc2{
            font-size: 24px;
            color: #666;
            line-height: 30px;
            margin-bottom: 10px;
            display: block;
          }
          .user-date{
            font-size: 24px;
            color: #666;
            line-height: 30px;
            display: block;
          }
        }
        
      }
      .use-range{
        position: absolute;
        width: 612px;
        height: 61px;
        line-height: 61px;
        border-top: 1px dashed #DFDFDF;
        color: #999;
        font-size: 24px;
        left: 50%;
        margin-left: -306px;
        bottom: 0;
      }

    }
    .coupons.history .img-bg{
      filter: grayscale(100%);
      -webkit-filter: grayscale(100%);
      opacity: .6;
    }
    .coupons.history .fh,
    .coupons.history .amount,
    .coupons.history .desc,
    .coupons.history .desc1,
    .coupons.history .desc2,
    .coupons.history .user-date,
    .coupons.history .use-range{
      color: #ccc !important;
    }
    .coupons.history .use-pic{
      width: 142px !important;
      height: 142px !important;
      position: absolute;
      right: -20px;
      top: -20px;
      z-index: 9;
    }
  }
  .bottom{
    height: 98px;
    width: 100%;
    overflow: hidden;
    color: #208656;
    background-color: #fff;
    font-size: 30px;
    position: fixed;
    left: 0;
    bottom: 0;
    .b-li{
      float: left;
      width: 50%;
      text-align: center;
      line-height: 98px;
      &:last-child{
        color: #fff;
        background-color: #208656;
      }
    }
  }
}
.coupon-content{
  .body{
    .t-tab{
      position: relative;
      top: 0px;
    }
    .coupons-wrap{
      max-height: 900px;
      overflow-y: scroll;
    }
  }
}
</style>
