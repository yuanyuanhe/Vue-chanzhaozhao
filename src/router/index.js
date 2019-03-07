import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import NearByStore from '@/components/nearByStore'
import Classify from '@/components/classify'
import Cart from '@/components/cart'
import Vip from '@/components/vip'
import Login from '@/components/common/login'
import Register from '@/components/common/register'
import ForgetPassword from '@/components/common/forgetPassword'
import GoodsDetail from '@/components/goodsDetail'
import OrderList from '@/components/orderList'
import OrderDetail from '@/components/orderDetail'
import Evaluation from '@/components/evaluation'
import myCoupons from '@/components/myCoupons'
import voucherCenter from '@/components/voucherCenter'
import membershipCard from '@/components/membershipCard'
import SearchGoods from '@/components/common/searchGoods'
import goodDetial from '@/components/goodDetial'
import goodDetailChatDetail from '@/components/goodDetial_chat_detail'
import activity from '@/components/activity'
import Address from '@/components/address'
import AddAddress from '@/components/addAddress'
import EditAddress from '@/components/editAddress'
import Suggestion from '@/components/suggestion'
import CheckOut from '@/components/checkOut'
import selectArea from '@/components/selectArea'
import vipDetail from '@/components/vipDetail'
import Setting from '@/components/setting'
import modifyPassword from '@/components/modifyPassword'
Vue.use(Router)
var router=new Router({
      routes: [
      // 重定向导航
      {path: '/',redirect: Index},
      {path: '/index', name: 'index', component: Index, meta: {title: '首页'}},
      {path: '/searchgoods', name: 'searchgoods', component: SearchGoods, meta: {title: '搜索'}},
      {path: '/nearByStore', name: 'nearByStore', component: NearByStore, meta: {title: '附近门店'}},
      {path: '/classify', name: 'classify', component: Classify, meta: {title: '商品分类'}},
      {path: '/goodsdetail', name: 'goodsdetail', component: GoodsDetail, meta: {title: '商品详情'}},
      {path: '/cart', name: 'cart', component: Cart, meta: {title: '购物车'}},
      {path: '/checkout', name: 'checkout', component: CheckOut, meta: {title: '填写订单'}},
      {path: '/vip', name: 'vip', component: Vip, meta: {title: '会员中心'}},
      {path: '/login', name: 'login', component: Login, meta: {title: '登录'}},
      {path: '/register', name: 'register', component: Register, meta: {title: '注册'}},
      {path: '/orderlist', name: 'orderlist', component: OrderList, meta: {title: '订单列表'}},
      {path: '/orderdetail', name: 'orderdetail', component: OrderDetail, meta: {title: '订单详情'}},
      {path: '/evaluation', name: 'evaluation', component: Evaluation, meta: {title: '发表评论'}},
      {path: '/forgetpassword', name: 'forgetpassword', component: ForgetPassword, meta: {title: '忘记密码'}},
      {path: '/myCoupons', name: 'myCoupons', component: myCoupons, meta: {title: '我的优惠券'}},
      {path: '/voucherCenter', name: 'voucherCenter', component: voucherCenter, meta: {title: '领券中心'}},
      {path: '/membershipCard', name: 'membershipCard', component: membershipCard, meta: {title: '会员卡主页'}},

      {path: '/goodDetial', name: 'goodDetial', component: goodDetial, meta: {title: '商品详情'}},
      {path: '/goodDetailChatDetail', name: 'goodDetailChatDetail', component: goodDetailChatDetail, meta: {title: '评论详情'}},
      {path: '/activity', name: 'activity', component: activity, meta: {title: '活动'}},
      {path: '/address', name: 'address', component: Address, meta: {title: '地址管理'}},
      {path: '/addAddress', name: 'addAddress', component: AddAddress, meta: {title: '新建地址'}},
      {path: '/editAddress', name: 'editAddress', component: EditAddress, meta: {title: '编辑地址'}},
      {path: '/suggestion', name: 'suggestion', component: Suggestion, meta: {title: '意见反馈'}},
      {path: '/selectArea', name: 'selectArea', component: selectArea, meta: {title: '所在城市'}},
      {path: '/vipDetail', name: 'vipDetail', component: vipDetail, meta: {title: '会员信息'}},
      {path: '/Setting', name: 'Setting', component: Setting, meta: {title: '设置'}},
      {path: '/modifyPassword', name: 'modifyPassword', component: modifyPassword, meta: {title: '修改密码'}},
      {path: '*', redirect: '/index'}
    ]
})

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if(to.meta.title) {
		document.title = to.meta.title
	};
	next()
})

export default router
