<template>
	<div class="classify">
		<Header title="分类"></Header>
		<div class="classify-search pt16 pb16 pl20 pr20">
			<!--<span class="inline-block location-icon"></span>
			<span class="inline-block txt-ellipsis location-text">建德花园2000号</span>-->
			<div class="search-btn" @click="goSearch">
				<p class="search-box">搜索店内商品</p>
			</div>
		</div>
		<div class="classify-list" :style="{ height:contentHeight+'px'}">
			<div class="left">
				<scroller lock-x :scrollbaY=false :style="{ height:contentHeight+'px'}">
					<ul>
						<li @click="selectStair(item.cat_id)" class="txt-ellipsis" :class="levelId == item.cat_id ? 'selected' : '' " v-for="item in classifyData" :key="item.cat_id">{{ item.cat_name}}</li>
					</ul>
				</scroller>
			</div>
			<div class="right">
				<div class="filter">
					<div @click="changeOrderBy" class="condition" :class="selectOrderBy == orderByList[0]?'selected':'' " :data-orderby="orderByList[0]">综合排序</div>
					<div @click="changeOrderBy" class="condition" :class="selectOrderBy == orderByList[1]?'selected':'' " :data-orderby="orderByList[1]">销量排序</div>
					<div @click="changeOrderBy" class="condition sort-price" :class="selectOrderBy == orderByList[2]?'selected':'' " :data-orderby="orderByList[2]">价格排序</div>
				</div>
				<div class="advertisement">
					<Swiper class="advertisement-banner" :list="bannerList" :show-dots="bannerSet.showdots" :auto="bannerSet.auto" :loop="bannerSet.loop" :height="bannerSet.height"></Swiper>
				</div>
				<div class="filter-detail">
					<div class="filter-show">
						<div class="filter-parent">
							<scroller lock-y :scrollbar-x=false>
								<ul :style="{ width:classifyWidth+'px' }" ref="classifys">
									<li class="txt-ellipsis" :class="secondClassifyId == item.cat_id ? 'selected' : ''" @click="selectGoodClassify(item.cat_id)" v-for="item in secondClassifyList" :key="item.cat_id">{{ item.cat_name }}</li>
								</ul>
							</scroller>
						</div>
						<div class="up-icon" :class="{'up':isOpen}" @click="openClassify"></div>
					</div>
				</div>
				<div class="goods-list">
					<div class="showBox" v-show="isOpen">
						<div class="bg" @click="openClassify"></div>
						<ul>
							<li class="txt-ellipsis" :class="secondClassifyId == item.cat_id ? 'selected' : ''" @click="selectGoodClassify(item.cat_id)" v-for="item in secondClassifyList" :key="item.cat_id">{{ item.cat_name }}</li>
						</ul>
					</div>
					<scroller lock-x :scrollbaY=false :style="{ height:rightContentHeight+'px'}" ref="scrollList" @on-scroll-bottom="onScrollBottom">
						<div>
							<div class="goods-intro" @click="toGoodsDetail(item)" v-for="(item,index) in goodsList" :key="index">
								<img class="goods-img" :src="item.image_default_id" @error="errorDo" :data-idx="index" />
								<div class="goods-detail txt-ellipsis">
									<p class="txt-ellipsis">{{ item.title }}</p>
									<p class="color-blue pt20">￥{{item.price}}</p>
									<p class="font-20 pt28 color-gray">门市价:<span class="ml10">￥{{item.mkt_price}}</span></p>
								</div>
								<div class="add-goods clearfix">
									<span class="sub-icon fl" @click="reduceNumber"></span>
									<span class="goods-nub fl">6</span>
									<span class="add-icon fl" @click="addNumber"></span>
								</div>
							</div>
						</div>
					</scroller>
				</div>
			</div>
		</div>

	</div>

</template>

<script>
	import Header from '@/components/common/header.vue'
	import { Swiper, Scroller } from 'vux'
	import api from './../units/config'
	import { setTimeout } from 'timers';

	export default {
		name: 'classify',
		components: {
			Swiper,
			Header,
			Scroller
		},
		data() {
			return {
				bannerList: [],
				bannerSet:{
					auto:true,   				//是否自动轮播
					showdots:false,				//是否显示提示点
					loop:true,					//是否循环
					height:'2.346667rem',		//高度值
				},
				contentHeight: 0,
				rightContentHeight: 0,
				initIdx: 0, //默认去取第一条大类
				classifyData: [], //左边大分类列表
				goodsList: [], //获取的商品列表
				levelId: 0, //大分类选中的分类id
				secondClassifyList: [], //小分类列表
				secondClassifyId: 0, //小分类的选中的分类Id
				orderByList: ['sold_quantity', 'rate_count','price'], //三种排序的方式
				selectOrderBy: 'price', //初始默认的排序方式
				pageIndex: 0, //商品列表分页的初始页数
				pageSize: 15, //商品列表每页的数据长度
				isLoad: true, //是否可以继续加载，true是可以继续加载
				classifyWidth: 0,
				isOpen: false
			}
		},
		methods: {
			openClassify() {
				if(this.isOpen) this.isOpen = false
				else this.isOpen = true
			},
			addNumber() { //增加商品数量
				event.stopPropagation()
				// console.log("add")
			},
			reduceNumber() { //减少商品数量
				event.stopPropagation()
				// console.log("reduce")
				
				
			},
			toGoodsDetail(item) { //跳转至商品详细
				let id0=item['style_num_id'];
				this.$router.push({path: '/goodDetial',query:{"style_num_id":id0}});
			},
			initFetch() { //切换分类时候初始化商品列表
				this.pageIndex = 0 //页数置为0
				this.isLoad = true //是否可以继续加载
				this.$refs.scrollList.reset({
					top: 0
				})
			},
			//选择左边大分类
			selectStair(id) {
				let that = this
				that.initFetch()
				this.levelId = id
				this.classifyData.forEach((item, index) => {
					if(id == item.cat_id) {
						this.secondClassifyList = item.child_list
					}
				})
				this.selectOrderBy = this.orderByList[0]
				that.secondClassifyId = that.secondClassifyList[0].cat_id
				that.selectGoodClassify(that.secondClassifyList[0].cat_id)
				this.$nextTick(() => {
					let liWidth = this.$refs.classifys.getElementsByTagName('li')[0].clientWidth,
						liLength = this.$refs.classifys.getElementsByTagName('li').length + 1;
					this.classifyWidth = liWidth * liLength
				})
			},
			//选择右边小分类
			selectGoodClassify(id) {
				this.initFetch();
				this.secondClassifyId = id;
				this.isOpen = false;
				this.selectOrderBy = this.orderByList[0];
				this.goodsList = [];
				this.fetchGoodsList((res0) => {
					this.goodsList = res0.data.lists;
				})
			},
			//选择orderBy
			changeOrderBy(e) {
				this.initFetch();
				this.selectOrderBy = e.target.dataset.orderby;
				this.isOpen = false;
				this.goodsList = [];
				this.fetchGoodsList((res0) => {
					this.goodsList = res0.data.lists;
				});
				this.$refs.scrollList.reset({
					top: 0
				});
			},
			fetchClassifyData() { //获取商品分类的大类和小类
				let that = this;
				this.secondClassifyList = []; //小类列表清空
				that.$http.query({
					method: api.classify.getClassify,
					data: {
						"tenantNumId": 6,
						"dataSign": 1,
						"cat_depth": "0",
						"shop_id": 202
					},
					success: function(res) {
						that.classifyData = res.data.categorys;
						that.levelId = that.classifyData[that.initIdx].cat_id;
						that.selectStair(that.classifyData[that.initIdx].cat_id);
						that.secondClassifyId = that.secondClassifyList[0].cat_id;
						that.classifyData.forEach((item, idx) => {
							if(item['cat_banner'] != '' && item['cat_banner'] != null && item['cat_banner'] != undefined) {
								that.bannerList.push({
									url: 'javascript:',
									img: item['cat_banner']
								});
							}
						});
						/*console.log(that.bannerList);*/
					},
					error: function(res) {
						console.log(res);
					}
				})
			},
			fetchGoodsList(callback) { //获取的商品列表
				let that = this;
				that.$http.query({
					method: api.goodsList.getlist,
					data: {
						"order_by": that.selectOrderBy, //排序可选参数  price   sold_quantity  rate_count
						"shop_num_id": 202, //附近门店的shopId是全局变量
						"page_no": that.pageIndex, //分页开始不可省略，常量
						"page_size": that.pageSize, //分页尺码不可省略，常量
						"cat_id": that.secondClassifyId,
						"title": ''
					},
					success: function(res) {
						if(res.data.code == 0) {
							callback(res)
						}
					},
					error: function(res) {
						console.log(res);
					}
				})
			},
			onScrollBottom() {
				let that = this;
				if(!this.isLoad) return;
				this.isLoad = false;
				this.pageIndex += 1;
				this.fetchGoodsList((res0) => {
					that.goodsList = that.goodsList.concat(res0.data.lists);
					setTimeout(function() {
						that.isLoad = true;
					}, 500);
				})
			},
			errorDo(e) { //如果图片加载失败，则使用默认的图片
				let idx = e.target.dataset.idx;
				this.goodsList[idx]['image_default_id'] = "../../src/assets/images/classify/goods.png";
			},
			goSearch(e) {
				this.$router.push({
					path: '/searchgoods'
				})
			}
		},
		mounted() {
			let pageHeight = document.body.offsetHeight,
				headerHeight = document.getElementsByClassName('header')[0].offsetHeight,
				searchHeight = document.getElementsByClassName('classify-search')[0].offsetHeight,
				footHeight = document.getElementsByClassName('footer-box')[0].offsetHeight,
				rightTop = document.getElementsByClassName('goods-list')[0].offsetTop;
			this.contentHeight = pageHeight - headerHeight - searchHeight - footHeight
			this.rightContentHeight = this.contentHeight - (rightTop - headerHeight - searchHeight)
		},
		created() {
			this.fetchClassifyData()
		}
	}
</script>

<style lang="less" scoped>
	.classify {
		.classify-search {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #efefef;
			.location-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 10px;
				&:before {
					content: '';
					display: inline-block;
					width: 40px;
					height: 40px;
					background: url(./../assets/images/classify/LocationIcon.png) no-repeat center center;
					background-size: 100% 100%;
				}
			}
			.location-text {
				width: 100px;
			}
			.search-btn {
				flex: 1;
				margin-left: 20px;
				margin-right: 20px;
				position: relative;
				&:before {
					content: '';
					width: 34px;
					height: 34px;
					background: url(./../assets/images/classify/searchIcon.png) no-repeat;
					background-size: 100% 100%;
					display: inline-block;
					position: absolute;
					top: 50%;
					left: 26px;
					margin-top: -17px;
				}
				.search-box {
					width: 100%;
					height: 56px;
					border-radius: 28px;
					background: #efefef;
					font-size: 24px;
					padding-left: 88px;
					box-sizing: border-box;
					line-height: 56px;
				}
			}
		}
		.classify-list {
			color: #333333;
			display: flex;
			.left {
				width: 152px;
				ul {
					width: 152px;
					background: #f3f4f6;
					position: relative;
					li {
						width: 152px;
						height: 114px;
						line-height: 114px;
						padding: 0 20px;
						font-size: 24px;
						box-sizing: border-box;
						text-align: center;
						position: relative;
						&.selected {
							background: #ffffff;
							&:before {
								width: 4px;
								height: 100%;
								content: '';
								background-color: #2b653c;
								position: absolute;
								top: 0;
								left: 0;
								z-index: 12;
							}
						}
					}
				}
			}
			.right {
				flex: 1;
				overflow: hidden;
				padding: 0 20px;
				background-color: #fff;
				.filter {
					height: 84px;
					line-height: 84px;
					text-align: center;
					display: flex;
					.condition {
						flex: 1;
						&.selected {
							color: #208656;
							&.sort-price {
								&:after {
									content: '';
									width: 12px;
									height: 14px;
									display: inline-block;
									background: url(./../assets/images/classify/sort_select.png) no-repeat;
									background-size: 100% 100%;
									margin-left: 18px;
								}
							}
						}
					}
					.sort-price {
						&:after {
							content: '';
							width: 12px;
							height: 14px;
							display: inline-block;
							background: url(./../assets/images/classify/sort_normal.png) no-repeat;
							background-size: 100% 100%;
							margin-left: 18px;
						}
					}
				}
				.advertisement-banner {
					height: 176px;
				}
				.filter-detail {
					height: 81px;
					.filter-show {
						width: 100%;
						border-bottom: 1px solid #dcdcdc;
						position: relative;
						.filter-parent {
							flex: 1;
							height: 81px;
							position: relative;
							ul {
								height: 80px;
								position: relative;
								li {
									width: 120px;
									height: 44px;
									line-height: 44px;
									padding: 18px 0;
									text-align: center;
									float: left;
									&.selected {
										color: #208656;
										border-bottom: 1px solid #208656;
									}
								}
							}
						}
						.up-icon {
							width: 56px;
							height: 44px;
							display: block;
							line-height: 44px;
							background: #fbf9fe;
							text-align: center;
							border-left: 1px solid #dcdcdc;
							position: absolute;
							top: 50%;
							right: 0;
							margin-top: -22px;
							z-index: 11;
							&:before {
								content: '';
								display: inline-block;
								background: url(./../assets/images/classify/arrow_down.png) no-repeat;
								background-size: 100% 100%;
								width: 26px;
								height: 14px;
								transition: transform 0.2s;
							}
							&.up {
								&:before {
									transform: rotateX(180deg);
								}
							}
						}
					}
				}
				.goods-list {
					position: relative;
					.showBox {
						.bg {
							position: absolute;
							width: 100%;
							height: 100%;
							top: 0;
							left: 0;
							z-index: 9;
							background: rgba(0, 0, 0, 0.5);
						}
						ul {
							padding-bottom: 16px;
							position: absolute;
							width: 100%;
							top: 0;
							z-index: 10;
							background: #ffffff;
							li {
								float: left;
								width: 110px;
								height: 48px;
								line-height: 48px;
								text-align: center;
								border-radius: 5px;
								font-size: 24px;
								color: #666666;
								background: #f3f4f6;
								margin-right: 20px;
								margin-top: 16px;
								&.selected {
									background: #208656;
									color: #ffffff;
								}
							}
						}
					}
					.goods-intro {
						display: flex;
						padding: 20px 0;
						border-bottom: 1px solid #efefef;
						position: relative;
						.goods-img {
							width: 128px;
							height: 128px;
							margin-left: 10px;
							margin-right: 20px;
							display: inline-block;
						}
						.goods-detail {
							flex: 1;
							font-size: 28px;
						}
						.add-goods {
							position: absolute;
							bottom: 10px;
							right: 0;
							.sub-icon {
								width: 50px;
								height: 50px;
								display: inline-block;
								background: url(./../assets/icons/icon_delete@2x.png) no-repeat;
								background-size: 100% 100%;
							}
							.goods-nub {
								width: 50px;
								height: 50px;
								line-height: 50px;
								text-align: center;
								display: inline-block;
							}
							.add-icon {
								width: 50px;
								height: 50px;
								display: inline-block;
								background: url(./../assets/icons/icon_add@2x.png) no-repeat;
								background-size: 100% 100%;
							}
						}
					}
				}
			}
		}
	}
</style>