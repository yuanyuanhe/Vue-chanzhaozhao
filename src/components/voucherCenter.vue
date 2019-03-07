<template>
  <div class="body">
    <Header title="领券中心"></Header>
    <template v-if="coupons.length > 0">
      <div class="li" v-for="(item,index) in coupons" :key="index">
        <img class="bg" src="../assets/images/voucherCenter/coupons_bg.png" />
        <div class="txt">
          <span class="fh">￥</span>
          <span class="amount">{{item.face_value}}</span>
          <span class="condition">{{item.discount_description}}</span>
          <template v-if="item.is_collar == 0">
            <span class="tab" @click="voucher(index,item)">马上领券</span>
          </template>
          <template v-else-if="item.is_collar == 1">
            <span class="tab received">已领券</span>
          </template>
          <span class="desc desc1">· 仅限超市（绿标）使用</span>
          <span class="desc desc2">· APP专用</span>
          <span class="desc desc3">· {{item.use_begin_date}} 至 {{item.use_end_date}}</span>
        </div>
      </div>  
    </template>
    <template v-else>
      <div class="empty">
        <img class="empty-img" src="../assets/images/voucherCenter/empty.png" />
        <span class="desc">暂时还没有优惠券哟~</span>
      </div>
    </template>          
  </div> 
</template>

<script>
import Header from "../components/common/header";
import api from './../units/config';
export default {
  name: 'voucherCenter',
  components: {
    Header
  },
  data () {
    return{
      coupons:[],
    } 
  },
  methods:{
    //领券
    voucher(index,item){
      console.log(index);
      console.log(item);
      let _this = this;
      _this.$http.query({
        method: api.voucherCenter.getCard,
        data:{
          "coupon_num_id": _this.coupons[index].coupon_num_id,
          "barcode": "0918239129371929831",
          "usr_num_id": 1805090010001
        },
        success:function(res){
          _this.$toast(res.data.message);
          if(res.data.code == 0){
            _this.coupons[index].is_collar = "1";
          }
          
        },
        error: function(res){
          console.log(res); 
        }
      })
    }  
  },
  mounted(){
    let _this = this;
    //隐藏底部tab
    _this.$store.dispatch('footerStatus/hideFooter');
    _this.$http.query({
      method: api.voucherCenter.couponsList,
      data:{
        "sku_num_id": null,
        "shop_num_id": "10540",
        "pty_num1": null,
        "pty_num2": null,
        "pty_num3": null,
        "on_line": 1,
        "usr_level_id": null
      },
      success:function(res){
        if(res.data.code == 0){
          _this.coupons = [];
          _this.coupons = res.data.items;
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
<style lang="less" scoped>
.body{
  .li{
    width: 688px;
    height: 248px;
    margin: 25px auto 25px;
    position: relative;
    .bg{
      width: 100%;
      height: 100%;
    }
    .txt{
      position: absolute;
      top: 36px;
      left: 40px;
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
      .condition{
        height: 26px;
        font-size: 28px;
        color: #2A8358;
        line-height: 21px;
        margin-left: 40px;
      }
      .desc{
        display: block;
        height: 23px;
        font-size: 24px;
        color: #666;
        line-height: 21px;
        margin-top: 18px;
        &.desc3{
          color: #999;
        }
      }
    }
    .tab{
      display: block;
      position: absolute;
      width: 146px;
      height: 44px;
      line-height: 44px;
      border-radius: 22px;
      background-color: #1F9459;
      text-align: center;
      font-size: 24px;
      color: #fff;
      left: 472px;
      top: 50%;
      margin-top: -22px;
      &.received{
        background-color: #fff;
        color: #999;
      } 
    }
      
  }
  .empty{
    width: 100%;
    padding: 220px 0 100px;
    text-align: center;
    .empty-img{
      width: 268px;
      height: 268px;
      margin-bottom: 45px;
    }
    .desc{
      display: block;
      font-size: 24px;
      color: #999;
    }
  }
}

</style>
