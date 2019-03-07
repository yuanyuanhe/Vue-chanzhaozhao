<template>
	<div class="search-goods">
		<div class="search-box">
			<div class="back" @click="backclassify">
				<img class="backIcon" src="../../assets/images/classify/back@2x.png" />
			</div>
			<div class="search-input inline-block">
				<input class="search-content0" v-model="inputVal" @focus="searchGoods" type="text"/>
			</div>
			<span class="inline-block cancel-btn">
		        <img v-if="inputVal==''" src="../../assets/images/classify/cart@2x.png" class="icon3" @click="goToCart"/>
		        <b v-if="inputVal!=''" @click="closeSearch" class="cancle0">取消</b>
		    </span>
		</div>
		<div class="search-record-list" v-show="relevantList.length>0">
			<ul>
				<li v-for="(item,idx) in relevantList" :data-cell="item.cat_name" @click="selectOne">{{item.cat_name}}</li>
			</ul>
		</div>
		<div class="search-list" v-show="showKind==2&&getgoodList.length>0">
			<!--商品搜索的排序开始-->
			<ul class="orderBox">
				<li class="cell" :class="{'active0':sortOrder=='sold_quantity'}" data-sorts="sold_quantity" @click="selectSort">
					<div class="boxs">
						<span class="title0">综合排序</span>
						<i class="icon0"></i>
					</div>
				</li>
				<li class="cell" :class="{'active0':sortOrder=='rate_count'}" data-sorts="rate_count" @click="selectSort">
					<div class="boxs">
						<span class="title0">销量排序</span>
						<i class="icon0"></i>
					</div>
				</li>
				<li class="cell" :class="{'active0':sortOrder=='price'}" data-sorts="price" @click="selectSort">
					<div class="boxs">
						<span class="title0">价格排序</span>
						<i class="icon0"></i>
					</div>
				</li>
			</ul>
			<!--商品搜索的排序结束-->
			<div class="searhResult">
				<div class="search-content" v-for="(item,idx) in getgoodList" @click="toGoodsDetail(item)">
					<div class="tipsBox" v-if="false">
						<div class="toptips">今日上市</div>
					</div>
					<div class="goods-image" :style="{backgroundImage:'url('+(item.image_default_id==''?example0:item.image_default_id)+')'}"></div>
					<div class="goods-detail">
						<p class="goods-name">{{item.title}}</p>
						<div class="tipsBox0">
							<div class="toptips">今日上市</div>
						</div>
						<div class="goods-price">
							<span class="money-icon">{{item.price}}</span><!--/盒-->
							<span class="delprice">{{item.mkt_price}}</span>
							<div class="select-goods-box clearfix">
								<span class="reduce-icon" v-if="false"></span>
								<span class="goods-nub" v-if="false">1</span>
								<span class="add-icon"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--搜索商品的历史记录-->
		<div class="searchBox" v-show="showKind==0">
			<!--搜索历史-->
			<div class="searchHistory" v-if="searchHistorylist.length>0">
				<div class="title"><i class="icons left"></i><i class="icons right"></i>搜索历史</div>
				<ul class="gooditemBox">
					<li class="gooditem" v-for="(item,idx) in searchHistorylist" :data-cell="item" @click="selectOne">{{item}}</li>
				</ul>
			</div>
			<!--实时热搜-->
			<div class="realtimeSearch" v-if="realtimesearch!=''">
				<div class="title"><i class="icons left"></i><i class="icons right"></i>昆山昆城店 {{realtimesearch.word_title}}</div>
				<ul class="gooditemBox">
					<li class="gooditem" v-for="(item,idx) in realtimesearch.word" :data-cell="item.word_name" @click="selectOne">{{item.word_name}}</li>
				</ul>
			</div>
			<!--搜索热门品类-->
			<div class="hotSearch" v-if="realtimesearch!=''">
				<div class="title"><i class="icons left"></i>{{realtimesearch.cat_title}}</div>
				<ul class="gooditemBox">
					<li class="gooditem" v-for="(item,idx) in realtimesearch.cat" :data-cell="item.cat_name" @click="selectOne">{{item.cat_name}}</li>
				</ul>
			</div>
			<!--样式结束-->
		</div>

	</div>
</template>
<script>
	import { Scroller } from 'vux'	
	import api from './../../units/config'	
	export default {
		components: {},
		data() {
			return {
				inputVal: '', //默认输入内容为空
				showKind: 0, //选择展示的内容： 0是历史记录，1是搜索名称结果列表，2是商品列表
				sortOrder: 'sold_quantity', //排序方式，默认为综合排序
				pageIndex: 0, //分页默认的起始页数
				pageSize: '60', //页面长度
				relevantList: [], //获取商品的数据列表
				selectTitle: '', //选择商品的名称
				goodsList: [], //获取商品的列表
				searchHistorylist: [], //搜索历史
				realtimesearch: '', //实时热搜
				defaultImg: '../../../src/assets/images/classify/goods.png',
				access_token: '', //登录验证信息
			}
		},
		created() {
			
		},
		mounted() {
			this.searchHistorylist=(function(){
				let getarry=localStorage.getItem('searchHistorylist');
				if(getarry==null){
					return [];
				}else{
					return JSON.parse(getarry);
				}
			})();
			
			
			
			this.queryHistory();
		},
		watch:{   											//监控数据变化
			inputVal(curVal,oldVal){
				this.getnameListReq();
			},
		},
		methods: {
			searchGoods() {    		//聚焦搜索	
				
			},
			closeSearch() { //关闭搜索
				this.inputVal='';
				this.relevantList = [];
			},
			selectSort(ev){			//选择排序的方式
				this.sortOrder=ev.currentTarget.dataset.sorts;
				this.getgoodsListReq();	
			},
			backclassify() {     	//返回分类列表
				this.$router.push({
					path: '/classify'
				});
				
			},
			getnameListReq(callback) { 	//根据用户输入关键词,获取联想商品中文名称
				let that = this;
				if(that.inputVal != '') {
					that.$http.query({
						method: 'com.gb.soa.omp.cgoods.api.service.searchCatCount',
						data: {
							"tenantNumId": 6,
							"dataSign": 1,
							"shop_num_id": 202, //常量，待定
							"cat_name": that.inputVal,
							"page_size": that.pageSize //常量，展示个数
						},
						success: function(res) {
							if(res.data.code == 0) {
								that.relevantList = res.data.list.slice(0);
								//console.log(that.relevantList);
								if(that.relevantList.length==0){
									that.$toasts('没有查询到相关商品！');
									that.inputVal='';
								}
								if(callback!=undefined) {
									callback(res.data);
								}
							}
						},
						error: function(res) {
							console.log(res);
						}
					})
				}				
			},	
			getgoodsListReq(callback){   		//获取的商品列表
				let that = this;
				that.getgoodList=[];
				that.$http.query({
					method: api.goodsList.getlist,
					data: {
						"order_by": that.sortOrder, 
						"shop_num_id": 202, 
						"page_no": that.pageIndex, 
						"page_size": that.pageSize, 
						"cat_id": '',
						"title": that.selectTitle
					},
					success: function(res) {
						if(res.data.code == 0) {
							that.getgoodList=res.data.lists.slice(0);
							if(callback){
								callback(res.data);
							}
						}
					},
					error: function(res) {
						console.log(res);
					}
				})				
			},
			errorDo(e) {        	//如果图片加载失败，则使用默认的图片
				let idx = e.target.dataset.idx;
				this.goodsList[idx]['image_default_id'] = "../../src/assets/images/classify/goods.png";
			},
			addNumber() { 			//增加商品数量
				
				
			},
			queryHistory(callback) { 		//查询历史
				let that = this;
				that.$http.query({
					method: 'com.gb.soa.omp.cgoods.api.service.gethotwordbytype',
					data: {
						"type":"all",
						"tenantNumId":1,
						"dataSign":1
					},
					success: function(res) {
						if(res.data.code == 0) {
							that.realtimesearch=res.data;
							if(callback){
								callback(res.data);
							}
						}
					},
					error: function(res) {
						console.log(res);
					}
				})	
			},			
			toGoodsDetail(item) { 		//跳转至商品详细
				let id0=item['style_num_id'];
				this.$router.push({path: '/goodDetial',query:{"style_num_id":id0}});	
			},
			selectOne(e) { //选择一类查询商品列表
				const name=e.target.dataset.cell;
				let newarry=this.searchHistorylist.slice(0);
				newarry.push(name);
				this.searchHistorylist=Array.from(new Set(newarry));
				this.selectTitle = name;
				localStorage.setItem('searchHistorylist',JSON.stringify(this.searchHistorylist));
				this.relevantList = [];
				
				this.getgoodsListReq();
				this.showKind=2;
				
			},		
			goToCart(paras){
				this.$router.push({path: '/cart',query:{}});
			}
			
		},
		
		
		
		
		
		
	}
</script>
<style lang="less" scoped>
	/*公共方法*/
	.clear() {
		//清除浮动
		&:after {
			content: '\20';
			display: block;
			height: 0;
			clear: both;
		}
		zoom: 1;
	}
	.float(@direction: left) {
		//浮动组件
		display: inline-block;
		float: @direction;
	}
	/*样式代码*/
	.search-goods {
		background: #fff;
		padding-top: 79px;
		box-sizing: border-box;
		position: relative;
		.search-box {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 12;
			padding: 16px 21px;
			width: 100%;
			height: 79px;
			box-sizing: border-box;
			display: flex;
			background-color: #ffffff;
			border-bottom: 2px solid #DDD;
			.back {
				flex: 0 0 60px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.backIcon {
					margin-left: 4px;
					width: 38px;
					height: 38px;
				}
			}
			.search-input {
				flex: 1;
				background: #ECECEC;
				border-radius: 28px;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				&::before {
					content: '';
					display: inline-block;
					width: 38px;
					height: 38px;
					background: url(../../assets/icons/search@2x.png) no-repeat;
					background-size: 100% 100%;
					margin-left: 16px;
					margin-right: 14px;
				}
				.search-content0 {
					flex: 1;
					height: 100%;
					background: #ECECEC;
				}
			}
			.cancel-btn {
				flex: 0 0 70px;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.icon3 {
					width: 38px;
					height: 38px;
				}
				.cancle0{
					width: 100%;
					height: 45px;
					line-height: 45px;
					text-align: right;
				}
			}
		}
		.search-record-list {
			position: fixed;
			top: 79px;
			bottom: 98px;
			left: 0;
			right: 0;
			overflow: auto;
			background-color: #fff;
			z-index: 66;
			ul {
				li {
					height: 88px;
					line-height: 88px;
					padding-left: 40px;
					border-bottom: 1px solid #efefef;
					font-size: 28px;
					color: #333333;
				}
			}
		}
		.search-list {
			width: 100%;
			height: auto;
			padding-top: 80px;
			background-color: #F4F4F4;
			box-sizing: border-box;
			.orderBox {
				position: fixed;
				top: 79px;
				left: 0;
				z-index: 11;
				width: 100%;
				height: 72px;
				background: rgba(255, 255, 255, 1);
				display: flex;
				.cell {
					flex: 1;
					padding-top: 16px;
					box-sizing: border-box;
					.boxs {
						height: 40px;
						border-right: 1px solid rgba(221, 221, 221, 1);
						box-sizing: border-box;
						display: flex;
						justify-content: center;
						align-items: center;
						.title0 {
							height: 40px;
							font-size: 30px;
							font-family: PingFang-SC-Medium;
							font-weight: 500;
							color: rgba(153, 153, 153, 1);
							line-height: 40px;
						}
						.icon0 {
							width: 38px;
							height: 38px;
							background-size: 100% 100%;
							background-image: url(../../assets/images/classify/unfold1@2x.png);
						}
					}
					&:last-of-type {
						.boxs {
							border-right: none;
						}
					}
					&.active0 {
						.boxs {
							.title0{
								color: #208656;
							}
							.icon0 {
								background-image: url(../../assets/images/classify/unfold2@2x.png);
							}
						}
					}
					
					
				}
			}
			.searhResult {
				width: 100%;
				height: auto;
				.clear();
				.search-content {
					position: relative;
					width: calc(~'(100% - 8px)/2');
					height: 0;
					padding-bottom: calc(~'(108% - 8px)/2');
					background-color: #fff;
					margin-bottom: 8px;
					.float(left);
					&:nth-of-type(even) {
						margin-left: 8px;
					}
					.tipsBox,
					.tipsBox0 {
						width: 100%;
						height: auto;
						box-sizing: border-box;
						padding: 12px 28px 0 0px;
						.clear();
						.toptips {
							width: auto;
							height: 32px;
							display: inline-block;
							border-radius: 8px;
							font-size: 20px;
							font-family: PingFang-SC-Medium;
							font-weight: 500;
							padding: 0 12px;
							box-sizing: border-box;
							.float();
						}
					}
					.tipsBox {
						.toptips {
							line-height: 32px;
							background: rgba(43, 101, 60, 1);
							color: rgba(255, 255, 255, 1);
						}
					}
					.tipsBox0 {
						.toptips {
							line-height: 30px;
							background: #fff;
							color: #E9504D;
							border: 1px solid rgba(233, 80, 77, 1);
						}
					}
					.goods-image {
						width: 56%;
						height: 0;
						padding-bottom: 56%;
						background-size: 100% 100%;
						background-repeat: no-repeat;
						margin: 10px auto 10px;
					}
					.goods-detail {
						width: 100%;
						height: auto;
						padding: 0 25px;
						box-sizing: border-box;
						.goods-name {
							width: 100%;
							color: #333333;
							line-height: 36px;
							max-height: 72px;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							font-size: 26px;
							font-family: PingFang-SC-Medium;
							font-weight: 500;
							color: rgba(120, 120, 120, 1);
						}
						.goods-price {
							width: 100%;
							height: 50px;
							line-height: 50px;
							font-size: 24px;
							font-family: PingFang-SC-Medium;
							font-weight: 500;
							margin-top: 5px;
							color: #787878;
							position: relative;
							.money-icon {
								/*钱的符号与数字保持统一对齐*/
								color: rgba(233, 80, 77, 1);
								font-size: 28px;
								&::before {
									vertical-align: inherit;
								}
							}
							.delprice {
								margin-left: 35px;
								font-size: 28px;
								color: #999999;
								text-decoration: line-through;
								&:before {
									content: ' \FFE5';
									display: table-cell;
									vertical-align: inherit;
								}
								&:after {
									content: ' ';
									display: table-cell;
									vertical-align: inherit;
								}
							}
							.select-goods-box {
								position: absolute;
								right: 0px;
								bottom: -5px;
								.reduce-icon {
									float: left;
									display: inline-block;
									width: 50px;
									height: 50px;
									background: url(../../assets/icons/icon_delete@2x.png) no-repeat;
									background-size: 100% 100%;
								}
								.goods-nub {
									height: 50px;
									line-height: 50px;
									display: inline-block;
									padding: 0 22px;
									float: left;
								}
								.add-icon {
									float: left;
									display: inline-block;
									width: 50px;
									height: 50px;
									background: url(../../assets/icons/icon_add@2x.png) no-repeat;
									background-size: 100% 100%;
								}
							}
						}
					}
				}
			}
		}
		/*搜索样式*/
		.searchBox {
			width: 100%;
			height: calc(~'100vh - 175px');
			padding: 46px 40px 0px;
			box-sizing: border-box;
			.searchHistory,
			.realtimeSearch,
			.hotSearch {
				width: 100%;
				height: auto;
				.title {
					width: 100%;
					height: 40px;
					position: relative;
					padding: 0 50px;
					box-sizing: border-box;
					font-size: 24px;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(154, 154, 154, 1);
					line-height: 40px;
					.icons {
						position: absolute;
						top: 1px;
						width: 38px;
						height: 38px;
						background-size: 100% 100%;
						&.left {
							left: 1px;
						}
						&.right {
							right: 1px;
						}
					}
				}
				.gooditemBox {
					width: 100%;
					height: auto;
					.clear();
					.gooditem {
						.float(left);
						width: auto;
						height: 44px;
						border-radius: 22px;
						background: rgba(236, 236, 236, 1);
						font-size: 24px;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(27, 27, 27, 1);
						line-height: 44px;
						margin-right: 20px;
						margin-top: 24px;
						padding: 0 22px;
						box-sizing: border-box;
					}
				}
			}
			.searchHistory {
				margin-bottom: 36px;
				.title>.icons {
					&.left {
						background-image: url(../../assets/icons/history@2x.png);
					}
					&.right {
						background-image: url(../../assets/icons/delete@2x.png);
					}
				}
			}
			.realtimeSearch {
				margin-bottom: 36px;
				.title>.icons {
					&.left {
						background-image: url(../../assets/icons/map@2x.png);
					}
					&.right {
						background-image: url(../../assets/icons/refresh@2x.png);
					}
				}
				.gooditemBox>.gooditem {
					&.active {
						color: #E9504D;
						padding-left: 60px;
						position: relative;
						&:before {
							content: '';
							position: absolute;
							top: 3px;
							left: 18px;
							width: 38px;
							height: 38px;
							background-size: 100% 100%;
							background-image: url(../../assets/icons/hot@2x.png);
						}
					}
				}
			}
			.hotSearch {
				.title>.icons {
					&.left {
						background-image: url(../../assets/icons/discount@2x.png);
					}
				}
			}
		}
	}
</style>
