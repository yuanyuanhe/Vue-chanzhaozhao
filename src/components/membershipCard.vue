<template>
  <div class="body">
    <Header title=""></Header>
    <div class="card">
      <div class="relative">
        <div class="card-bg">
          <div class="relative">
            <img class="bg" src="../assets/images/membershipCard/member_card.png" />
            <img class="logo" src="../assets/images/membershipCard/logo.png" />
            <div class="num-id">
              <span class="phone">{{phone}}</span>
              <img class="level" src="../assets/images/membershipCard/level.png" />
            </div>
            <div class="bar-code">
              <svg id="barcode"></svg>
            </div>
            <span class="card-num">卡号：{{barcode}}</span>
          </div>
        </div>
        <div class="b-area">
          <div class="li">
            <img class="icon" src="../assets/images/membershipCard/choose_icon.png" />
            <span>会员专享价</span>
          </div>
          <div class="li">
            <img class="icon" src="../assets/images/membershipCard/choose_icon.png" />
            <span>累计积分</span>
          </div>
          <div class="li">
            <img class="icon" src="../assets/images/membershipCard/choose_icon.png" />
            <span>使用优惠券</span>
          </div>
        </div> 
      </div>
    </div>          
  </div>
</template>

<script>
import Header from "../components/common/header";
import api from './../units/config';
export default {
  name: 'membershipCard',
  components: {
    Header
  },
  data () {
    return{
      phone: "",
      barcode: "",
    } 
  },
  methods:{

  },
  mounted(){
    let _this = this;
    //_this.phone = _this.local('phone').substring(0,3)+"****"+_this.local('phone').substring(7);
    //隐藏底部tab
    _this.$store.dispatch('footerStatus/hideFooter');
    _this.$http.query({
      method: api.membershipCard.getMemberInfo,
      data:{
        "usr_num_id":1035240050001,
        "usr_no":1,
        "mobile":null,
        "baby_sign":0,
        "adr_sign":0,
        "touch_sign":0,
        "integral_sign":0,
        "coupon_sign":0,
        "growth_sign":0
      },
      success:function(res){
        if(res.data.code == 0){
          _this.barcode = res.data.usr_no;
          JsBarcode("#barcode", res.data.usr_no, {
            font: "OCR-B",
            displayValue: false,
            textMargin: 5,
            fontSize: 20,
          });
        }
      },
      error:function(res){
        console.log(res);
      }
    }) 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.body {
  height: 100%;
  font-family: PingFangSC-Regular;
  background-color: #208656;
  .relative{
    position: relative;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .card{
    width: 690px;
    height: 865px;
    position: absolute;
    left: 50%; 
    top: 50%;
    margin-left: -345px;
    margin-top: -480px; 
    background-color: #fff;
    border-radius: 10px;
    .card-bg{
      width: 638px;
      height: 360px;
      position: absolute;
      left: 50%;
      margin-left: -319px;
      top: 100px;
      .bg{
        width: 100%;
        height: 100%;
      }
      .logo{
        position: absolute;
        left: 46px;
        top: 55px;
        width: 73px;
        height: 83px;
      }
      .num-id{
        position: absolute;
        left: 161px;
        top: 154px;
        .phone{
          font-size: 40px;
          font-family:PingFang-SC-Bold;
          color: #fff;
          line-height: 35px;
        }
        .level{
          width: 90px;
          height: 28px;
          margin-left: 10px;
        }
      }
      .bar-code{
        width: 387px;
        height: 136px;
        margin: 20px auto 30px;
        #barcode{
          width: 100%;
          height: 100%;
        }
      }
      .card-num{
        display: block;
        text-align: center;
        font-size: 28px;
        color: #333333;
        line-height: 14px;
      }
    }
    .b-area{
      width: 630px;
      height: 100px;
      line-height: 100px;
      border-top: 1px solid #EFEFEF; 
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -315px;
      overflow: hidden;
      .li{
        height: 100px;
        line-height: 100px;
        font-size: 28px;
        color: #333;
        padding-left: 37px;
        position: relative;
        float: left;
        margin-right: 60px;
        &:last-child{
          float: right;
          margin-right: 0;
        }
        .icon{
          width: 28px;
          height: 28px;
          position:absolute;
          left: 0;
          top: 36px; 
        }
      }
    }
  }
}

</style>
