<template>
  <div class="chatDetail">
    <div class="fill_t"></div>
    <div class="ub_wrap evaluate_tab">
      <div class="item_num" v-for="(item,index) in evaluate_tab" :class="{active_evaluate_tab:active_evaluate_index==index}" @click="typeEvaluate(index)">
        <i v-if="active_evaluate_index==index" class="fa fa-check"></i> {{item.label}} {{item.value}}
      </div>
    </div>
    <div class="evaluateList">
      <div class="evaluateItem" @click="openEvaluateDetail">
        <div class="ub">
          <img src="../assets/images/cat.jpg" class="evImg_head"/>
          <div class="ub ub-ver ub-f1">
            <div class="ub ub-ac ub-f1">
              <div class="ub-f1 name">路人甲的停滞</div>
              <div class="time">2018年8月29日 15:30</div>
            </div>
            <div class="ub_wrap ub-ac ub-f1">
                <div class="label">初次买</div>
                <div class="label">初次买</div>
                <div class="label">初次买</div>
                <div class="label">初次买</div>
                <div class="label">初次买</div>
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
        <div class="append">
          <div class="append_desc">
            追加评论
          </div>
          <div class="origin_esc">
            看起来不错哦，大小不太均匀，其他都非常好，不用放可以直接吃，很甜。不用放到软也很甜 。
          </div>
        </div>
        <div class="bot_content ub ">
          <div class="ub-f1">购买日期：2018-08-28</div>
          <div style="color:rgba(51,51,51,1);">
            6 <i class="fa fa-commenting-o"></i>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
  export default {
    name: "",
    data() {
      return {
        evaluate_tab:[{
          label:'全部',
          value:9554,
          typeId:1001
        },{
          label:'好评',
          value:7200,
          typeId:1002
        },{
          label:'中评',
          value:1265,
          typeId:1003
        },{
          label:'差评',
          value:863,
          typeId:1004
        },{
          label:'有图',
          value:2507,
          typeId:1005
        },{
          label:'差评',
          value:338,
          typeId:1006
        }],
        itemList: {
          "code": 0,
          "message": "成功",
          "full_message": null,
          "list": [],
          "total_count": 0,
          "total_page": 0
        },
        evaluateList:[{

        }],
        active_evaluate_index:0
      }
    },
    mounted() {
      // this.getEvaluate();
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
      typeEvaluate:function(index){
        this.active_evaluate_index=index;
      },
      //打开评论详情
      openEvaluateDetail:function(){
        this.$router.push({
          name: 'goodDetailChatDetail',
          params: {
            id: 190087
          }
        })
      }
    }
  }
</script>
<style>
  .active_evaluate_tab{
    background: rgba(255, 255, 255, 1) !important;
    border: 2px solid rgba(0, 116, 64, 0.5) !important;
  }
  .bot_content{
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(204,204,204,1);
    padding: 30px 0px;
  }
  .append_desc{
    font-size:24px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-top: 40px;
  }
  .customer_reply .kefuContent{
    font-size:24px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
  }
  .customer_reply .kefuTitle{
    font-size:24px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:21px;
  }
  .customer_reply{
    padding: 30px;
    width:100%;
    background:rgba(243,244,246,1);
  }
  .evaluateItem .evImg_content{
    width: 210px;
    height: 210px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .origin_esc{
    width: 100%;
    font-size:24px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:32px;
    margin-top: 48px;
  }
  .evaluateItem .label{
    height:30px;
    line-height: 30px;
    background:rgba(243,244,246,1);
    border-radius:15px;
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    padding: 5px 15px;
    text-align: center;
    margin-right: 10px;
  }
  .evaluateItem .name{
    font-size:24px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(42,94,154,1);
    line-height:21px;
    box-sizing: border-box;
  }
  .evaluateItem .time{
    height:19px;
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(204,204,204,1);
    line-height:21px;
  }
  .evaluateItem .evImg_head{
    width:90px;
    height:90px;
    margin-right: 15px;
    border-radius: 50%;
  }
  .evaluateItem{
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

  .evaluate_tab {
    width: 100%;
    padding: 40px 0px 40px 25px;
    background-color: white;
  }

  .chatDetail {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .fill_t {
    height: 88px;
    background-color: white;
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
