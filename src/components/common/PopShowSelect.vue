<style>
  /*动画*/
  .popViewBox {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /*background-color: #f5f5f5;*/
    /*background-color: red;*/
    /*display: none;*/
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
    animation: popshow1 500ms;
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
  .popImg {
    width: 120px;
    height: 120px;
  }
  .heightImg{
    height: 120px;
  }
  .popName {
    font-size: 28px;
    color: rgba(32, 134, 86, 1);
    height: 60px;
    padding-top: 30px;
  }

  .popNumber {
    font-size: 24px;
    color: rgba(102, 102, 102, 1);
    height: 60px;
    padding-top: 30px;
  }

  .popClose {
    width: 36px;
    height: 36px;
    margin-top: -15px;
    margin-right: -15px;
  }
  .pad_l23 {
    padding-left: 23px;
  }
  .popClose2 {
    width: 36px;
    height: 36px;
  }

  .popType {
    width: 100%;
    flex-wrap: wrap;
    height: min-content;
  }

  .popTypeItem {
    height: 56px;
    background: rgba(255, 255, 255, 1);
    border: 2px solid rgba(0, 0, 0, 0.1);
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
  .popTitle {
    height: 100px;
    font-size: 28px;
    color: rgba(102, 102, 102, 1);
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

  .num-icon {
    width: 50px;
    height: 50px;
  }

  .input_num {
    border:none;
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
  .maxHeight {
    height: 100%;
  }
</style>
<template>
  <!--⬇⬇⬇选择属性弹框⬇⬇⬇-->
  <div class="popViewBox" v-if="show" :class="{show1:show,hide1:!show}">
    <div style="width: 100%;height: 30%;" @click="closePop"></div>
    <div class="ub ub-ver popContent" :class="{show2:show,hide2:!show}">
      <div class="ub popHerder">
        <img :src="data.spec.spec_item[data.spec.default_prop_id].image_default_id" class="popImg"/>
        <div class="ub ub-ver ub-f1 heightImg pad_l23">
          <div class="ub-f1 popName">￥{{getCalcPrice}}</div>
          <div class="ub-f1 popNumber">商品编号：{{getCalcId}}</div>
        </div>
        <img src="../../assets/icons/icon_close@2x.png" class="popClose" @click="closePop"/>
      </div>
      <div class="ub ub-ver ub-f1 popScroll">
        <div v-for="(item1,index1) in data.spec.specs.specs" :key="index1">
          <div class="ub ub-ac popTitle">{{item1.spec_name}}</div>
          <div class="ub popType">
            <div v-for="(item2,index2) in item1.spec_values" :key="index2" class="ub ub-ac popTypeItem" :class="{popActive:(popTypeActive[index1]==index2)}" @click="popTypeSelect(index1,index2,item1,item2)">{{item2.spec_value}}</div>
          </div>
        </div>
        <div class="ub ub-ac popTitle">
          <div class="ub-f1">数量</div>
          <div class="ub ub-ac">
            <img src="../../assets/icons/icon_disable@2x.png" class="num-icon" @click="calc(-1)"/>
            <div><input v-model="popCount" type="number" name="input" class="input_num"/></div>
            <img src="../../assets/icons/icon_add@2x.png" class="num-icon" @click="calc(1)"/>
          </div>
        </div>
      </div>
      <div class="ub ub-ac ub-pc popBot" @click="yesOk">
        加入购物车
      </div>
    </div>
  </div>
  <!--⬆⬆⬆选择属性弹框⬆⬆⬆-->
</template>
<script>
  export default {
    name: "see-product",
    data() {
      return {
        data: {},
        popCount: 1,
        popTypeActive: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        classAnima1: true,
        classAnima1_content:true,
        show: false
      }
    },
    methods: {
      yesOk: function () {
        this.callback(this.data.spec.default_prop_id,this.popTypeActive,this.popCount,this.data.spec.spec_item[this.data.spec.default_prop_id].image_default_id);
        this.closePop();
      },
      calc(num) {
        console.log(num)
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
      transitionend() {
        if (this.classAnima1 == 'hide1') {
          this.classAnima1 = 'stop1';
        }
        if (this.classAnima1 == 'hide2') {
          this.classAnima1 = 'stop2';
        }
      },
      popTypeSelect(index1,index2,item1,item2){
        //计算动态组合数据
        var str=this.data.spec.default_prop_id;
        var list=str.split('_');
        list[index1]=item2.spec_value_id;
        str=list.join('_');
        this.data.spec.default_prop_id=str;
        console.log(this.data.spec.default_prop_id)
        //切换特效
        this.popTypeActive[index1]=index2;
      },
      callback: function () {

      },
      closePop: function () {
        this.callback(this.data);
      },
    },
    computed: {
      getCalcPrice() {
        if (this.data.spec.spec_item && this.data.spec.spec_item[this.data.spec.default_prop_id]) {
          return this.data.spec.spec_item[this.data.spec.default_prop_id].price;
        } else {
          return '';
        }
      },
      getCalcId() {
        if (this.data.spec.spec_item && this.data.spec.spec_item[this.data.spec.default_prop_id]) {
          return this.data.spec.spec_item[this.data.spec.default_prop_id].ec_item_num_id;
        } else {
          return '';
        }
      }
    },
    mounted() {

    },
    //回退销毁当前路由（页面）
    deactivated() {
      this.$destroy();
    },
  }
</script>
