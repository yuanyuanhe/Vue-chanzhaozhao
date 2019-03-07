// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store/store'
import App from './App'
import axios from 'axios'
import Request from './units/request'
import Common from './units/common'
import 'lib-flexible/flexible'   // 使用px2rem
import HttpAjax from './units/ajax'
import ToastBox from './units/toast/toast'
import  { ToastPlugin, ConfirmPlugin } from 'vux'
import './assets/font-awesome-4.7.0/css/font-awesome.css'  //引入字体图标库,用法：<i class="fa fa-angle-left"></i>
//全局css
import 'mint-ui/lib/style.css';
import MintUI from 'mint-ui'
Vue.use(MintUI)
import { Style,Picker,createAPI,IndexList,BetterScroll,radioGroup,DatePicker } from 'cube-ui'
Vue.use(Picker)
Vue.use(IndexList)
Vue.use(radioGroup)
Vue.use(DatePicker)
createAPI(Vue, Picker, ['click','select','cancel','change'], true)
FastClick.attach(document.body)
Vue.use(ToastBox)

FastClick.attach(document.body)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false
Vue.prototype.$http= Request
Vue.prototype.httpAjax= HttpAjax
Vue.prototype.fetchData = axios

Vue.use(Common)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

//注册底部弹框组件
import PopShowSelect from './components/common/PopShowSelect.js'
Vue.use(PopShowSelect)
//注册图片飞行动画
import CartFly from './components/common/CartFly.js'
Vue.use(CartFly)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
