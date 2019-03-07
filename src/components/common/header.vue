<template>
	<div class="flex header tc font-32">
		<span class="prev-btn pl30" @click="forward"></span>
		<span class="center-title">
			<span v-if="title">{{ title }}</span>
			<span v-if="isShowNum && num > 0">({{num}})</span>
		</span>
		<span class="right-btn pr30">
			<slot name="rightBtn"></slot>
		</span>
	</div>
</template>
<script>
export default {
	props:['title',"isShowNum"],
	data () {
		return {
			num: 0,
		}
	},
	methods:{
		forward () {
			this.$router.go(-1);
		}
	},
	computed: {
    listenNum() {
      return this.$store.state.cartNum.count;
    }
  },
  watch: {
    listenNum: function(oldVal,newVal){
			console.log(oldVal+ "..." + newVal)
			this.num = this.$store.state.cartNum.count;
    }
	},
	mounted(){
		this.num = this.$store.state.cartNum.count;
	}
}
</script>
<style lang="less" scoped>
@import "../../assets/css/common";
.header{
	position: relative;
	height: 128px;
	line-height: 128px;
	background: @white;
	color: @text-black;
	border-bottom: 1px solid @light-white;
	.prev-btn{
		width: 100px;
		height: 100%;
		display: flex;
		align-items: center;
		text-align: left;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0;
		&:before{
			content: '';
			width: 20px;
			height: 36px;
			background: url(../../assets/icons/arrow_prev.png) no-repeat;
			background-size: 100% 100%;
			display: inline-block;
		}
	}
	.center-title{
		flex: 1;
	}
}
</style>


