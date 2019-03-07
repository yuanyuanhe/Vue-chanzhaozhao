<template>
  <div class="body">
    <Header title="设置"></Header>
    <div class="setting-box setting-box-margin">
      <div class="setting-box-name">余额支付</div>
      <div class="user-block-entericon"></div>
    </div>
    <div @click="setPassword" class="setting-box setting-box-margin">
      <div class="setting-box-name">登录密码</div>
      <div class="setting-box-right">修改</div>
      <div class="user-block-entericon"></div>
    </div>
    <div class="setting-box setting-box-margin">
      <div class="setting-box-name">清除本地缓存</div>
      <div class="setting-box-right">25.63M</div>
      <div class="user-block-entericon"></div>
    </div>
    <div class="setting-box setting-box-border">
      <div class="setting-box-name">版本信息</div>
      <div class="setting-box-right">V1.0.0</div>
    </div>
    <div class="setting-box setting-box-border">
      <div class="setting-box-name">关于我们</div>
      <div class="user-block-entericon"></div>
    </div>
    <div class="setting-box setting-box-border">
      <div class="setting-box-name">评价我们</div>
      <div class="user-block-entericon"></div>
    </div>
    <div @click="loginOut" class="login-out">退出登录</div>
  </div>
</template>

<script>
  import Header from "../components/common/header"
  export default {
    name: "setting",
    components:{
      Header
    },
    data(){
      return{

      }
    },
    methods:{
      setPassword(){
        this.$router.push({
          name: 'modifyPassword'
        })
      },
      loginOut(){
        this.removelocal('access_token');
        this.$router.push({
          name: 'login'
        })
      }
    },
    created(){
      this.$store.dispatch('footerStatus/hideFooter');
    }
  }
</script>

<style lang="less" scoped>
  page,
  .body {
    height: 100%;
    background: #F3F4F6;
  }
  .setting-box{
    position: relative;
    background: #fff;
    height: 85px;
    line-height: 85px;
    padding-left: 25px;
    font-size: 24px;
    color: #000;
    padding-right: 65px;
    &.setting-box-margin{
      margin-bottom: 20px;
    }
    .setting-box-name{
      float: left
    }
    .setting-box-right{
      float: right;
      color: #959595;
    }
  }
  .setting-box-border{
    border-bottom: 1px solid #f4f4f4;
  }
  .user-block-entericon{
    position: absolute;
    width: 40px;
    height: 60px;
    top: 50%;
    transform: translate(0,-50%);
    right: 20px;
    &:before{
      content: '';
      position: absolute;
      width: 15px;
      height: 15px;
      border: 2px solid #ccc;
      border-width: 4px 0 0 4px;
      transform: rotate(135deg);
      top: 19px;
      left: 10px;
    }
  }
  .login-out{
    height: 85px;
    line-height: 85px;
    text-align: center;
    color: #000;
    font-size: 28px;
    background: #fff;
    margin-top: 50px;

  }
</style>
