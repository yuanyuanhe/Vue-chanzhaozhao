<template>
  <div class="register">
    <Header title="修改密码"></Header>
    <div class="register-content">
      <!--<div class="code-info">验证码已发送至 138****9999</div>-->
      <!--<div class="phone-input"><input type="tel" v-model="userPhone" placeholder="请输入手机号" /><span class="color-blue">获取验证码</span></div>-->
      <div class="code-input"><input type="tel" v-model="userCode" placeholder="请输入旧密码" /> </div>
      <div class="code-input"><input type="password" @blur="confirmPassword" v-model.trim="userPassword1" placeholder="请输入至少6位新密码" maxlength="15" /> </div>
      <div class="code-input"><input type="password" @blur="confirmPassword" v-model.trim="userPassword2" placeholder="请再次输入新密码" maxlength="15" /> </div>
      <div @click="submit" class="login-btn">提交</div>
    </div>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text=message position="middle"></toast>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  import Header from "../components/common/header"
  import api from './../units/config'
  export default {
    components:{
      Header,
      Toast
    },
    data () {
      return {
        showPositionValue: false,
        message:'',
        userPhone:'',
        userCode:'',
        userPassword1:'',
        userPassword2:'',
        usrNumId:'',
        accessToken:''
      }
    },
    methods:{
      confirmPassword(){
        if(this.userPassword1!=''&&this.userPassword2!=''&&this.userPassword1!=this.userPassword2){
          this.showPositionValue = true;
          this.message = '两次输入不一致'
        }
      },
      submit(){
        const self = this;
        console.log(self.usrNumId);
        if(this.userCode==''){
          this.showPositionValue = true;
          this.message = '请输入旧密码'
          return
        }
        console.log(this.userPassword1.length);
        console.log(this.userPassword2.length);
        if(this.userPassword1.length<=5&&this.userPassword1==this.userPassword2){
          this.showPositionValue = true;
          this.message = '请输入至少6位的新密码'
          return
        }
        self.httpAjax({
          method: api.vip.modifyPassword,
          data:{
            "usr_num_id": self.usrNumId,
            "orig_password": self.userCode,
            "password": self.userPassword1,
            "confirm_password": self.userPassword2,
            "access_token": self.accessToken
          }
        }).then(res=>{
          this.showPositionValue = true;
          this.message = '修改成功'
        },res=>{
          console.log(res);
        })
      }
    },
    created(){
      this.usrNumId = this.local('usr_num_id');
      this.accessToken = this.local('access_token')
      this.$store.dispatch('footerStatus/hideFooter');
    }
  }
</script>


<style lang="less" scoped>
  .register{
    background: #ffffff;
    padding-bottom: 348px;
    .register-content{
      padding:0 38px 0 38px;
      .code-info{
        color: #333333;
        font-size: 30px;
        height: 142px;
        line-height: 142px;
      }
      .phone-input{
        display: flex;
        font-size: 26px;
        height: 110px;
        line-height: 110px;
        border-bottom: 2px solid #efefef;
        input{
          flex:1;
          border: none;
          height: 100%;
        }
        .color-blue{
          color: #008654;
        }
      }
      .code-input{
        display: flex;
        font-size: 26px;
        height: 110px;
        line-height: 110px;
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: 1px;
        input{
          flex:1;
          border: none;
          height: 100%;
          border-bottom: 2px solid #efefef;
        }
      }
      .password-input{
        display: flex;
        font-size: 26px;
        height: 110px;
        line-height: 110px;
        input{
          flex:1;
          border: none;
          height: 100%;
        }
      }
      .login-btn{
        width: 670px;
        height: 100px;
        line-height: 100px;
        font-size: 36px;
        text-align: center;
        border-radius: 10px;
        color: #ffffff;
        margin-top: 50px;
        background: #008654;
      }
    }
  }
</style>
