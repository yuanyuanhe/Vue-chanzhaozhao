<template>
    <div class="register">
        <Header style="background:#ffffff;"></Header>
        <div class="register-content">
            <div class="page-title">新用户注册</div>
            <div class="phone-input"><input type="tel" maxlength="11" v-model="userPhone" placeholder="请输入手机号" /><span :class="waitTime != 60? 'no-sign': 'can-sign'" @click="getCode">{{ confirmCode }}</span></div>
            <div class="code-input"><input type="tel" v-model="userCode" placeholder="请输入验证码" /> </div>
            <div class="password-input" :class="isShowPassword ? 'show-password-icon' : 'password-icon'"><input v-model="userPassword" :type="isShowPassword ? 'text' : 'password'" placeholder="请输入密码" /><span @click="toggleType"></span> </div>
            <div class="login-btn bg-blue" @click="toLogin" v-if="isCanLogin">登录</div>
            <div class="login-btn" v-else>登录</div>
        </div>
        <div class="advertisement">
            <Swiper height="174px" :list="adverTisementList" :show-dots="false" :auto="true" :loop="true"></Swiper>
        </div>
    </div>
</template>

<script>
import Header from '@/components/common/header.vue'
import { Swiper } from 'vux'
import api from '../../units/config'

export default {
    components:{Swiper,Header},
    data () {
        return {
            userPhone:'',
            userCode:'',
            userPassword:'',
            waitTime:60,
            codeToken:'',
            confirmCode:'获取验证码',
            isShowPassword:false,
            adverTisementList:[
                {
                url: 'javascript:',
                img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
                },
                {
                url: 'javascript:',
                img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
                },
                {
                url: 'javascript:',
                img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
                }
            ]
        }
    },
    computed:{
        isCanLogin () {
            if(this.userPhone !='' && this.userPassword !='' && this.userCode != '' && this.phoneVerify(this.userPhone)){
                return true
            }
            return false
        }
    },
    methods: {
        toggleType () {
            if(this.isShowPassword) this.isShowPassword = false
                else this.isShowPassword = true
        },
        toLogin () {
            let _this = this
            if(_this.userPhone == ''){
                console.log('手机号不能为空')
                return
            }
            if(_this.userPhone.length<11){
                console.log('手机号不能少于11位')
                return
            }
            if(!_this.phoneVerify(_this.userPhone)){
                console.log('手机号码格式不正确')
                return
            }
            if(_this.userCode == ''){
                console.log('验证不能为空')
                return
            }
            if(_this.userPassword == ''){
                console.log('密码不能为空')
                return
            }
            _this.httpAjax({
              method: api.common.register,
              data:{
                  "channel_num_id":100,
                  "mobile": _this.userPhone,
                  "sms_verify_code":_this.userCode,
                  "password":_this.userPassword,
                  "sms_verify_token":_this.codeToken,
                  "verify_code_type":"signup"
              }
            }).then(function(data){
              _this.local('access_token',data.access_token)
              _this.local('usr_num_id',_this.phoneNum)
              _this.$router.push('index')
            }).catch(function(error){})
        },
        getCode () {
            let _this = this 
            if(_this.waitTime != 60) return
            if(_this.userPhone == ''){
							console.log('手机号不能为空')
							return
            }
            if(_this.userPhone.length<11){
							console.log('手机号不能少于11位')
							return
            }
            if(!_this.phoneVerify(_this.userPhone)){
							console.log('手机号码格式不正确')
							return
            }
            var t = setInterval(function() {
							_this.waitTime--;
							if(_this.waitTime < 10) {
									_this.waitTime = '0' + _this.waitTime;
							}
							_this.confirmCode = '重新发送（'+_this.waitTime +'）';
							if(_this.waitTime <= 0) {
									_this.confirmCode = '获取验证码';
									_this.waitTime = 60;
									clearInterval(t);
							}
            }, 1000);
            _this.httpAjax({
              method: api.common.phoneCode,
              data:{
                  "mobile": _this.userPhone,
                  "verify_code_type":"signup"
              }
            }).then(function(data){
              _this.codeToken = data.token
            }).catch(function(errot){})
        }
    }
}
</script>


<style lang="less" scoped>
.register{
    background: #ffffff;
    padding-bottom: 348px;
    .register-content{
        padding:80px 38px 0 38px;
        .page-title{
            font-size: 60px;
            color: #008654;
        }
        .phone-input{
            margin-top: 80px;
            display: flex;
            font-size: 26px;
            height: 110px;
            line-height: 110px;
            border-bottom: 2px solid #efefef;
            .can-sign{
                color: #008654;
            }
            .no-sign{
                color: #cccccc;
            }
            input{
                flex:1;
                border: none;
                height: 100%;
            }
        }
        .code-input{
            display: flex;
            font-size: 26px;
            height: 110px;
            line-height: 110px;
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
            position: relative;
            input{
                flex:1;
                border: none;
                height: 100%;
            }
            &.password-icon{
                span{
                    &:after{
                        content:'';
                        display: inline-block;
                        width: 50px;
                        height: 46px;
                        background: url(../../assets/icons/passwordhide@3x.png) no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        right: 38px;
                        top: 50%;
                        margin-top: -23px;
                    }
                }
            }
            &.show-password-icon{
                span{
                    &:after{
                        content:'';
                        display: inline-block;
                        width: 50px;
                        height: 46px;
                        background: url(../../assets/icons/Passworddisplay@2x.png) no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        right: 38px;
                        top: 50%;
                        margin-top: -23px;
                    }
                }
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
            background: #cccccc;
            &.bg-blue{
               background: #008654; 
            }
        }
    }
    .advertisement{
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
    }
}
</style>
