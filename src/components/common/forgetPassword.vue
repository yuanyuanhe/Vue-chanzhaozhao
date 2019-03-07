<template>
    <div class="register">
			<div class="register-content">
				<div class="code-info">验证码已发送至 138****9999</div>
        <div class="phone-input"><input type="tel" v-model="userPhone" placeholder="请输入手机号" /><span class="color-blue">获取验证码</span></div>
        <div class="code-input"><input type="tel" v-model="userCode" placeholder="请输入验证码" /> </div>
        <div class="password-input"><input type="password" v-model="userPassword" placeholder="密码为6~8位，必须包含数字和字母" /> </div>
				<div class="login-btn">提交</div>
			</div>
    </div>
</template>

<script>

export default {

	data () {
		return {
			userPhone:'',
			userCode:'',
      userPassword:''
		}
	},
  created(){
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
