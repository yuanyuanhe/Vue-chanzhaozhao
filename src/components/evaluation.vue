<template>
  <div class="orderlist">
    <Header title="发表评论">
      <span slot="rightBtn" class="submit" @click="subOrderComment">提交</span>
    </Header>
    <div class="goods_appraise" v-for="(item,index) in goodsNum">
      <GoodsAppraise
        :index="index"
        :goodsId="99999"
        @favoriteLevel="favoriteLevel"
        @inputComments="inputComments"
        @getGoodsPic="getGoodsPic"
      ></GoodsAppraise>
    </div>
    <div class="storeAppraise">
      <div class="store_dt">
        <img src="../assets/icons/store.png" alt="" />
        <span>店铺评价</span>
      </div>
      <div class="store_dd">
        <ul class="appraiseItems">
          <li class="dt">描述相符</li>
          <li class="stars goodsDes">
             <span class="default">
               <img src="../assets/icons/starAct.png"
                    v-for="(item,index) in StarNum"
                    :class="index==4?'last':''"
                    @click="cancelDesStar(index)"
               />
             </span>
            <span class="selected" v-if="cancelGoodsStar">
               <img src="../assets/icons/star.png"
                    v-for="(item,index) in desStarLight"
                    :class="index==4?'last':''"
                    @click="lightStar(index)"
               />
             </span>
          </li>
          <li class="dd">
            <span v-if="(5-desStarLight)>3">好评</span>
            <span v-if="(5-desStarLight)==3">中评</span>
            <span v-if="(5-desStarLight)<3">差评</span>
          </li>
        </ul>
        <ul class="appraiseItems">
          <li class="dt">服务态度</li>
          <li class="stars">
             <span class="default">
               <img src="../assets/icons/star.png"
                    v-for="(item,index) in StarNum"
                    :class="index==4?'last':''"
                    @click="lightServeStar(index)"
               />
               </span>
            <span class="selected" v-if="lightServiceStar">
                 <img src="../assets/icons/starAct.png"
                      v-for="(item,index) in sevStarLight"
                      :class="index==4?'last':''"
                      @click="cancelSevStar(index)"
                 />
               </span>
          </li>
          <li class="dd">
            <span v-if="sevStarLight>3">好评</span>
            <span v-if="sevStarLight==3">中评</span>
            <span v-if="sevStarLight<3">差评</span>
          </li>
        </ul>
        <ul class="appraiseItems">
          <li class="dt">发货速度</li>
          <li class="stars">
             <span class="default">
               <img src="../assets/icons/star.png"
                    v-for="(item,index) in StarNum"
                    :class="index==4?'last':''"
                    @click="lightSpeedStar(index)"
               />
               </span>
            <span class="selected" v-if="showlightSpeedStar">
                 <img src="../assets/icons/starAct.png"
                      v-for="(item,index) in speedStarLight"
                      :class="index==4?'last':''"
                      @click="cancelSpeedStar(index)"
                 />
               </span>
          </li>
          <li class="dd">
            <span v-if="speedStarLight>3">好评</span>
            <span v-if="speedStarLight==3">中评</span>
            <span v-if="speedStarLight<3">差评</span>
          </li>
        </ul>
        <ul class="appraiseItems">
          <li class="dt">物流服务</li>
          <li class="stars">
             <span class="default">
               <img src="../assets/icons/star.png"
                    v-for="(item,index) in StarNum"
                    :class="index==4?'last':''"
                    @click="lightLogStar(index)"
               />
               </span>
            <span class="selected" v-if="showlightLogStar">
                 <img src="../assets/icons/starAct.png"
                      v-for="(item,index) in logStarLight"
                      :class="index==4?'last':''"
                      @click="cancelLogStar(index)"
                 />
               </span>
          </li>
          <li class="dd">
            <span v-if="logStarLight>3">好评</span>
            <span v-if="logStarLight==3">中评</span>
            <span v-if="logStarLight<3">差评</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="anonymous" @click="isAnonymous">
      <img src="../assets/icons/checkActive.png" v-if="anonymous" />
      <img src="../assets/icons/checkDefault.png" v-if="!anonymous" />
      <span>匿名评价</span>
    </div>
    <div class="exit">
      <confirm v-model="showModel"
               :title="msgTitle"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">确定要取消评价吗？</p>
      </confirm>
    </div>
  </div>
</template>
<script>
  import Header from '@/components/common/header.vue'
  import GoodsAppraise from '@/components/common/goodsAppraise.vue'
  import api from '../units/config'
  import {Confirm } from 'vux'
  export default {
    components:{
      Header,
      Confirm,
      GoodsAppraise
    },
    data () {
      return {
        rate_data:[],
        eachGoods:{},
        goodsNum:3,
        comments:[],
        goodsPics:[],
        showModel:false,
        msgTitle:'取消评价',
        StarNum:5,
        cancelGoodsStar:false,
        lightServiceStar:false,
        showlightSpeedStar:false,
        showlightLogStar:false,
        desStarLight:1,
        sevStarLight:1,
        speedStarLight:1,
        logStarLight:1,
        anonymous:true
      }
    },
    created(){
      this.$store.dispatch('footerStatus/hideFooter');
      for(var i=0;i<this.goodsNum;i++){
        this.favoriteLevel(0,i,i+11111);
        this.rate_data[i].content='';
        this.rate_data[i].rate_pic='';
      }
    },
    mounted(){
      this.$nextTick(()=>{
        alert(999)
        document.addEventListener("deviceready", function(){
          alert(window.imagePicker)
          window.imagePicker.getPictures(
            function(results) {
              alert(results)
              for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
              }
            }, function (error){
              console.log('Error: ' + error);
            });
        }, false)
      })
    },
    methods:{
      //点亮商品描述星星
      lightStar(num){
        this.desStarLight=num;
        console.log(this.StarNum-this.desStarLight)
      },
      //取消点亮商品描述的星
      cancelDesStar(num){
        this.cancelGoodsStar=true;
        this.desStarLight=num;
        console.log(this.StarNum-this.desStarLight)
      },
      //点亮服务态度星星
      cancelSevStar(num){
        if(num==0) num=1;
        this.sevStarLight=num;
      },
      //取消点服务态度的星
      lightServeStar(num){
        this.lightServiceStar=true;
        this.sevStarLight=num+1;
      },
      //点亮发货速度星星
      cancelSpeedStar(num){
        if(num==0) num=1;
        this.speedStarLight=num;
      },
      //取消发货速度的星
      lightSpeedStar(num){
        this.showlightSpeedStar=true;
        this.speedStarLight=num+1;
      },
      //点亮物流速度星星
      cancelLogStar(num){
        if(num==0) num=1;
        this.logStarLight=num;
      },
      //取消物流速度的星
      lightLogStar(num){
        this.showlightLogStar=true;
        this.logStarLight=num+1;
      },
      favoriteLevel(level,index,goodsId){
        let i=Number(index),arrange;
        this.rate_data[i]={};
        switch (level){
          case 0:
            arrange='good';
            break;
          case 1:
            arrange='well';
            break;
          case 2:
            arrange='badly';
            break;
        }
        this.rate_data[i].result=arrange;
        if(goodsId) this.rate_data[i].tml_line=goodsId;
        this.rate_data[i].content=this.comments[i]==undefined?'':this.comments[i];
        this.rate_data[i].rate_pic=this.goodsPics[i]==undefined?'':this.goodsPics[i];
        console.log(this.rate_data[i].content)
        console.log(this.rate_data)
      },
      inputComments(comments,index){
        let i=Number(index);
        this.rate_data[i].content=comments;
        this.comments[i]=comments;
        this.rate_data[i].rate_pic=this.goodsPics[i]==undefined?'':this.goodsPics[i];
        console.log(this.rate_data)
      },
      getGoodsPic(pic,index){
        let i=Number(index);
        this.rate_data[i].rate_pic=pic;
        this.goodsPics[i]=pic;
        this.rate_data[i].content=this.comments[i]==undefined?'':this.comments[i];
        console.log(this.rate_data)
      },
      subOrderComment(){
        let that=this;
        console.log(this.rate_data)
        console.log('物流速度'+this.logStarLight);
        console.log('发货速度'+this.speedStarLight);
        console.log('服务态度'+this.sevStarLight);
        console.log('商品描述'+(5-this.desStarLight));
        that.$http.query({
          method: api.vip.orderComments,
          data:{
            "tml_num_id": "901802260140002111",//this.order_num_id
            "rate_data": this.rate_data,
            "anony": this.anonymous,//是否匿名
            "shop_id": 202,//店铺id
            "tally_score": 5-this.desStarLight,//宝贝与描述相符
            "attitude_score": this.sevStarLight,//服务态度评分
            "delivery_speed_score": this.speedStarLight,//发货速度评分
            "logistics_service_score": this.logStarLight,//物流公司服务评分
            "item_num_id": null
          },
          success:function(res){
            console.log(res)
          },
          error: function(error){
            console.log(error);
          }
        })
      },


      //取消评价
      orderCancel(){
        this.showModel=true;
      },
      onCancel(){
        //不取消
      },
      onConfirm(){
        let that=this;

      },
      //是否匿名评价
      isAnonymous(){
        this.anonymous=!this.anonymous;
      }
    }
  }
</script>
<style lang="less" scoped>
  .submit{
    font-size:30px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(0,116,64,1);
    line-height:21px;
  }
  .goods_appraise{
    margin:20px 0;
  }
  .storeAppraise{
    background: #FFFFFF;
    padding:24px 62px 65px 28px;
    .store_dt{
      img{
        display: inline-block;
        width:27px;
        height:26px;
        vertical-align: middle;
      }
      span{
        font-size:24px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:21px;
        vertical-align: middle;
        margin-left:19px;
      }
    }
    .store_dd{
      .appraiseItems{
        padding-top:40px;
        li{
          display: inline-block;
          font-size: 0;
          vertical-align: middle;
          &.dt{
            font-size:24px;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(102,102,102,1);
            line-height:21px;
          }
          &.stars{
            margin:0 50px 0 45px;
            position: relative;
            .default{
              display: block;
              img{
                display: inline-block;
                font-size: 0;
                width:40px;
                height:39px;
                margin-right:50px;
                &.last{
                  margin-right: 0;
                }
              }
            }
            .selected{
              display: block;
              position: absolute;
              top:0;
              left:0;
              img{
                display: inline-block;
                font-size: 0;
                width:40px;
                height:39px;
                margin-right:50px;
                &.last{
                  margin-right: 0;
                }
              }
            }
            &.goodsDes{
              transform: rotatey(180DEG);
            }
          }
          &.dd{
            font-size:24px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:21px;
          }
        }
      }
    }
  }
  .anonymous{
    padding-top:20px;
    border-top:1px solid #EFEFEF;
    img{
      display: inline-block;
      width:50px;
      height:50px;
      vertical-align: middle;
    }
    span{
      font-size:24px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:21px;
      vertical-align: middle;
    }
  }
</style>


