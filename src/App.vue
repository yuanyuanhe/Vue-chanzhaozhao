<template>
  <div id="app">
    <!-- <Header :title="headerTitle"></Header> -->
    <router-view/>
    <FooterBar v-if="isShow" />
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex';
import Header from '@/components/common/header.vue'
import FooterBar from '@/components/common/FooterBar'
import config from './config/index'
import { create } from 'domain';
import { setTimeout } from 'timers';
export default {
  name: 'App',
  components:{
    FooterBar:FooterBar,
    Header: Header
  },
  data(){
    return {
      headerTitle:''
    }
  },
  computed:{
    ...mapState({
      isShow: state => state.footerStatus.showFooter,
      count: state => state.cartNum.count
    })
  },
  watch:{
    $route(to,from){
      let _this = this
      this.headerTitle = to.meta.title
      if(to.name=='index'||to.name=='classify'||to.name=='cart'||to.name=='vip'){
        this.$store.dispatch('footerStatus/showFooter')
      }else{
        this.$store.dispatch('footerStatus/hideFooter')
      }
      this.local('showPageLoad',true)
      if(this.local('showPageLoad')){
        this.pageLoad(1)
      }
      setTimeout(function(){
        _this.local('showPageLoad',false) 
        _this.pageLoad()
      },3000)
      // if(to.name == 'vip'&&from.name=='vip'){
      //   if(!_this.local('access_token') || _this.local('access_token')=='' || _this.local('access_token')==null){
      //     this.$router.push('login')
      //   }
      // }
    }
  },
  created () {
    let _this = this
    this.local('showPageLoad',true)
    this.pageLoad(1)
    setTimeout(function(){
      _this.local('showPageLoad',false) 
      _this.pageLoad()
    },3000)
    this.headerTitle = this.$route.meta.title
  }
}
</script>

<style lang="less">
@import './assets/css/common.less';

body {
  background-color: #fbf9fe;
}
.piece-class{
  a{
    i{
      width: 24px !important;
      height: 8px !important;
    }
  }
}

//loading样式修改
.weui-toast{
  top: 50%;
  margin-top: -3.8em;
}
.weui-icon_toast.weui-loading{
  width: 70px;
  height: 70px;
  margin-top: 50px;
}
.weui-toast__content{
  margin-top: 10px;
}
//Toast样式修改
.weui-toast{
  width: 8em;
}
.weui-icon_toast.weui-icon-success-no-circle:before{
  font-size: 1rem;
}
.weui-toast_text .weui-toast__content{
  padding: 1em 0.5em;
}

</style>
