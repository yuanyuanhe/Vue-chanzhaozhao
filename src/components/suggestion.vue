<template>
  <div class="body">
    <Header title="意见反馈"></Header>
    <div class="vip-suggestions-banner">
      <img class="vip-suggestions-banner-img" src="../assets/icons/vip-suggestion.png" />
    </div>
    <div class="vip-suggestions-type">
      <div class="vip-suggestions-type-tit">
        <div>反馈类型</div>
        <div class="vip-suggestions-type-must">必选</div>
      </div>
      <div class="vip-suggestions-type-all">
        <div class="vip-suggestions-type-box">
          <div @click="setValue(index, item.active)" v-for="(item,index) in suggestionsTypeList" class="vip-suggestions-type-list" :class="item.active?'vip-suggestions-type-active':''">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="write-suggest">
      <textarea @input="showWords" placeholder="请留下您的宝贵意见，至少6个字" maxlength="maxNum"> </textarea>
      <div class="write-suggest-words">
        <div>/{{maxNum}}</div>
        <div>{{currentNum}}</div>
      </div>
    </div>
    <div class="vip-suggestions-contact">
      <div>联系电话</div>
      <div>400-558-555</div>
    </div>
    <div class="save-address">提交</div>
  </div>
</template>

<script>
  import api from './../units/config'
  import Header from "../components/common/header";
  export default {
    name: "suggestion",
    components:{
      Header
    },
    data(){
      return{
        suggestionsTypeList:[
          {name:'商品质量',id: 1,active: false},
          {name:'门店服务',id: 2,active: false},
          {name:'配送服务',id: 3,active: false},
          {name:'程序闪退',id: 4,active: false},
          {name:'支付问题',id: 5,active: false},
          {name:'退货服务',id: 6,active: false},
          {name:'商品缺货',id: 7,active: false},
          {name:'其他',id: 8,active: false}
        ],    //意见列表
        checkList: [],       //提交的反馈数组
        maxNum: 600,         //字数最大长度
        currentNum: 0,      //当前已输入长度
      }
    },
    methods:{
      /**
       * 选中意见
       * @param e
       */
      setValue(dex,isSelect){
        // console.log(e);
        const self = this;
        this.suggestionsTypeList[dex].active = !isSelect;
        self.checkList = [];
        this.suggestionsTypeList.forEach(function(items) {
          if(items.active){
            self.checkList.push(items)
          }
        })
      },
      /**
       * 输入字数
       */
      showWords(e){
        this.currentNum = e.detail.value.length;

      }
    },
    created(){
      this.$store.dispatch('footerStatus/hideFooter');
    }
  }
</script>

<style lang="less">
  .body {
    height: 100%;
    font-family: PingFangSC-Regular;
    background-color:#f3f4f6;
    .vip-suggestions-banner{
      font-size: 0;
      .vip-suggestions-banner-img{
        width: 100%;
        height: 120px;
        background: #f3f4f6;
      }
    }
    .vip-suggestions-type{
      width: 100%;
      box-sizing: border-box;
      padding-left: 30px;
      background: #fff;
      margin-bottom: 30px;
      .vip-suggestions-type-tit{
        height: 88px;
        line-height: 88px;
        color: #000;
        font-size: 24px;
        border-bottom: 1px solid #EFEFEF;
        div{
          display: inline-block;
        }
        div:first-child{
          margin-right: 37px;
        }
        .vip-suggestions-type-must{
          color: #999999;
        }
      }
      .vip-suggestions-type-all{
        padding-right: 30px;
        .vip-suggestions-type-box{
          padding-right: 30px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          padding-top: 30px;
          .vip-suggestions-type-list{
            font-size: 24px;
            width: 210px;
            height: 60px;
            line-height: 58px;
            text-align: center;
            border-radius: 30px;
            border: 1px solid #EFEFEF;
            margin-bottom: 30px;
            &.vip-suggestions-type-active{
              background: #208656;
              color: #fff;
              border: 1px solid #208656;
            }
          }
        }
      }
    }
    .write-suggest{
      background: #fff;
      padding: 30px 39px 50px;
      font-size: 24px;
      position: relative;
      margin-bottom: 30px;
      textarea{
        width: 100%;
        height: 230px;
        line-height: 35px;
      }
      .write-suggest-words{
        position: absolute;
        right: 39px;
        bottom: 10px;
        color: #CCCCCC;
        font-size: 24px;
        div{
          float: right;
        }
      }
    }
    .vip-suggestions-contact{
      color: #333333;
      padding: 0 28px;
      font-size: 24px;
      background: #fff;
      div{
        height: 88px;
        line-height: 88px;
        display: inline-block;
      }
      div:first-child{
        margin-right: 50px;
      }
    }
    .save-address{
      margin: 50px auto;
      width: 600px;
      height: 80px;
      font-size: 28px;
      line-height: 78px;
      text-align: center;
      background: #208656;
      color: #fff;
      border-radius: 40px;
      border: 1px solid #208656;
      box-sizing: border-box;
    }
  }
</style>
