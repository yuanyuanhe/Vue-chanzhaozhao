<template>
  <div class="body">
    <Header title="订单详情"></Header>
     <div>
        <div class="addressPart">
          <div class="innerContent">
             <div class="order_status">
               <img src="../assets/icons/icon_wait.png" alt="" />
               <span>{{order_state_name}}</span>
             </div>
             <div class="logistic_address">
                <div class="logistic">
                  <div class="icons"><img src="../assets/icons/logistics.png" alt="" /></div>
                  <div class="logistic_time">
                     <div class="logistic_status">您的订单预计今日送达</div>
                     <div class="time">2018-08-13 12:46:36</div>
                     <img src="../assets/icons/ArrowGrayR.png" alt="" />
                  </div>
                </div>
                <div class="receives">
                   <div class="icons">
                      <img src="../assets/icons/receivingaddress.png" alt="" />
                   </div>
                   <div class="receiveDetail">
                     <div class="address">{{addressInfo.prv_name}} {{addressInfo.city_name}} {{addressInfo.city_area_name
}} {{addressInfo.adr}}</div>
                     <div class="users">{{addressInfo.cont_empe}}  {{addressInfo.contact_no}}</div>
                   </div>
                </div>
             </div>
          </div>
          <div class="up">
            <img src="../assets/icons/cute.png" alt="" />
          </div>
          <div class="down"></div>
        </div>
        <div class="goodsList">
          <div class="martName">
            <img src="../assets/icons/store.png" alt="" />
            <span>绿地G-Super生鲜超市</span>
          </div>
          <div class="goodsItem" v-for="(v,i) in orderItems" @click="toGoodsDetail(v)">
              <div class="dt">
                <img :src="v.item_picture" alt="" />
              </div>
              <div class="dd">
                <p class="quality">{{v.item_name}}</p>
                <p class="qty"> 数量：{{v.qty}}{{v.spec_nature_info}}</p>
                <p class="singlePrice">￥{{v.trade_price}}</p>
              </div>
          </div>
        </div>
        <div class="order_state">
          <div class="inner">
              <p>
                <span class="dt">订单编号：</span>
                <span class="dd">{{order_item_num}}</span>
              </p>
              <p>
                <span class="dt">下单时间：</span>
                <span class="dd">{{order_dtime}}</span>
              </p>
          </div>
        </div>
        <div class="voucher">
            <div class="inner" @click="toEvaluate">
                <span class="dt">发票抬头</span>
                <span class="dd">个人</span>
            </div>
        </div>
        <div class="moneyTotal">
          <div class="inner">
              <p class="goodsMoney">
                <span class="dt">商品金额</span>
                <span class="dd">￥{{payAmountInfo.goods_amount}}</span>
              </p>
              <p class="goodsMoney">
                <span class="dt">促销折价</span>
                <span class="dd">-￥{{payAmountInfo.decut_amount}}</span>
              </p>
              <p class="goodsMoney">
                <span class="dt">配送运费</span>
                <span class="dd">￥{{payAmountInfo.ef_amount}}</span>
              </p>
              <p class="shouldPay">
                 <span class="dt">应付金额</span>
                 <span class="dd">￥{{payAmountInfo.need_pay_amount}}</span>
              </p>
          </div>
        </div>
        <div class="occupy"></div>
        <div class="payNow" v-if="order_state==1">
           <div class="inner">
              <p class="leftTime"></p>
              <p class="order_oper">
                <span class="order_cancel">取消订单</span>
                <span class="pay_now">立即支付</span>
              </p>
           </div>
        </div>
     </div>
  </div>
</template>

<script>

import Header from '@/components/common/header.vue'
import api from '../units/config'
import { Confirm } from 'vux'
export default {
  components:{
    Header,
    Confirm
  },
  data () {
    return {
       order_state_name:'',
       addressInfo:{},
       payAmountInfo:{},
       order_state:1,
       orderItems:[],
       order_item_num:'',
       order_dtime:'',
    }
  },
  created(){
      let orderId=this.$route.query.orderId;
      this.$store.dispatch('footerStatus/hideFooter');
      this.getOrderDetails(orderId);
  },
  methods:{
       toGoodsDetail(item){
          let style_num_id=item.style_num_id;
          this.$router.push({path:'/goodsDetail',query:{styleId:style_num_id}})
        },
         //获取订单详情
    getOrderDetails(orderId){
      let that=this;
      this.$http.query({
        method: api.vip.orderDetail,
        data:{
          "ec_shop_num_id": 202,
          "client_type": 1,
          "parent_tml_num_id": orderId,
          'access_token':JSON.parse(localStorage.getItem('access_token'))
        },
        success:function(res){
          console.log(res)
            that.order_state_name=res.data.order_state_name;
            that.addressInfo=res.data.member_adr;
            that.payAmountInfo=res.data.amount;
            that.order_state=res.data.order_state;
            that.orderItems=res.data.order_items;
            that.order_item_num=res.data.order_num_id;
            that.order_dtime=res.data.order_dtme;        
        },
        error: function(res){
          console.log(res); 
        }
      })
    },
    toEvaluate(){
      this.$router.push({path:'/evaluation',query:{orderNum:123456}})
    }
  }
}
</script>

<style lang="less" >   
 @import '../assets/css/orderDetail.less';

</style>
