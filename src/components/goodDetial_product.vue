<template>
  <div class="all" @scroll="scrollTop">
    <div class="swiperImg" @touchstart.stop @touchmove.stop @touchend.stop>
      <mt-swipe :auto="0">
        <mt-swipe-item v-for="(item,index) in good.style.list_image.split(',')" :key="index">
          <img class="swiperItemImg" :src="item"/>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="info-box">
      <!--标题-->
      <div class="goods-info">
        <div class="info-left">
          <div class="goods-name">{{good.style.title}}</div>
          <div class="goods-title">{{good.style.sub_title}}</div>
        </div>
        <div class="info-right">
          <img src="../assets/icons/icon_share@2x.png" class="share-icon"/>
        </div>
      </div>
      <!--价格-->
      <div class="ub ub-ac goods-price mar_t10">
        <div class="label_M">商城价：</div>
        <div class="greenUnit">￥</div>
        <div class="greenPrice">{{good.style.price}}</div>
        <div class="originPrice">￥{{good.style.mkt_price}}</div>
      </div>
      <!--会员价-->
      <div class="ub ub-ac goods-price">
        <div class="label_M">会员价：</div>
        <div class="greenUnit">￥</div>
        <div class="greenPrice">{{good.style.price}}</div>
      </div>
      <!--配送-->
      <div class="message">
        现在下单，最快今日18:00前送达,运费￥8
      </div>
    </div>
    <div class="fill"></div>
    <div class="detail">
      <div class="goods-detial ub-pj pad10">
        <div class="mar_r10">产地：上海松江区</div>
        <div class="mar_r10">规格：HT-UTC</div>
        <div class="mar_r10">保质期：180天</div>
      </div>
      <!--选择商品属性-->
      <div class="goods-detial ub-pj pad10" v-if="this.good.style.spec.default_prop_id && this.good.style.spec.specs" @click="selectProductDetial">
        <div class="pad_r10 product_title">已选</div>
        <div class="ub ub-f1 product_des">
          <div space="ensp" v-for="(item,index) in good.style.spec.specs.specs" :key="index">{{item.spec_values?item.spec_values[popTypeActive[index]].spec_value:''}}</div>
          ，{{popCount}}件
        </div>
        <img src="../assets/icons/more@2x.png" class="more-icon"/>
      </div>

      <div class="goods-detial ub-pj pad10">
        <div class="ub-f1 pad_r10 product_title">领取优惠券</div>
        <img src="../assets/icons/more@2x.png" class="more-icon"/>
      </div>
      <div class="goods-coupon ub-pj pad10">
        促销
      </div>
      <div class="ub ub-pc ubb pad30">
        <div class="ub ub-ac product_coupon">
          <div class="ub ub-ac ub-f1 coupon_msg">
            买就送曼秀雷敦润肤剂试用装 ,购买2件以上，总价立减10元
          </div>
          <img src="../assets/icons/arrow_right_grey@2x.png" class="arrow_right"/>
        </div>
      </div>
      <div class="fill"></div>
      <!--推荐商品-->
      <div class="recommend">
        <div class="tit">推荐商品</div>
        <div class="ub_wrap" style="width: 100%;">
          <!--推荐商品列表-->
          <div class="ub ub-ver item" v-for="(item,index) in recommendList" :key="index" v-if="item.everyone_style" @click="openGoodDetail(item)">
            <img :src="item.everyone_style.image_default_id" class="recommend-icon"/>
            <div class="recommend_tittle">
              {{item.everyone_style.title}}
            </div>
            <div class="ub ub-ac recommend_bottom">
              <div class="ub-f1 goods-price">
                <div class="greenUnit">￥</div>
                <div class="greenPrice">{{item.everyone_style.price}}</div>
              </div>
              <img src="../assets/icons/icon_add@2x.png" class="add-icon" @click="addCartByTuiJian(item)"/>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import  { ToastPlugin } from 'vux'
  Vue.use(ToastPlugin)

  export default {
    name: "",

    data() {
      return {
        swiperImgList: [{
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
          title: '送你一朵fua '
        }, {
          url: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          title: '送你一辆车'
        }, {
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          title: '送你一辆车'
        }],
        sindex: 1,
        showAnimationImg: '',
        perchesNum: 0,
        good: {
          "code": 0,
          "message": "成功",
          "full_message": null,
          "free_conf": "",
          "promotion_tag": [],
          "packages": "",
          "style": {
            "style_num_id": 190087,
            "ec_style_num_id": 190087,
            "shop_num_id": 202,
            "cat_id": 406,
            "cat1_id": null,
            "brand_id": 64,
            "title": "",
            "sub_title": "",
            "bn": "E0651",
            "price": '',
            "cost_price": '',
            "mkt_price": '',
            "show_mkt_price": 0,
            "weight": 0,
            "unit": "件",
            "image_default_id": "",
            "list_image": "",
            "order_sort": 0,
            "has_discount": 0,
            "is_virtual": 0,
            "is_timing": 0,
            "violation": 0,
            "is_selfshop": 0,
            "spec_desc": "",
            "nospec": "0",
            "props_name": null,
            "params": "",
            "outer_id": null,
            "is_offline": 0,
            "barcode": null,
            "use_platform": "0",
            "dlytmpl_id": 0,
            "approve_status": "onsale",
            "sold_quantity": 0,
            "rate_count": 0,
            "rate_good_count": 0,
            "rate_neutral_count": 0,
            "rate_bad_count": 0,
            "view_count": 0,
            "buy_count": 0,
            "aftersales_month_count": 0,
            "tenant_num_id": 6,
            "data_sign": 1,
            "is_hot": 0,
            "is_new": 0,
            "is_recommend": 0,
            "nature_props": [],
            "default_item_num_id": '',
            "spec": {
              "spec_item": {
              },
              "specs": {
                "specs": []
              },
              "sort": "",
              "default_prop_id": ""
            },
            "promotion": []
          }
        },
        recommendList: [],
        spec_item: [],
        specs: [],
        otherSpec: [],
        ec_style_num_id: '',
        wap_desc: '',
        dotsActive: 0,
        popCount: 1,
        popTypeActive: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        showAnimation: false,
        animation: {},
        animationData: {}
      }
    },
    mounted() {
      //渲染加载完毕
      // this.start();
    },
    computed: {
      getCalcPrice() {
        if (this.good.style.spec.spec_item && this.good.style.spec.spec_item[this.good.style.spec.default_prop_id]) {
          return this.good.style.spec.spec_item[this.good.style.spec.default_prop_id].price;
        } else {
          return '';
        }
      },
      getCalcId() {
        if (this.good.style.spec.spec_item && this.good.style.spec.spec_item[this.good.style.spec.default_prop_id]) {
          return this.good.style.spec.spec_item[this.good.style.spec.default_prop_id].ec_item_num_id;
        } else {
          return '';
        }
      }
    },
    methods: {
      init:function(style_num_id){
        this.getProductDetial(style_num_id).then(this.getRecommend());
      },
      demo01_onIndexChange: function () {

      },
      scrollTop: function (ev) {
        this.$emit('onScrollTop', ev.target.scrollTop);
      },

      //获取商品页面详细信息
      getProductDetial(style_num_id) {
        console.log(style_num_id)
        let p = new Promise((resolve, reject) => {
          this.$http.query({
            method: 'com.gb.soa.omp.cgoods.api.service.styledetailbystylenumid.get',
            data: {
              "style_num_id": style_num_id,
              "shop_id": 202,
              "usr_num_id": 99,
              "tenantNumId": 1,
              "dataSign": 1
            },
            success: (data) => {
              console.log('product',data);
              if (data.data.code == 0) {
                var style = data.data.style;
                this.good = data.data;
                this.$emit('onLoadOk',style.ec_style_num_id);

                //计算购物车当前商品数量
                // var state = store.getState();
                // if (state.cartProductList[style.style_num_id]) {
                //   var storeNum = state.cartProductList[style.style_num_id].num || 0;
                //   this.perchesNum = storeNum;
                // }
                resolve();
              }
            },
            error: (err) => {
              console.log(err);
            }
          })
        });
        return p;

      },
      getRecommend() {
        let p = new Promise((resolve, reject) => {
          this.$http.query({
            method: 'gb.cgoods.style.everyoneStyle',
            data: {
              "page": 1,
              "page_size": 5,
              "shop_id": 202
            },
            success: (data) => {
              if (data.data.code == 0) {
                this.recommendList = data.data.styles || [];
                // this.$apply();
              }
              resolve();
            },
            error: (err) => {
              console.log(err);
            }
          })
        });
        return p;
      },
      shareProduct() {

      },
      openGoodDetail(good) {
        // this.$router.push("/goodDetial")
        console.log(good.everyone_style.style_num_id)
        this.$router.push({ path: '/goodDetial', query: { style_num_id:  good.everyone_style.style_num_id}});
      },

      selectProductDetial(type) {
        if(this.good.style.spec.default_prop_id){
          var _this = this;
          console.log(this.good.style.spec)
          this.PopShowSelect(JSON.parse(JSON.stringify(this.good.style.spec)), function (id, type, num, img) {
            _this.good.style.spec.default_prop_id = id;
            _this.popTypeActive = type;
            _this.popCount = num;
            //加入购物车动画
            _this.CartFly(img);
            // 加入购物车接口
            _this.addCart();

          });
        }else{
          // 显示
          if(type=='add'){
            //加入购物车动画
            _this.CartFly(this.good.style.image_default_id);
            // 加入购物车接口
            _this.addCart();
          }else{
            this.$vux.toast.show({
              type:'text',
              text: '该商品没有可选择属性'
            })
          }
        }
      },
      //加入购物车操作操作
      addCart(origin, product) {
        //动态特效
        var usr_num_id = 1805230010001;
        var shop_id = 202;
        var item_num_id = this.good.style.spec.spec_item[this.good.style.spec.default_prop_id].item_num_id || this.good.style.default_item_num_id;
        var quantity = this.popCount;
        var emp_num_id = '';
        var access_token = '4cc96780be664cdc86761bf147652878';
        // var phone = wx.getStorageSync('phone');

        //接口中加入购物车
        this.$http.query({
          method: 'gb.mall.cart.item.add',
          data: {
            "message_series": null,
            "request_num_id": null,
            "check_repeat_sign": null,
            "expose_method": null,
            "usr_num_id": usr_num_id,
            "shop_id": shop_id,
            "item_num_id": item_num_id,
            "quantity": quantity,
            "package_sku_ids": null,
            "package_id": null,
            "obj_type": "item",
            "mode": "cart",
            "emp_num_id": emp_num_id,
            "access_token": access_token
          },
          success: (data) => {
            if(data.data.code==0){
            // store.dispatch({
            //   type: 'calcN',
            //   payload: {
            //     id: this.good.style.style_num_id,
            //     num: quantity
            //   }
            // });
            }
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      calc(num) {
        if (typeof(num) == 'object') {
          this.popCount = num.detail.value;
        } else {
          num = Number(num);
          if (this.popCount == 1 && num == -1) {
            return false;
          } else {
            this.popCount = Number(this.popCount) + num;
          }
        }
      },
      addCartByTuiJian(product) {
        // console.log(product)
        this.CartFly(product.everyone_style.image_default_id);
      }


    }


  }
</script>

<style scoped>
  /*新增样式*/
  .goods-price {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: rgba(153, 153, 153, 1);
  }

  .goods-detial {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: rgba(153, 153, 153, 1);
    border-bottom: 1px solid rgba(239, 239, 239, 1);
  }

  .goods-coupon {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: rgba(153, 153, 153, 1);
  }

  .goods-price .label_M {
    color: rgba(153, 153, 153, 1);
  }

  .goods-price .greenUnit {
    font-size:24px;
    font-family:PingFang-SC-Heavy;
    font-weight:800;
    color:rgba(32,134,86,1);
  }

  .goods-price .greenPrice {
    font-size:40px;
    font-family:PingFang-SC-Heavy;
    font-weight:800;
    color:rgba(32,134,86,1);
  }

  .goods-price .originPrice {
    color: rgba(153, 153, 153, 1);
    text-decoration: line-through;
  }

  .mar_t10 {
    margin-top: 10px;
  }

  .message {
    font-size: 24px;
    font-family: PingFang-SC-Medium;
    color: rgba(51, 51, 51, 1);
    line-height: 90px;
  }

  .fill {
    height: 15px;
    background-color: #eee;
  }

  .mar_r10 {
    margin-right: 10px;
  }

  .ub {
    display: -webkit-flex; /* Safari */
    display: flex;
    box-sizing: border-box;
  }

  .ub_wrap {
    display: -webkit-flex; /* Safari */
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
  }

  .ub-ver {
    flex-direction: column;
  }

  .ub-f1 {
    flex-grow: 1;
  }

  .ub-pj {
    justify-content: space-between
  }

  .ub-ac {
    align-items: center;
  }

  .ub-pc {
    justify-content: center;
  }

  .pad10 {
    padding: 30px;
  }

  .more-icon {
    width: 31px !important;
    height: 9px !important;
  }

  .product_title {
    font-size: 24px;
    color: rgba(153, 153, 153, 1);
  }

  .product_des {
    font-size: 24px;
    color: rgba(51, 51, 51, 1);
  }

  .pad_r10 {
    padding-right: 20px;
  }

  .product_coupon {
    width: 580px;
    height: 140px;
    padding: 30px;
    background: rgba(247, 247, 247, 1);
    border-radius: 10px;
  }

  .ubb {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .pad30 {
    padding-bottom: 30px;
  }

  .coupon_msg {
    font-size: 22px;
    color: rgba(51, 51, 51, 1);
  }

  .recommend {
    padding: 15px;
  }

  .recommend .tit {
    font-size: 32px;
    color: rgba(51, 51, 51, 1);
    padding: 15px;
  }

  .recommend_tittle {
    width: 212px;
    height: 60px;
    line-height: 30px;
    font-size: 24px;
    color: rgba(51, 51, 51, 1);
    margin-top: 10px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .recommend-icon {
    width: 300px !important;
    height: 300px !important;
  }

  .label_list .label {
    border: 1px solid #1F9459;
    width: 80px;
    height: 34px;
    background: rgba(255, 255, 255, 1);
    border-radius: 100px;
    font-size: 20px;
    font-family: PingFang-SC-Regular;
    color: rgba(32, 134, 86, 1);
    line-height: 34px;
    text-align: center;
    margin: 15px 0;
  }

  .add-icon {
    width: 50px !important;
    height: 50px !important;
  }

  .item {
    padding: 30px;
  }

  .arrow_right {
    width: 40px !important;
    height: 40px !important;
  }

  .bottom_bar {
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 98px;
    background: rgba(243, 244, 246, 1);
  }

  .bottom_addCar {
    width: 59px;
    height: 52px;
    margin-left: 30px;
  }

  .pad_l23 {
    padding-left: 23px;
  }

  .right_addCar {
    width: 247px;
    height: 98px;
    background: rgba(32, 134, 86, 1);
    font-size: 32px;
    font-family: PingFang-SC-Medium;
    color: rgba(255, 255, 255, 1);
  }

  .shareButton {
    border: none !important;
  }

  /*动画*/
  .popViewBox {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /*background-color: #f5f5f5;*/
    background-color: red;
    display: none;
  }

  .popContent {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 70%;
    background-color: white;
  }

  .show1 {
    display: block;
    animation: popshow1 300ms;
    animation-fill-mode: forwards;
  }

  @keyframes popshow1 {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .hide1 {
    display: block;
    animation: pophide1 300ms;
    animation-fill-mode: forwards;
  }

  @keyframes pophide1 {
    from {
      background-color: rgba(0, 0, 0, 0.5);
    }
    to {
      background-color: rgba(0, 0, 0, 0);
    }
  }

  .stop1 {
    top: 100%;
  }

  .show2 {
    animation: popshow2 300ms;
    animation-fill-mode: forwards;
  }

  @keyframes popshow2 {
    from {
      top: calc(100%);
    }
    to {
      top: calc(30%);
    }
  }

  .hide2 {
    animation: pophide2 300ms;
    animation-fill-mode: forwards;
  }

  @keyframes pophide2 {
    from {
      top: calc(30%);
      opacity: 1;
    }
    to {
      top: calc(100%);
      opacity: 0;
    }
  }

  .popHerder {
    width: 100%;
    /*height: 200rpx;*/
    padding: 40px;
    /*border-bottom: 1px solid rgba(0,0,0,0.1);*/
  }

  .uba {
    border: 1px solid;
  }

  .popImg {
    width: 120px;
    height: 120px;
  }

  .maxHeight {
    height: 100%;
  }

  .popName {
    font-size: 28px;
    color: rgba(32, 134, 86, 1);
    padding-top: 20px;
  }

  .popNumber {
    font-size: 24px;
    color: rgba(102, 102, 102, 1);
    padding-top: 20px;
  }

  .popClose {
    width: 36px;
    height: 36px;
    margin-top: -15px;
    margin-right: -15px;
  }

  .popClose2 {
    width: 36px;
    height: 36px;
  }

  .popTitle {
    height: 100px;
    font-size: 28px;
    color: rgba(102, 102, 102, 1);
  }

  .popType {
    width: 100%;
    flex-wrap: wrap;
    height: min-content;
  }

  .popTypeItem {
    height: 56px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 100px;
    padding: 0px 39px;
    color: rgba(51, 51, 51, 1);
    margin-right: 10px;
    margin-bottom: 20px;
    font-size: 24px;
  }

  .popActive {
    background: rgba(32, 134, 86, 1);
    color: white;
  }

  .popScroll {
    padding: 0 30px;
    overflow-y: auto;
  }

  .num-icon {
    width: 50px;
    height: 50px;
  }

  .input_num {
    width: 70px;
    border-right: none;
    text-align: center;
  }

  .popBot {
    height: 98px;
    width: 100%;
    background: rgba(32, 134, 86, 1);
    font-size: 32px;
    color: rgba(255, 255, 255, 1);
  }

  .wap_desc_class {
    display: block;
    width: 100%;
  }

  .wap_desc_class > img {
    width: 100%;
  }

  .badge {
    position: absolute;
    display: block;
    top: 8px;
    left: 62px;
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: red;
    color: #ffffff;
    border-radius: 50%;
    font-size: 24px;
  }

  .recommend_bottom {
    padding-top: 10px;
  }

  .detail {
    background: #fff;
  }

  .fill {
    height: 15px;
    background-color: #eee;
  }

  .message {
    font-size: 24px;
    font-family: PingFang-SC-Medium;
    color: rgba(51, 51, 51, 1);
    line-height: 90px;
  }

  .mar_t10 {
    margin-top: 10px;
  }

  .goods-price .label_M {
    color: rgba(153, 153, 153, 1);
  }


  .goods-price .originPrice {
    color: rgba(153, 153, 153, 1);
    text-decoration: line-through;
  }

  .goods-name {
    font-size: 28px;
    color: #333333;
  }

  .goods-title {
    font-size: 24px;
    color: #999999;
  }

  .info-left {
    display: flex;
    flex-direction: column;
  }

  .info-left > .goods-title {
    margin-top: 15px;
    font-size: 23px;
    color: #999;
  }

  .info-right {
    font-size: 23px;
    color: #2c2c2c;
  }

  .share-icon {
    width: 34px !important;
    height: 36px !important;
    display: block;
    margin-bottom: 5px;
  }

  .info-box {
    padding: 20px 30px;
    background: #fff;
  }

  .goods-info {
    display: flex;
    justify-content: space-between;
  }

  .maxH .vux-swiper {
    overflow: hidden;
    position: relative;
    height: 100% !important;
  }

  .swiperItem img {
    width: 100%;
    height: 100%;
  }

  .maxH {
    height: 100%;
  }

  .swiperImg {
    height: 623px;
  }

  .all {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
</style>
