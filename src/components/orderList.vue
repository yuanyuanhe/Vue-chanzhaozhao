<template>
  <div class="orderlist">
    <Header title="订单列表"></Header>
    <div class="all-list">
      <div class="list-header">
        <ul>
          <li v-for="(v,i) in tabList" :class="current==i?'selected':''" @click="changeTab(i)"><span>{{v}}</span></li>
        </ul>
      </div>
      <div class="list-content" v-if="hasOrderlist">
       <scroller lock-x :scrollbaY=false height="-120" ref="scrollerBottom" @on-scroll-bottom="onScrollBottom">
        <div>
        <div class="order-detail" v-for="(v,i) in orderList" @click="toOrderDetail(v)">
          <div class="order-nub clearfix">
            <span class="fl">订单号：{{v.order_num_id}}</span>
            <span class="color-blue fr">{{v.order_status_name}}</span>
          </div>
          <div class="goods-total">
            <div class="goods-img">
              <span v-for="(val,index) in v.item_details">
                <img :src="val.item_picture" alt=""/>
              </span>
            </div>
            <div class="goods-nub tr">
              <p>共{{v.total_item_count}}件商品</p>
              <p class="mt10">合计<span class="money-icon ml5">{{v.need_pay_amount}}</span></p>
            </div>
          </div>
          <div class="order-operate">
            <p class="dTime">{{v.create_dtme}}</p>
            <p class="operate-btn" v-if="v.order_status==1">
              <span class="cancelBtn" @click="orderCancel(v)">取消订单</span>
              <span class="toPayMoney" @click="payMoney(v)">去支付</span>
            </p>
          </div>
      </div>
      </div>
      </scroller>
      </div>
        <div class="none-orderlist" v-else>
          <img src="../assets/images/orderEmpty.png" alt=""/>
          <p>还没有订单呢，赶紧去购物吧~</p>
        </div>
    </div>
    <div>
      <confirm v-model="showModel"
      :title="msgTitle"
      @on-cancel="onCancel"
      @on-confirm="onConfirm">
        <p style="text-align:center;">确定要删除此订单吗？</p>
      </confirm>
    </div>
  </div>
</template>
<script>
import Header from '@/components/common/header.vue'
import api from '../units/config'
import { Confirm,Scroller } from 'vux'
export default {
  components:{
    Header,
    Confirm,
    Scroller
  },
  data () {
    return {
      pageIndex:1,
      showModel:false,
      msgTitle:'取消订单',
      hasOrderlist:false,
      tabList:['全部订单','待付款','待配送','待收货','待评分'],
      current:0,
      orderList:[],
      contentHeight:0,
      loadmore:true
    }
  },
  mounted(){
      this.current=Number(this.$route.query.orderStatus);
      this.$store.dispatch('footerStatus/hideFooter');
      this.getOrderListData(this.current);
      if(this.hasOrderlist==true){
         this.$nextTick(() => {
          this.$refs.scrollerBottom.reset({top: 0})
        })
      }
      
  },
  
  methods:{
    changeTab(i){
      this.current=i;
      this.getOrderListData(i);
    },
    onScrollBottom () { //上拉加载
      if(!this.loadmore){
       return;
      }else if(this.loadmore) {  // 新版本
        this.pageIndex++;
        console.log(this.pageIndex)
        this.loadmore = false;
        this.getOrderListData();
      }
      
    },
    onCancel(){
      //不取消订单
    },
    onConfirm(){
       let that=this;
       that.httpAjax({
        method: api.vip.orderCancel,
        data: {
          "tml_num_id": this.order_num_id,
        }
      }).then(function(res){
        console.log(res)
      }).catch(function(error){
        console.log(error); 
      })
    },
   getOrderListData(status) { //获取订单数据
      const pageSize = 8;     
      let that = this;
      this.httpAjax({
        method: api.vip.myOrderList,
        data: {
              "ec_shop_num_id": 202,
              "client_type": 1,
              "page":that.pageIndex,
              "page_size": pageSize,
              "order_status": status||0,
              'access_token':JSON.parse(localStorage.getItem('access_token'))
          },
      }).then(function(res){
            if(res.code==0&&res.orders.length>0){
                  that.hasOrderlist=true;
                  var getedDatas = res.orders;
                  const tpages = res.total_count;
                  const pages = getedDatas.length/8;
                  var isInt=tpages/(that.pageIndex*8);
                  that.loadmore = (pages==1&&isInt!=1) ? true : false;
                  if(that.pageIndex>1){
                    that.orderList = that.orderList.concat(getedDatas);
                  }else{
                    that.orderList = getedDatas;
                  } 
                  that.$nextTick(() => {
                      that.$refs.scrollerBottom.reset();
                   })
              }else{
                 that.hasOrderlist=false;
              }
        }).catch(function(error){
          that.hasOrderlist=false;
          console.log(error); 
        })
    },
       //调用取消订单接口
    orderCancel(args){
      this.showModel=true;
      this.order_num_id=args.order_num_id;
    },
    payMoney(arg){ //支付
      console.log(arg)
    },
    toOrderDetail(arg){
      let order_num_id=arg.order_num_id;
      this.$router.push({path:'/orderdetail',query:{orderId:order_num_id}})
    }
  }
}
</script>
<style lang="less" scoped>
.orderlist{
      height: 100%;
      background: #f3f4f6;
    .all-list{
        background: #f3f4f6;
        .list-header{
            height: 88px;
            line-height: 88px;
            color: #999999;
            font-size: 24px;
            text-align: center;
            ul{
                display: flex;
                li{
                    flex:1;
                    &.selected{
                        color: #208656;
                        span{
                            border-bottom: 2px solid #208656;
                        }
                    }
                    span{
                        display: inline-block;
                        height: 100%;
                    }
                }
            }
        }
        .list-content{
            margin-top: 24px;
            .order-detail{
                margin-bottom: 24px;
                background: #ffffff;
                .order-nub{
                    padding: 0 28px 0 32px;
                    font-size: 24px;
                    color: #666666;
                    height: 90px;
                    line-height: 90px;
                }
                .goods-total{
                    display: flex;
                    font-size: 24px;
                    color: #999999;
                    padding: 0 22px 28px 28px;
                    border-bottom: 1px solid #efefef;
                    .goods-img{
                        flex: 3;
                        height:90px;
                        overflow:hidden;
                        img{
                            width: 90px;
                            height: 90px;
                            display: inline-block;
                            margin-right: 14px;
                            &:last-child{
                                margin-right: 0;
                            }
                        }
                    }
                    .goods-nub{
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                    }
                }
                .order-operate{
                    padding: 0 22px 0 32px;
                    height: 82px;
                    line-height: 82px;
                    font-size: 20px;
                    color: #999999;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                      .dTime{
                        flex:2
                      }
                    .operate-btn{
                        flex:3;
                        text-align: right;
                        .cancelBtn{
                          width:140px;
                          height: 44px;
                          line-height: 44px;
                          text-align: center;
                          border-radius: 44px;
                          border:1px solid #c0c0c0;
                          display: inline-block;
                        }
                        .toPayMoney{
                          width:140px;
                          height: 44px;
                          line-height: 44px;
                          background:rgba(255,255,255,1);
                          border:1px solid rgba(31,148,89,1);
                          border-radius:44px;
                          text-align: center;
                          display: inline-block;
                          margin-left:10px;
                        }
                    }
                }
            }
        }

    }

    .none-orderlist{
        img{
            width: 268px;
            height: 268px;
            display: block;
            margin:0 auto;
            margin-top: 250px;
            margin-bottom: 56px;
        }
        text-align: center;
        color: #999999;
        font-size: 24px;
    }
}
</style>


