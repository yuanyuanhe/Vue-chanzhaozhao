// ENV
const hosts = 'https://wx.yiako.com/omp_cmanage/mallgateway';

// apis
const api = {
  common:{
    login:'gb.member.new.password.login',//登录
    phoneCode:'gb.member.new.sms.verify.code.get',//手机注册验证码
    register:'gb.member.new.regist.and.login'
  },
  myCoupons: {
    getCoupons: "card.app.counpons.usr.vouchers.find"   //获取所有优惠券接口
  },
  voucherCenter:{
    couponsList: "gb.scrm.couponrulecard.searchCouponruleList", //优惠券列表
    getCard: "gb.scrm.couponrulecardformmhservice.synchcouponfor", //领券
  },
  //会员卡主页相关接口
  membershipCard:{
    getMemberInfo: "gb.member.new.basic.info.get", //获取会员信息接口
  },
  vip:{
    myOrderList:'order.new.usr.order.list.query',//我的订单列表
    orderDetail:'order.new.usr.order.detail.get' ,//订单详情
    orderCancel:'order.new.unpay.app.order.cancel',//取消订单
    getAddress: 'gb.member.new.adr.list.get', //收货地址列表
    addressDetail:'gb.member.new.adr.info.get', //收货地址详情
    addAddress: 'gb.member.new.adr.add',  //新增收货地址
    modifyAddress:'gb.member.new.adr.modify',//修改收货地址
    deleteAddress: 'gb.member.new.adr.delete',  //删除收货地址
    province: 'gb.baseinfo.province.list.get',  //获取省
    city: 'gb.baseinfo.city.list.get',  //获取市
    cityarea: 'gb.baseinfo.cityarea.list.get',  //获取区
    integral: 'gb.member.new.integralat.point', //我的积分
    vipDetail: 'gb.member.new.basic.info.get',//会员用户信息
    modifyVip: 'gb.member.new.basic.info.modify',//编辑会员信息
    modifyPassword: 'gb.member.new.login.password.modify',//修改密码
  },
  //商品分类相关接口
  classify: {
    //显示店铺的销售分类信息
    getClassify:'com.gb.soa.omp.masterdata.api.service.EcSyscategoryCatService.get',
  },
  //展示商品列表组件的接口
  goodsList:{
  	//获取商品列表
  	getlist:'com.gb.soa.omp.cgoods.api.service.searchstyle',
    //查询已加入购物车商品明细
    shoppCart:'gb.mall.cart.item.get', 	
  },
  //首页接口
  index:{
    gettmplidList:'com.gb.soa.omp.cdecorate.api.service.ecsysshop.getTmplInstanceList',
    gettmpldetailList:'com.gb.soa.omp.decorate.service.impl.EcSysShopServiceImpl.getTmplInstanceDetails',
    getRecommendList:'com.gb.soa.omp.cgoods.api.service.searchstyle',
    addCart:'gb.mall.cart.item.add'
  },
  cart:{
    getShopIdByKeyword: 'https://wx.yiako.com/bbc-service/addressGaoDeService/getAddressDeliverableStatusBykeyword'
  },
  checkout:{
    getCheckOutList: 'gb.mall.order.settle',
    submitOrder: 'gb.mall.order.submit',
    getValidPayMethod: 'gb.baseinfo.paytypeinfo.by.ecshopnumid',
    prePay: 'gb.ccash.pay.submitPrePayment',
  },
}

export default api;
