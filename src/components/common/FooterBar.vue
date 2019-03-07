<template>
  <div class="footer">
    <div class="footer-box"></div>
    <ul>
      <router-link tag="li" active-class='active' to="/index">首页</router-link>
      <router-link tag="li" active-class='active' to="/classify" >分类</router-link>
      <router-link tag="li" active-class='active' to="/cart">购物车</router-link>
      <router-link tag="li" active-class='active' to="/vip">会员中心</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
  data () {
    return {
      msg: ''
    }
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.footer-box{
  height: 96px;
}
ul {
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 96px;
  background-color:#fff;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  margin:0;
  padding:0;
  border-top: 1px solid #E3DAB5;
  box-sizing: border-box;
  box-shadow: 0 3px 8px 2px rgba(0,0,0,0.54);
  padding-top: 10px;
}
li {
  flex:1;
  color:#333333;
  text-decoration:none;
  font-size: 20px;
  height: 100%;
  box-sizing: border-box;
  padding-top:48px;
}
li:nth-child(1){
  background:url(../../assets/icons/home.png) no-repeat top center;
  background-size: 46px;
}
li:nth-child(2){
  background:url(../../assets/icons/classify.png) no-repeat top center;
  background-size: 46px;
}
li:nth-child(3){
  background:url(../../assets/icons/cart.png) no-repeat top center;
  background-size: 46px;
}
li:nth-child(4){
  background:url(../../assets/icons/vip.png) no-repeat top center;
  background-size: 46px;
}
.active{
  color:#42b983;
}
li.active:nth-child(1){
  background:url(../../assets/icons/homeAct.png) no-repeat top center;
  background-size: 46px;
}
li.active:nth-child(2){
  background:url(../../assets/icons/classifyAct.png) no-repeat top center;
  background-size: 46px;
}
li.active:nth-child(3){
  background:url(../../assets/icons/cartAct.png) no-repeat top center;
  background-size: 46px;
}
li.active:nth-child(4){
  background:url(../../assets/icons/vipAct.png) no-repeat top center;
  background-size: 46px;
}

</style>
