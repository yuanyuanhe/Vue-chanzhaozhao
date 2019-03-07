<style type="text/css">
  .bottom_addCar {
    width: 59px;
    height: 52px;
    margin-left: 15px;
  }

  .ub {
    display: -webkit-flex; /* Safari */
    display: flex;
    box-sizing: border-box;
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

  .ub-con {
    width: 100%;
    height: 100%;
  }

  .tab_h {
    height: 6px;
    width: 64px;

  }

  .active_h {
    background: rgba(0, 116, 64, 1);
  }

  .img-round {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    /*background-color: rgba(153, 153, 153, 1);*/
    color: rgb(255, 255, 255);
    font-size: 48px;
    padding-bottom: 5px;
    padding-right: 5px;
  }

  .swiper .vux-swiper {
    height: 100% !important;
  }

  .all {
    width: 100%;
    height: 100%;
  }

  .header {
    position: fixed;
    z-index: 5000;
    width: 100%;
    height: 88px;
    left: 0;
    top: 0;
  }

  .swiper {
    height: 100%;
  }

  .footer {
    width: 100%;
    height: 88px;
    background: rgba(243, 244, 246, 1);
  }

  .button-left {
    position: relative;
    z-index: 5555;
    left: 0;
    top: 0;
    height: 88px;
    width: 88px;
  }

  .button-right {
    height: 88px;
    width: 88px;
  }

  .header-content {
    line-height: 88px;
  }

  .uba {
    border: 1px solid;
    box-sizing: border-box;
  }

  .ub {
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
  }

  .ub-ver {
    flex-direction: column;
  }

  .ub-ac {
    align-items: center;
  }

  .ub-ae {
    align-items: flex-end;
  }

  .ub-aj {
    justify-content: space-around;
  }

  .ub-pc {
    justify-content: center;
  }

  .ub-pace {
    justify-content: space-between;
  }

  .ub-f1 {
    flex-grow: 1;
  }

  .right_addCar {
    width: 247px;
    height: 88px;
    background: rgba(32, 134, 86, 1);
    font-size: 32px;
    font-family: PingFang-SC-Medium;
    color: rgba(255, 255, 255, 1);
  }


</style>
<template>
  <div class="all">
    <div class="ub header" :style="{backgroundColor:'rgba(255,255,255,'+hOpticy+')'}">
      <div class="ub ub-ac ub-pc button-left">
        <div class="ub ub-ac ub-pc img-round" :style="getImageChange" @click="backPage" >
          <i class="fa fa-angle-left"></i>
        </div>
      </div>
      <div class="ub ub-f1 header-content" :style="{opacity:hOpticy}">
        <div class="ub ub-ver  ub-ac ub-pc ub-f1 ">
          <div class="ub ub-f1" @click="headerChange_Page(0)">商品</div>
          <div class="tab_h" :class="{active_h:(swiperIndex==0)}"></div>
        </div>
        <div class="ub ub-ver  ub-ac ub-pc ub-f1">
          <div class="ub ub-f1" @click="headerChange_Page(1)">评价</div>
          <div class="tab_h" :class="{active_h:(swiperIndex==1)}"></div>
        </div>
        <div class="ub ub-ver  ub-ac ub-pc ub-f1">
          <div class="ub ub-f1" @click="headerChange_Page(2)">详情</div>
          <div class="tab_h" :class="{active_h:(swiperIndex==2)}"></div>
        </div>
      </div>
      <div class="button-right"></div>
    </div>
    <div class="content" :style="'height:'+contentHeight">
      <Swiper :show-dots="false" class="swiper" v-model="swiperIndex" @on-index-change="swiperChange_Page" >
        <SwiperItem class="swiperItem">
          <P1 ref="P1" @onScrollTop="onScrollTop" @onLoadOk="onLoadOk"></P1>
        </SwiperItem>
        <SwiperItem class="swiperItem">
          <P2 ref="P2"></P2>
        </SwiperItem>
        <SwiperItem class="swiperItem">
          <P3 ref="P3" @onScrollTop="onScrollTop"></P3>
        </SwiperItem>
      </Swiper>
    </div>
    <div class="ub footer">
      <div class="pad_l23 ub ub-ac ub-f1">
        <img src="../assets/icons/cart_product@2x.png" class="bottom_addCar" @click="openCart"/>
        <div class="badge" v-if="perchesNum>0">{{perchesNum}}</div>
      </div>
      <div class="ub ub-ac ub-pc right_addCar" @click="selectProductDetial">
        加入购物车
      </div>
    </div>


  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'vux'
  import P1 from './goodDetial_product'
  import P2 from './goodDetial_chat'
  import P3 from './goodDetial_detial'


  export default {
    name: "",
    components: {
      Swiper: Swiper,
      SwiperItem: SwiperItem,
      P1: P1,
      P2: P2,
      P3: P3
    },
    data() {
      return {
        contentHeight: (document.documentElement.clientHeight - 44) + 'px',
        swiperIndex: 0,
        scrollTop: 0,
        perchesNum: 0,
        st: 0,
        oldSt:0,
        style_num_id:''
      }
    },
    mounted(){
      this.style_num_id=this.$route.params.style_num_id || '190087';
      this.init();
    },
    methods: {
      init(){
        this.$refs.P1.init(this.style_num_id);
      },
      onLoadOk: function (id) {
        this.$refs.P2.getEvaluate();
        this.$refs.P3.getDetail(id);
      },
      backPage:function(){
        this.$router.go(-1);
      },

      openCart() {
        this.$route.push('/index');
      },
      //页面切换带动头部切换
      swiperChange_Page: function (index) {
        if(this.swiperIndex==0 && index!=0){
          this.oldSt = this.st;
          this.st=1000;
        }else if(this.swiperIndex!=0 && index==0){
          this.st = this.oldSt;
        }
        this.swiperIndex = index;
      },
      //头部切换带动页面切换
      headerChange_Page: function (index) {
        this.swiperIndex = index;
      },
      //监听详情页滚动事件
      onScrollTop: function (st) {
        this.st = st;
      },
      selectProductDetial() {
        this.$refs.P1.selectProductDetial('add');
      }
    },
    computed: {
      //图片背景色变化
      getImageChange: function () {
        let st = this.st;
        let n = 1;
        let color;

        if (st >= 0 && st < 111) {
          n = 1 - st / 111;
          color = `rgba(255, 255, 255,${n})`;
        } else if (st >= 111 && st < 266) {
          n = 0;
          let c = (st - 111) / 111;
          color = `rgba(153, 153, 153,${c})`;
        } else if (st >= 266) {
          n = 0;
          color = `rgba(153, 153, 153,1)`;
        }
        return {
          backgroundColor: `rgba(153, 153, 153,${n})`,
          color: color
        }
      },
      hOpticy(){
        return this.st / 311;
      },
    },
    watch: {
      //控制切换页面时的头部透明度
      swiperIndex: function () {
        // this.oldSt=this.st;
      },
      '$route': function (route) {
        var query = route.query;
        this.style_num_id=query.style_num_id;
        this.init();
      },
    }
  }
</script>


