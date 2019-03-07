<template>
 	<div class="page checkout-page">
    <Header title="填写订单"></Header>
    <div class="checkout-container">
      <div class="flex-between address-container">
        <!-- 有收货地址 -->
        <div class="addr-main" v-if="memberAddr">
          <!-- 用户信息 -->
          <div class="user-info">
            <span class="user-name">{{memberAddr.cont_empe}}</span>
            <span class="user-phone">{{memberAddr.contact_no}}</span>
          </div>
          <!-- 地址信息 -->
          <div class="addr-detail">
            {{memberAddr.prv_name}} {{memberAddr.city_name}} {{memberAddr.city_area_name}} {{memberAddr.adr}}
          </div>
        </div>
        <div @click="innerDiv(4)">
          <img class="addr-arrow" src="../assets/icons/ArrowGrayR.png" />
        </div>
        <!-- 无收货地址 -->
        <!-- <div v-else class="addr-main text-green">
          无收货地址
        </div> -->
      </div>
      <div class="border no-padding">
        <img src="../assets/images/border.png" />
      </div>
      <div class="choose-delivery">
        <div class="flex-between delivery-title">
          <div class="light-gray title-name">
            选择配送方式
          </div>
          <div class="title-method">
            <label for="input" class="radio-label" v-for="(item,index) in deliveryList" :key="index" @click="radioChange(item.name)">
              <input class="input-default"  name="radio" type="radio" v-model="item.name" :checked="item.checked"/>
              <img v-if="item.checked" class="img-inline radio-icon" src="../assets/icons/radioActive.png"/>
              <img v-else class="img-inline radio-icon" src="../assets/icons/radioDefault.png" />
              {{item.name}}
            </label>
          </div>
        </div>
      </div>
      <div v-if="isSelfPick" class="self-pick">
        <div class="pick-shop text-gray">自提门店：龙湖千百惠店</div>
        <div class="pick-detail">重庆市沙坪坝区大学城北路50号龙湖千百惠</div>
      </div>
      <!-- <repeat for="{{proItem}}"  index="deliverIndex" item="item" key="deliverIndex"> -->
        <div v-if="proItem.length" class="delivery-item">
          <div class="flex-between time-container">
            <div class="com-title time-title">
              送达时间
            </div>
            <!-- 订单被拆分成多个状态 -->
            <!-- <div class='more-detail com-delivery-time' @click="showTimePicker(item,index)">
              <span class="text-green">{{item.day}} {{item.time}}</span>
              <img class="img-inline more-icon" src="../assets/icons/more_detail.png"/>
            </div> -->
            <!-- 只有一个订单时 -->
            <div class='more-detail com-delivery-time' @click="showTimePicker">
              <!-- <span class="text-green">{{item.day}} {{item.time}}</span> -->
              <img class="img-inline more-icon" src="../assets/icons/more_detail.png"/>
            </div>
          </div>
          <div class="flex pro-container">
            <div class="pro-detail">
              <div class="pro-img" v-for="(pro,index) in proItem" :key="index">
                <!-- <a href="goodsDetail?style_num_id={{pro.style_num_id}}"> -->
                  <img class="img-inline pro-img" :src="pro.src" />
                <!-- </a> -->
              </div>
            </div>
            <div class="all-pro" @click="goToPage('orderDetail')">
              <span>共{{totalCount}}件商品</span>
              <img class="img-inline arrow-right" src="../assets/icons/ArrowGrayR.png"/>
            </div>
          </div>
          <div class="flex note-container">
            <span class="note-label">备注</span>
            <input type="text" v-model="remark" class="input" maxlength="10" placeholder="我们将尽力满足您的要求" />
          </div>
        </div>
      <!-- </repeat> -->
      <div class="flex-between invoice-container">
        <div class="com-title invoice-title light-gray">
          电子发票
        </div>
        <div class="more-detail invoice-detail" @click="innerDiv(2)">
          不需要
          <img class="img-inline more-icon" src="../assets/icons/more_detail.png"/>
        </div>
      </div>
      <div class="flex-between coupon-container">
        <div class="com-title coupon-title light-gray">
          优惠券选择
        </div>
        <div class="more-detail coupon-detail" @click="innerDiv(3)">
          不需要
          <img class="img-inline more-icon" src="../assets/icons/more_detail.png"/>
        </div>
      </div>
      <div class="total-container">
        <div class="flex-between total-amount">
          <div class="com-title amount-title light-gray">
            商品金额
          </div>
          <div class="more-detail total-amount">
            {{totalFee.all_fee}}
          </div>
        </div>
        <div class="flex-between  total-fee">
          <div class="com-title fee-title light-gray">
            配送运费
            <img class="img-inline fee-help" src="../assets/icons/help.png" @click="closeFeeModal"/>
          </div>
          <div class="more-detail deliver-fee light-gray">
            {{totalFee.ist_amount}}
          </div>
        </div>
      </div>
      <div class="flex-between check-bar no-padding">
        <div class="pay-amount text-green">
          <span class="pay-text">应付：</span>
          <span class="price-symbol">￥</span>
          {{totalFee.all_payment}}
        </div>
        <div class="summit-order com-btn" @click="submitOrder">
          提交订单
        </div>
      </div>
    </div>
    <!-- 选择配送时间 -->
    <div class="shadow picker-shadow" v-if="isShowTimePicker" @click.stop="outDiv(1)">
      <div class="shadow-container picker-container" @click.stop="innerDiv(1)">
        <div class="shadow-header picker-title">自提时间</div>
        <div class="flex picker-time-container">
          <div class="picker-day">
            <div v-for="(pickDay,index) in pickerDay" :key="index">
              <div :class="['picker-item day-item',pickDay.active ? 'active' : '']" @click="dayChange(index)">
                {{pickDay.day}}
              </div>
            </div>
          </div>
          <div class="picker-time">
            <div v-for="(pickTime,index) in pickerTime" :key="index">
              <div :class="['flex-between picker-item time-item', pickTime.active ? 'active' : '']" @click.stop="timeChange(index)">
                <div>{{pickTime.time}}</div>
                <div><img v-if="pickTime.active" class="img-inline selected-img" src="../assets/icons/selected.png" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 运费说明modal -->
    <div class="deliver-fee-desc">
      <confirm
      v-model="isShowFeeDesc"
      :show-cancel-button="false"
      title="运费说明"
      @on-confirm="closeFeeModal">
        <p style="text-align:center;">我是运费我是运费</p>
      </confirm>
    </div>
    <!-- 填写发票 -->
    <div class="shadow" v-if="isShowInvoice" @click.stop="outDiv(2)">
      <div class="shadow-container invoice-shadow">
        <div class="shadow-header text-gray" @click.stop="innerDiv(2)">
          发票信息
        </div>
        <div class="fixed invoice-content" @click.stop="innerDiv(2)">
          <div class="flex-between invoice-line">
            <div class="line-title">需要电子发票</div>
            <div class="line-detail">
              <group>
                <x-switch title="" v-model="switchVal" @on-change="switchChange"></x-switch>
              </group>
            </div>
          </div>
          <div class="flex invoice-line">
            <div class="line-title">发票抬头</div>
            <div class="line-detail">
              <div v-for="(invoice,index) in invoiceTitle"  :key="index" :class="['invoice-title', invoice.isActive ? 'active' : '']" @click="changeInvoiceTitle(index)">
                {{invoice.name}}
              </div>
            </div>
          </div>
          <div class="flex invoice-line">
            <div class="line-title">发票内容</div>
            <div class="line-detail text-black">
              商品明细
            </div>
          </div> 
          <div v-if="invoiceTitle[1].isActive" class="flex invoice-line">
            <div class="line-title">公司名称</div>
            <div class="line-detail">
              <input type="text" v-model="companyName" maxlength="" placeholder="请填写" @onblur="getInvoiceVal(1)"/>
            </div>
          </div>
          <div v-if="invoiceTitle[1].isActive" class="flex invoice-line">
            <div class="line-title">纳税人识别号</div>
            <div class="line-detail">
              <input type="text" v-model="companyTin" maxlength="" placeholder="请填写" @onblur="getInvoiceVal(2)"/>
            </div>
          </div>
          <div class="flex invoice-line">
            <div class="line-title">发票人邮箱</div>
            <div class="line-detail">
              <input type="text" v-model="email" maxlength="" placeholder="请填写" @onblur="getInvoiceVal(3)"/>
            </div>
          </div>
        </div>
        <div class="shadow-footer" @click.stop="innerDiv(2)">
          <div class="save-invoice-btn text-white" @click="saveInvoice">
            保存发票信息
          </div>
        </div>
      </div>
    </div>
    <!-- 选择优惠券modal -->
    <div class="shadow" v-if="isShowCoupon" @click.stop="outDiv(3)">
      <div class="shadow-container coupon-shadow" @click.stop="innerDiv(3)">
        <div class="shadow-header text-gray">
          优惠券
        </div>
        <div class="coupon-content">
          <myCoupon hideHeader='true' hideFooter="true" ref="coupon"></myCoupon>
        </div>
      </div>
    </div>
    <!-- 选择收货地址 -->
    <div class="shadow" v-if="isShowAddr" @click.stop="outDiv(4)">
      <div class="shadow-container addr-shadow" @click.stop="innerDiv(4)">
        <div class="shadow-header text-gray">
          选择地址
        </div>
        <div class="addr-content">
          <myAddr hideHeader='true' ref="chooseAddr"></myAddr>
        </div>
      </div>
    </div>
    <!-- 选择支付方式 -->
    <div class="shadow" v-if="isShowPayMethod" @click.stop="outDiv(5)">
      <div class="shadow-container pay-shadow" @click.stop="innerDiv(5)">
        <div class="shadow-header text-gray">
          选择支付方式
        </div>
        <div class="addr-content">
          <div v-for="(pay,index) in payMethodList" :key="index" @click.stop="choosePayMethod(pay.payTypeId)">
            {{pay.payTitle}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./common/header";
import api from '../units/config';
import Request from "../units/request";
import checkOutData from "../mock/checkout";
import { XSwitch,Group,Confirm } from 'vux';
import myCoupon from './myCoupons';
import myAddr from './address'

// data
export default {
  name: 'checkout',
  components: {
    Header,
    myCoupon,
    myAddr,
    XSwitch,
    Group,
    Confirm
  },
  data () {
    return {
      usrNumId: 15896705091,
      ecShopNumId: 202,
      accessToken: '1e189ad7c046499b9e32cdccae3af421',
      adrNumId: 14658044,
      appOperationSequenceNumber: "1808310040016999",
      empNumId: 1805230010000,
      gift: [],
      integral: null,
      tranTypeNumId: 3, //发货类型
      invoiceSign: 3, //发票类型
      payTypeId: 7, //支付方式 6:支付宝 7.微信
      memberAddr: null,
      deliveryList: [{
        name: '配送上门',
        checked: false
      },{
        name:'预约自提',
        checked: true
      }],
      proItem: [],
      pickerDay: [{
        day:'08-16',
        active: false,
      },{
        day: '08-17',
        active: false,
      }],
      pickerTime: [{
        time: '预约自提',
        active: false,
      },{
        time: '11:30-12:00',
        active: false,
      },{
        time: '12:00-12:30',
        active: false,
      },{
        time: '12:30-13:00',
        active: false,
      },{
        time: '13:00-13:30',
        active: false
      }],
      invoiceTitle: [{
        name: "个人",
        isActive: true,
      },{
        name: "公司",
        isActive: false
      }],
      isShowTimePicker: false,
      isSelfPick: false,
      isShowFeeDesc: false,
      totalFee: {},
      totalCount: 0,  //共计多少件商品
      isNeedInvoice: false,
      isShowInvoice: false, //是否显示发票弹出框
      activeInvoiceIndex: 0,
      email: '',
      companyName: '',
      companyTin: '',
      remark: '',
      ticketId: [],
      switchVal: true,
      isShowCoupon: false,
      isShowAddr: false,
      isShowPayMethod: false,
      payMethodList: [],
    }
  },
  watch: {

  },
  methods:{
    // 公用提示
    comToast: function(msg,position) {
		  this.$vux.toast.text(msg, position ? position : 'middle');
		},
    goToPage: function (page) {
      var url;
      var query = null;
      if (page == 'myCoupons') {
        //跳转选择优惠券，传参（页面名称，优惠券id）
        if(this.ticketId.length){
          query = {
            pageName: 'checkout',
            ticketId: this.ticketId,
          }
        } else {
          query = {
            pageName: 'checkout',
          }
        }
      } else if(page == 'address'){
        // wx.navigateTo({
        //   url: page + '?pageName=checkOut'
        // })
      }else{
        url = page;
      };
      this.$router.push({
        path: page,
        query: query
      })
    },
    // 选择配送时间事件
    showTimePicker: function (val,index) {
      for(var i=0;i<this.pickerDay.length;i++){
        if(val.day == this.pickerDay[i].day) {
          this.pickerDay[i].active = true;
        } else {
          this.pickerDay[i].active = false;
        }
      }
      for(var i=0;i<this.pickerTime.length;i++){
        if(val.time == this.pickerTime[i].time) {
          this.pickerTime[i].active = true;
        } else {
          this.pickerTime[i].active = false;
        }
      }
      this.isShowTimePicker = !this.isShowTimePicker;
    },
    dayChange: function (index) {
      for(var i=0;i<this.pickerDay.length;i++){
        if(i == index) {
          this.pickerDay[i].active = true;
        } else {
          this.pickerDay[i].active = false;
        }
      }
    },
    timeChange: function (index) {
      for(var i=0;i<this.pickerTime.length;i++){
        if(i == index) {
          this.pickerTime[i].active = true;
        } else {
          this.pickerTime[i].active = false;
        }
      }
      this.isShowTimePicker = false;
    },
    // radio切换事件
    radioChange: function (val) {
      for(var i=0;i<this.deliveryList.length;i++){
        if(this.deliveryList[i].name == val) {
          this.deliveryList[i].checked = true;
          if (val == "预约自提") {
            this.isSelfPick = true;
          } else {
            this.isSelfPick = false;
          }
        } else {
          this.deliveryList[i].checked = false;
        }
      }
    },
    // 关闭运费说明modal
    closeFeeModal: function () {
      this.isShowFeeDesc = !this.isShowFeeDesc;
    },
    //点击遮罩关闭发票选择
    outDiv: function (val) {
      if(val == 1){
        this.isShowTimePicker = false;
      } else if(val == 2) {
        this.isShowInvoice = false;
      } else if(val == 3){
        this.isShowCoupon = false;
      } else if(val == 4){
        this.isShowAddr = false;
      } else if(val == 5){
        this.isShowPayMethod = false;
      }else {
        return
      }
    },
    // 点击时间选择器框内不关闭选择器
    innerDiv: function (val) {
      if(val == 1){
        this.isShowTimePicker = true;
      } else if(val == 2) {
        this.isShowInvoice = true;
      } else if(val == 3){
        this.isShowCoupon = true;
      } else if(val == 4){
        this.isShowAddr = true;
      } else if(val == 5){
        this.isShowPayMethod = true;
      } else {
        return
      }
    },
    // 是否需要发票
    switchChange: function (value) {
      this.switchVal = value;
    },
    // 选择发票抬头
    changeInvoiceTitle: function (index){
      for (var i = 0; i < this.invoiceTitle.length; i++) {
        this.invoiceTitle[i].isActive = false;
      }
      this.invoiceTitle[index].isActive = true;
      this.activeInvoiceIndex = index;
    },
    getInvoiceVal: function(num,e){
      if(num == 1) {
        this.companyName = e.detail.value;
        if(!this.companyName){
          this.comToast("请输入公司名称")
        }
      } else if (num == 2) {
        this.companyTin = e.detail.value;
        if(this.companyTin){
          if(!this.validateTax(this.companyTin)){
            this.comToast("纳税人识别号输入不正确")
          } 
        }else {
          this.comToast("请输入纳税人识别号")
        }
      } else {
        this.email = e.detail.value;
        if(this.email){
          if(!this.validateEmail(this.email)){
            this.comToast("邮箱输入不正确")
          } 
        }else {
          this.comToast("请输入邮箱")
        }
      }
    },
    saveInvoice: function () {
      if(this.activeInvoiceIndex == 0){
        if(this.email){
          if(!this.validateEmail(this.email)){
            this.comToast("邮箱输入不正确");
            return false;
          }
        }else {
          this.comToast("请输入邮箱");
          return false;
        }
      } else {
        if(!this.companyName){
          this.comToast("请输入公司名称");
          return false;
        }
        if(this.companyTin){
          if(!this.validateTax(this.companyTin)){
            this.comToast("纳税人识别号输入不正确");
            return false;
          } 
        }else {
          this.comToast("请输入纳税人识别号");
          return false;
        }
        if(this.email){
          if(!this.validateEmail(this.email)){
            this.comToast("邮箱输入不正确");
            return false;
          } 
        }else {
          this.comToast("请输入邮箱");
          return false;
        }
      }
      this.isShowInvoice = false;
    },
    validateEmail: function(email){
      var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');       
      var isEmailValid = reg.test(email); 
      return isEmailValid;
    },
    validateTax: function(tax){
      var reg = new RegExp('^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$');
      var isTaxValid = reg.test(tax);
      return isTaxValid; 
    },
    // 初始页面渲染
    getInitList: function(){
      var this_ = this;
      Request.query({
        method: api.checkout.getCheckOutList,
        data:{
         // "usr_num_id": this_.usrNumId,
          "ec_shop_num_id": this_.ecShopNumId,
          "adr_num_id": this_.adrNumId,
          "app_operation_sequence_number": this_.appOperationSequenceNumber,
          //"emp_num_id": this_.empNumId,
          "gift": this_.gift,
          "access_token": this_.accessToken,
        },
        success:function(res){
          // wx.hideLoading();
          if(res.data.code == 0) {
            this_.memberAddr = res.data.member_adr;
            this_.totalFee = res.data.total;
            if(res.data.shop_cart_item && res.data.shop_cart_item.cartitemlist && res.data.shop_cart_item.cartitemlist.length) {
              this_.proItem = res.data.shop_cart_item.cartitemlist.length > 3 ? res.data.shop_cart_item.cartitemlist.slice(0,3) : res.data.shop_cart_item.cartitemlist;
              for (var i = 0; i < res.data.shop_cart_item.cartitemlist.length; i++) {
                this_.totalCount += res.data.shop_cart_item.cartitemlist[i].quantity;
              }
            }
            this.isNeedInvoice = res.data.invoice ? true : false;
          } else {
            this_.comToast(res.data.message)
          }
        },
        error: function(res){
          console.log(res); 
        }
      })
    },
    // 提交订单请求
    submitOrder: function(){
      var this_ = this;
      var mainInvoice = null;
      if(this_.isNeedInvoice){
        mainInvoice = {
          "invoice_title": this_.activeInvoiceIndex == 0 ? "个人" : "公司",
          "consumer_invoice_tax_code": this_.activeInvoiceIndex == 0 ? null : this_.companyTin,
          "regis_adr": null,
          "regis_tel": null,
          "regis_bank": null,
          "bank_account": null
        }
      }
      Request.query({
        method: api.checkout.submitOrder,
        data:{
          //"usr_num_id": this_.userNumId,
          //"emp_num_id": this_.empNumId,
          "integral": this_.integral,
          "ec_shop_num_id": this_.ecShopNumId,
          "adr_num_id": this_.adrNumId,
          "tran_type_num_id": this_.tranTypeNumId,   //发货类型
          "invoice_sign": this_.invoiceSign,  //发票类型
          "invoice_main": mainInvoice,
          "remark": this_.remark,
          "pay_type_id": this_.payTypeId,
          "ticket_id": this_.ticketId,
          "access_token": this_.accessToken,
        },
        success:function(res){
          console.log(res)
          if(res.data.code == 0) {
            // 下单成功之后，调用获取门店支付方式接口
            this_.prePayRequest(res.data.tml_num_id);
          } else {
            this_.comToast(res.data.message);
          }
        },
        error: function(res){
          console.log(res); 
        }
      })
    },
    // 获取当前门店可用支付方式
    getValidPayMethod: function(){
      var this_ = this;
      Request.query({
        method: api.checkout.getValidPayMethod,
        data:{
          "ec_shop_num_id": this_.ecShopNumId,
          "access_token": this_.accessToken
        },
        success:function(res){
          if(res.data.code == 0){
            if(res.data.pay_type_info_list && res.data.pay_type_info_list.length){
              this_.payMethodList = res.data.pay_type_info_list;
              this_.isShowPayMethod = true;
            }
          }
        },
        error:function(err){
            console.log(err)
        }
      })
    },
    // 选择支付方式
    choosePayMethod: function(val){
      this_.payTypeId = val;
      this_.prePayRequest();
    },
    // 预支付接口
    prePayRequest: function(val){
      var this_ = this;
      Request.query({
        method: api.checkout.prePay,
        data:{
          "out_trade_no": val,
          "plat_type": this_.payTypeId,
          "body": "提交预支付",
          'access_token': this_.accessToken
        },
        success:function(res){
          if(res.data){
            this_.payRequest(res.data)
          }
        },
        error:function(err){
            console.log(err)
        }
      })
    },
    // 请求支付接口
    payRequest: function(val){
      var this_ = this;
      let data = JSON.parse(val.pre_pay_no);
      // wx.requestPayment({
      //   'timeStamp': data.timestamp,
      //   'nonceStr': data.noncestr,
      //   'package': 'prepay_id='+ data.prepayid,
      //   'signType': 'MD5',
      //   'paySign': val.sign,
      //   'success': function(res){
      //     this_.comToast('支付成功')
      //   },
      //   'fail': function(res){
      //     this_.comToast('支付失败')
      //   },
      //   'complete': function(res){
      //     var msg = 'requestPayment:cancel';
      //     if(res.data.errMsg = msg){
      //       wx.showModal({
      //         title: '支付详情',
      //         content: '您已取消支付，记得一会过来继续支付哦~',
      //         showCancel: false,
      //         success: function(res) {
      //           wx.navigateTo({
      //             url: 'orderDetail'
      //           })
      //         }
      //       })
      //     }
      //   }
      // })
    }
  },
  mounted(){
    this.$store.dispatch('footerStatus/hideFooter');
    //  wx.showLoading({mask: true});
    // 获取序列号，门店id，地址id
    // var queryData = this.$router.query;
    // this.appOperationSequenceNumber = queryData.appOperationSequenceNumber ? queryData.appOperationSequenceNumber : null;
    // this.ecShopNumId = queryData.shopId ? queryData.shopId : null;
    // this.adrNumId = queryData.adrNumId ? queryData.adrNumId : null;
    for(var i=0;i<this.deliveryList.length;i++){
      if(this.deliveryList[i].name == "预约自提" && this.deliveryList[i].checked == true) {
        this.isSelfPick = true;
      } else {
        this.isSelfPick = false;
      }
    }
    console.log(checkOutData)
    this.memberAddr = checkOutData.member_adr;
    this.totalFee = checkOutData.total;
    console.log(this.totalFee)
    this.proItem = checkOutData.shop_cart_item.cartitemlist.length > 3 ? checkOutData.shop_cart_item.cartitemlist.slice(0,3) : checkOutData.shop_cart_item.cartitemlist;
    // for (var i = 0; i < checkOutData.shop_cart_item.cartitemlist.length; i++) {
    //   this.totalCount += checkOutData.shop_cart_item.cartitemlist[i].quantity;
    // }
    console.log(this.proItem)
    // this.getInitList();
  },
  deactivated(){
    this.$destroy();
  }
}
   
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../assets/css/checkout";
  h1, h2 {
    font-weight: normal;
  }
</style>

 


