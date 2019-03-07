<template>
  <div class="chatDetail_all">
    <Header title="评价详情" style="position: fixed;width: 100%;top: 0;left: 0;z-index: 2000;"></Header>
    <div class="evaluateList">
      <div class="evaluateItem">
        <div class="ub">
          <img src="../assets/images/cat.jpg" class="evImg_head"/>
          <div class="ub ub-ver ub-f1">
            <div class="ub ub-ac ub-f1">
              <div class="ub-f1 name">路人甲的停滞</div>
            </div>
            <div class="ub_wrap ub-ac ub-f1">
              <div class="time">2018年8月29日 15:30</div>
            </div>
          </div>
        </div>
        <div class="desc">
          <div class="origin_esc">
            看起来不错哦，大小不太均匀，其他都非常好，不用放可以直接吃，很甜。不用放到软也很甜 。
          </div>
          <div class="ub_wrap origin_esc">
            <img src="../assets/images/cat.jpg" class="evImg_content"/>
            <img src="../assets/images/cat.jpg" class="evImg_content"/>
            <img src="../assets/images/cat.jpg" class="evImg_content"/>
            <img src="../assets/images/cat.jpg" class="evImg_content"/>
          </div>
          <div class="ub ub-ver customer_reply">
            <div class="kefuTitle">客服回复：</div>
            <div class="origin_esc">
              感谢您对本产品的大力支持和厚爱，希望您的皮肤越来越光洁丝滑，祝您购物愉快！
            </div>
          </div>
        </div>
        <div class="buyDetail">
          购买了澳大利亚无籽红提 颜色:红色 重量:500g
        </div>
        <div class="ub buyDetailLink">
          <img src="../assets/images/cat.jpg" />
          <div class="ub ub-f1 ub-ver descArea">
            <div class="ub ub-ver ub-f1">
              <div class="ub ub-f1 ub-ac tittle">澳大利亚无籽红提500g</div>
              <div class="ub ub-f1 ub-ac desc">无籽品质 甜蜜水润</div>
            </div>
            <div class="ub ub-ac ub-f1">
              <div class="money">￥</div>
              <div class="moneyNum">49</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomDesc">
      <div class="ub ub-ac title">
        <img src="../assets/icons/icon_commentproduct@3x.png" height="16" width="18"/>
        <div class="num">全部评论(2跳条)</div>
      </div>
      <div class="chatList">
        <div class="chatItem">
          <div class="ub userInfo">
            <img src="../assets/images/cat.jpg" class="evImg_head"/>
            <div class="ub ub-ver ub-f1">
              <div class="ub ub-ac ub-f1">
                <div class="ub-f1 name">路人甲的停滞</div>
              </div>
              <div class="ub_wrap ub-ac ub-f1">
                <div class="time">2018年8月29日 15:30</div>
              </div>
            </div>
          </div>
          <div class="ub chatDetail">
            <div style="width: 45px;"></div>
            <div class="chatDetail_content">亲，请问提子新鲜吗？甜不甜？</div>
          </div>
        </div>
        <div class="chatItem">
          <div class="ub userInfo">
            <img src="../assets/images/cat.jpg" class="evImg_head"/>
            <div class="ub ub-ver ub-f1">
              <div class="ub ub-ac ub-f1">
                <div class="ub-f1 name">路人甲的停滞</div>
              </div>
              <div class="ub_wrap ub-ac ub-f1">
                <div class="time">2018年8月29日 15:30</div>
              </div>
            </div>
          </div>
          <div class="ub chatDetail">
            <div style="width: 45px;"></div>
            <div class="ub-f1 chatDetail_content">亲，请问提子新鲜吗？甜不甜？</div>
          </div>
        </div>
      </div>

    </div>
    <footer class="bottom_bar">

    </footer>
  </div>

</template>
<script>
  import Vue from 'vue';
  import Header from './common/header'
  import { LoadingPlugin } from 'vux'
  Vue.use(LoadingPlugin)
  export default {
    name: "",
    components: {
      Header: Header
    },
    data() {
      return {
        evaluate_tab: [{
          label: '全部',
          value: 9554,
          typeId: 1001
        }, {
          label: '好评',
          value: 7200,
          typeId: 1002
        }, {
          label: '中评',
          value: 1265,
          typeId: 1003
        }, {
          label: '差评',
          value: 863,
          typeId: 1004
        }, {
          label: '有图',
          value: 2507,
          typeId: 1005
        }, {
          label: '差评',
          value: 338,
          typeId: 1006
        }],
        itemList: {
          "code": 0,
          "message": "成功",
          "full_message": null,
          "list": [],
          "total_count": 0,
          "total_page": 0
        },
        evaluateList: [{}],
        active_evaluate_index: 0
      }
    },
    mounted() {
      this.getEvaluate();
    },
    methods: {
      getEvaluate() {
        this.$http.query({
          method: 'order.new.goods.traderate.find',
          data: {
            "page_no": 1,
            "page_size": 5,
            "style_num_id": this.$route.params.style_num_id || '190087',
            "shop_id": 202
          },
          success: (data) => {
            console.log('Evaluate', data);
            if (data.data.code == 0) {
              this.wap_desc = data.data.wap_desc;
            }
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      typeEvaluate: function (index) {
        this.active_evaluate_index = index;
      }
    }
  }
</script>
<style>
  .bottom_bar{
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 88px;
  }
  .chatItem{
    margin-top: 20px;
  }
  .chatList{
    padding-top: 30px;
  }
  .chatDetail_content{
    padding: 30px 0;
    font-size:24px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:21px;
    border-bottom: 2px solid rgba(102,102,102,0.1);
  }
  .bottomDesc .num{
    font-size:32px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    padding-left: 27px;

  }
  .bottomDesc .title{
    height: 90px;
    border-bottom: 2px solid rgba(0,0,0,0.1);
  }
  .bottomDesc{
    padding: 0 30px;
    background:rgba(255,255,255,1);
    border-bottom: 2px solid rgba(0,0,0,0.1);
    margin-top: 20px;
  }
  .buyDetailLink  .moneyNum{
    font-size:40px;
    font-family:PingFang-SC-Heavy;
    font-weight:800;
    color:rgba(32,134,86,1);
  }
  .buyDetailLink  .money{
    font-size:24px;
    font-family:PingFang-SC-Heavy;
    font-weight:800;
    color:rgba(32,134,86,1);
  }

  .buyDetailLink .desc{
    font-size:24px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .buyDetailLink .tittle{
    font-size:24px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    padding-top: 16px;
  }
  .buyDetailLink .descArea{
    padding-left: 30px;
    background:rgba(243,244,246,1);
  }
  .buyDetailLink > img{
    width: 200px !important;
    height: 200px;
  }
  .buyDetailLink{

  }
  .buyDetail {
    padding: 30px 0;
    font-size:24px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    border-top: 2px solid rgba(0,0,0,0.1);
  }

  .customer_reply .kefuContent {
    font-size: 24px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .customer_reply .kefuTitle {
    font-size: 24px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 21px;
  }

  .customer_reply {
    padding: 30px;
    width: 100%;
    background: rgba(243, 244, 246, 1);
    margin: 30px 0;
  }

  .evaluateItem .evImg_content {
    width: 210px;
    height: 210px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .origin_esc {
    width: 100%;
    font-size: 24px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 32px;
    margin-top: 48px;
  }

  .evaluateItem .label {
    height: 30px;
    line-height: 30px;
    background: rgba(243, 244, 246, 1);
    border-radius: 15px;
    font-size: 20px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    padding: 5px 15px;
    text-align: center;
    margin-right: 10px;
  }

  .evaluateItem .name {
    font-size: 24px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(42, 94, 154, 1);
    line-height: 21px;
    box-sizing: border-box;
  }
  .userInfo .name {
    font-size:24px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    box-sizing: border-box;
  }
  .evaluateItem .time {
    height: 19px;
    font-size: 20px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(204, 204, 204, 1);
  }
  .userInfo .time {
    height: 19px;
    font-size: 20px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(204, 204, 204, 1);
  }

  .evaluateItem .evImg_head {
    width: 90px;
    height: 90px;
    margin-right: 15px;
    border-radius: 50%;
  }
  .userInfo .evImg_head {
    width: 90px;
    height: 90px;
    margin-right: 15px;
    border-radius: 50%;
  }


  .evaluateItem {
    padding: 30px;
    background-color: white;
    margin-top: 20px;
  }

  .item_num {
    height: 50px;
    background: rgba(255, 255, 255, 1);
    border-radius: 25px;
    color: rgba(0, 116, 64, 1);
    text-align: center;
    line-height: 50px;
    padding: 0 35px;
    margin-right: 20px;
    margin-bottom: 20px;
    background: rgba(231, 242, 236, 1);
    font-size: 20px;
  }

  .ub_wrap {
    display: -webkit-flex; /* Safari */
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
  }

  .chatDetail_all {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-top: 88px;
    padding-bottom: 88px;
  }

  .fill_t {
    height: 88px;
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
</style>
