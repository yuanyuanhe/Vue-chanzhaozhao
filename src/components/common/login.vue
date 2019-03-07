<template>
	<div class="app-container">
		<Header style="background:#ffffff;"></Header>
		<div class="logo">
			<img src="../../assets/images/login/logo.png" alt="">
		</div>
		<ul class="op">
			<li :class="isShowDeletePhone ? 'userphone-icon' :''">
				<input class="phoneNum" type="tel" maxlength="11" v-model="phoneNum" placeholder="手机号" />
				<span @click="deletePhone"></span>
			</li>
			<li class="password" :class="isShowPassword ? 'show-password-icon' : 'password-icon'">
				<input class="validate" :type="isShowPassword ? 'text' : 'password'" v-model="accountPassword" placeholder="密码" />
				<span @click="toggleType"></span>
			</li>
		</ul>
		<div class="login-btn can-login" @click="logins" v-if="isCanLogin">登录</div>
		<div class="login-btn" v-else>登录</div>
		<div class="login-question clearfix"><span class="fl">还没有账户?马上<span class="color-blue" @click="toSignUp">注册</span></span><span class="fr" @click="toSetPassword">忘记密码?</span> </div>
		<div class="other-account">
			<div class="account-top">社交账号登录</div>
			<div class="account-list">
				<div class="wechat inline-block"></div>
				<div class="qq inline-block"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/common/header.vue'
  import api from '../../units/config'

	export default {
		components:{
      Header
		},
		data() {
			return {
				confirmCode: '获取验证码',
				codeTimes: 60,
				phoneNum: '', //用户输入的手机号码 15862687132
				accountPassword:'',// 123456
				isShowPassword:false
			}
		},
		computed:{
			isShowDeletePhone () {
				if(this.phoneNum !='') return true
				return false
			},
			isCanLogin () {
				if(this.phoneNum !='' && this.accountPassword !='' && this.phoneVerify(this.phoneNum)){
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
			deletePhone () {
				this.phoneNum=""
			},
			logins () {
				let _this = this 
				var reg = /^[1][3,4,5,7,8][0-9]{9}$/
				if(_this.phoneNum == ''){
					console.log("手机号不能为空")
					return
				}
				if(_this.phoneNum.length<11){
					console.log("手机号不能少于11位")
					return
				}
				if(!reg.test(_this.phoneNum)){
					console.log("手机号格式不正确")
					return
				}
				if(_this.accountPassword==""){
					console.log("密码不能为空")
					return
				}
        _this.httpAjax({
					method: api.common.login,
					data:{
						"account": _this.phoneNum,
						"password": _this.accountPassword,
						"appkey": null
					}
        }).then(function(data){
          _this.local('access_token',data.access_token)
          _this.local('usr_num_id',_this.phoneNum)
          _this.local('phone',_this.phoneNum)
          _this.$router.push('index')
        }).catch(function(error){})
			},
			toSignUp () {
				this.$router.push('register')
			},
			toSetPassword () {
				this.$router.push('forgetpassword')
			},
			showPosition () {
				this.showPositionValue = true
			}
		},
		mounted() {
			this.$store.dispatch('footerStatus/hideFooter')
    }
	}
</script>

<style lang="less" scoped>
	.app-container {
		background: #ffffff;
		.logo{
			padding-top: 35px;
			text-align: center;
			img{
				width:247px;
        height:280px;
        margin:0 auto;
			}
		}
		.op {
			padding: 0 38px;
			margin-top: 120px;
			list-style: none;
			li {
				&.userphone-icon{
					span{
						&:after{
							content:'';
							display: inline-block;
							width: 50px;
							height: 46px;
							background: url(../../assets/icons/userdelete@2x.png) no-repeat;
							background-size: 100% 100%;
							position: absolute;
							right: 38px;
							top: 50%;
							margin-top: -23px;
						}
					}
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
				position: relative;
				display: flex;
				align-items: center;
				.phoneNum{
					flex: 1;
					padding-left:20px;
					font-size: 32px;
					height:90px;
					border: none;
					border-bottom:2px solid #EFEFEF;
					box-shadow: none;
					outline: none;
					&::after{
						content: '';
						display: inline-block;
					}
				}
				.validate{
					flex: 1;
					padding-left:20px;
					font-size: 32px;
					height:90px;
					border: none;
					border-bottom:2px solid #EFEFEF;
					box-shadow: none;
					outline: none;
				}
				em{
					position: absolute;
					top:30px;
					right:0;
					font-style: normal;
				}
			}
		}
		.login-btn {
			width: 670px;
			height: 100px;
			line-height: 100px;
			text-align: center;
			font-size:32px;
			display: block;
			background-color: #CCCCCC;
			border:2px solid #CCCCCC;
			box-shadow: none;
			outline: none;
			margin: 72px auto 32px auto;
			border-radius: 10px;
			color: #fff;
			-webkit-tap-highlight-color: transparent;
		}
		.can-login{
			background: #007440;
		}
		.login-question{
			color:#999999;
			font-size: 28px;
			padding: 0 38px;
			.color-blue{
				text-decoration: underline;
				padding-bottom: 4px;
			}
			.fr{
				padding-right: 50px;
			}
		}
		.other-account{
			margin-top: 102px;
			font-size: 28px;
			color: #cccccc;
			text-align: center;
			.account-top{
				display: flex;
				align-items: center;
				justify-content: center;
				&:before{
					content: '';
					display: inline-block;
					width: 214px;
					height: 2px;
					border-bottom: 2px solid #efefef;
					margin-right: 38px;
				}
				&:after{
					content: '';
					display: inline-block;
					width: 214px;
					height: 2px;
					border-bottom: 2px solid #efefef;
					margin-left: 38px;
					vertical-align: middle;
				}
			}
			.account-list{
				margin-top: 40px;
				.wechat{
					width: 100px;
					height: 100px;
					background: url(../../assets/images/login/logo.png) no-repeat;
					background-size: 100% 100%;
					border-radius: 100%;
					overflow: hidden;
					margin-right: 38px;
				}
				.qq{
					width: 100px;
					height: 100px;
					background: url(../../assets/images/login/logo.png) no-repeat;
					background-size: 100% 100%;
					border-radius: 100%;
					overflow: hidden;
				}
			}
		}
	}
</style>
