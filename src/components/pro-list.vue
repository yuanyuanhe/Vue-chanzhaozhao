<template>
  <div class="pro-item">
    <div class="pro-img" @click="goToDetaiPage(pro.style_num_id)">
      <img src="pro.image_default_id" />
    </div>
    <div class="pro-name" @click="goToDetaiPage(pro.style_num_id)">
      {{pro.title}}
    </div>
    <div v-if="pro.tagList" class="tag-list">
      <div class="item-tag" v-for="(proTag,index) in pro.tagList" :key="index">
        {{proTag}}
      </div>
    </div>
    <div class="flex pro-add">
      <div class="pro-price">
        <span class="price-symbol">￥</span>
        <span class="price-value">{{pro.price}}</span>
      </div>
      <div class="icon add-btn" @click="addToCart()">
        <img src="../assets/icons/btnAdd.png" />
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../units/config';

	export default {
    name: 'proItem',
    props: ['pro'],
    components:{
     
    },
    data () {
      return {
       
      }
    },
    methods:{
      goToDetaiPage(arg){
        this.$router.push({
          path: "goodsdetail",
          query: {
            from: "cart",
            style_num_id: arg,
          }
        })
      },
      addToCart: function () {
        console.log(this.pro)
        this.$emit('addToCartRequest',this.pro)
      }
    }
	}
</script>
<style lang="less">
 @import "../assets/css/common";
 @import "../assets/css/variable";

 .pro-item{
    .pro-name{
      margin-top: 16px;
      min-height: 64px;
      max-height: 64px;
      height: 64px;
      line-height: 36px;
    }
    .pro-img{
      width: 100%;
      height: 220px;
      background: @light-white;
    }
    .tag-list{
      margin-top: 18px;
    }
    .pro-add{
      align-content: center;
      margin-top: 16px;
    }
    .pro-price{
      width: 80%;
    }
 }
</style>
