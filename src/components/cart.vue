<template>
 	<div class="cart">
    <Header title="购物车" isShowNum="true">
      <span slot="rightBtn" @click="showEdit">
        {{isEdit ? '完成': '编辑'}}
      </span>
    </Header>
    <div class="cart-container">
      <div class="container cart-list-container">
        <!-- 购物车有产品 -->
        <div v-if="cartList && cartList.length" style="width: 100%">
          <div v-for="(item,index) in cartList" :key="index">
            <slideDelete @delEvent="delPro(index,0)">
              <div class='flex cart-list-item'>
                <div class="cart-item-left">
                  <div @click="singleChecked(index)">
                    <input class="checkbox" type="checkbox" :value="item.cart_id" :checked="item.is_checked == 1 ? 'true' : ''">
                    <img v-if="item.is_checked == 1" class="img-inline check-icon" src="../assets/icons/checkActive.png"/>
                    <img v-else class="img-inline check-icon" src="../assets/icons/checkDefault.png" />
                  </div>
                </div>
                <div class="cart-item-right">
                  <div class="pro-info">
                    <div class="item-img" @click="goToDetailPage('cart','goodsdetail',item.stype_num_id)">
                      <img src="item.img_default_id" />
                      <div v-if="item.status!='onsale'" class="out-of-stock">
                        {{item.status =="outofstock" ? "库存紧张" : item.status=="outofsale" ? "商品下架": "商品不存在"}}
                      </div>
                    </div>
                    <div class="item-detail">
                      <!-- <img class="img-inline del-img" src="../assets/icons/del.png" @click="delModal(index)"/> -->
                      <div class="item-name" @click="goToDetailPage('cart','goodsdetail',item.stype_num_id)">
                        {{item.title}}
                      </div>
                      <div class="item-desc">{{item.spec_info}}</div>
                      <div class="item-tag-list">
                        <!-- <div class="tag" :v-for="(tag,index) in cartList[index].tagList" :key="index">
                          <div :class="['item-tag', tag == '明日送达' ? 'yellow' : 'green']">
                            {{tag}}
                          </div>
                        </div> -->
                      </div>
                      <div class="item-total">
                        <div class="item-price">
                          <span class="price-symbol">￥{{item.priceSymbol}}</span>
                          <span class="price-value">{{item.price.total_price}}</span>
                        </div>
                        <!-- qtybox -->
                        <div class="item-num">
                          <!-- <qtyBox :qtyItem.sync="item" :qtyList.sync="cartList"></qtyBox> -->
                          <div class="qty-box">
                            <div class="btn btn-left" @click="decreased(index)">-</div>
                            <input type="text" v-model="item.quantity" @blur="changeVal(index)"/>
                            <div :class="['btn btn-right', item.quantity >= item.store ? 'disabled' : '']" @click="increased(index)">+</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 促销和赠品 -->
                  <div class="addtional-info" v-if="cartItemGifts.length || cartList[index].promotion">
                    <div class="addtion-detail promotion-container" v-if="cartList[index].promotion" >
                      <div class="info-name prom-name">
                        促销：
                      </div>
                      <div class="info-list prom-info">
                        {{cartList[cartIndex].promotion}}
                      </div>
                      <div class="info-btn prom-btn">
                        修改
                      </div>
                    </div>
                    <div class="addtion-detail gift-container" v-if="cartItemGifts.length">
                      <div class="info-name gift-name">
                        赠品：
                      </div>
                      <div class="info-list gift-info">
                        <div class="gift-detail" v-for="(gift,index) in cartItemGifts"  :key="index">
                          {{gift.title}} * {{gift.quantity}}
                        </div>
                      </div>
                      <div class="info-btn gift-btn">
                        更换
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </slideDelete>
          </div>
        </div>
        <!-- 缺货商品列表 -->
        <div v-if="outOfStockList && outOfStockList.length" class="gray-container">
          <div class="out-stock-head text-green">
            <span class="btn-favorite" @click="addToFavRequest">
              移入收藏夹
            </span>
            <span class="btn-del-out" @click="removeOutStockRequest">
              清空缺货商品
            </span>
          </div>
          <div v-for="(item,index) in outOfStockList" :key="index">
            <div class='flex cart-list-item'>
              <div class="cart-item-left color-gray">
                暂<br>时<br>缺<br>货
              </div>
              <div class="cart-item-right">
                <div class="pro-info">
                  <div class="item-img" @click="goToDetailPage('cart','goodsdetail',item.stype_num_id)">
                    <img src="item.img_default_id" />
                  </div>
                  <div class="item-detail">
                    <div class="item-name" @click="goToDetailPage('cart','goodsdetail',item.stype_num_id)">
                      {{item.title}}
                    </div>
                    <div class="item-desc">{{item.spec_info}}</div>
                    <div class="item-tag-list">
                      <!-- <div class="tag" :v-for="(tag,index) in cartList[index].tagList" :key="index">
                        <div :class="['item-tag', tag == '明日送达' ? 'yellow' : 'green']">
                          {{tag}}
                        </div>
                      </div> -->
                    </div>
                    <div class="item-total">
                      <div class="item-price">
                        <span class="price-symbol">￥{{item.priceSymbol}}</span>
                        <span class="price-value">{{item.price.total_price}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 购物车无商品 -->
        <div v-if="!cartList.length"  class="cart-container cart-empty-content">
          <img class="empty-img" src="../assets/images/cartEmpty.png" />
          购物车里啥都没有
        </div>
        <!-- 推荐商品 -->
        <div v-if="recommendList && recommendList.length > 0" class="container cart-recommend">
          <div class="recommend-title">
            推荐商品
          </div>
          <div class="recommend-list">
            <div class="pro-item-container" v-for="(pro,index) in recommendList" :key="index">
              <proItem :pro="pro" @addToCartRequest="addToCartRequest"></proItem>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 50px;"></div>
        <div v-if="cartList && cartList.length" class="flex cart-total">
          <div class="check-all" @click="checkedAllEvent">
            <input class="checkbox" type="checkbox" :value="isCheckedAll" :checked="isCheckedAll">
            <img v-if="isCheckedAll" class="img-inline check-icon" src="../assets/icons/checkActive.png"/>
            <img v-else class="img-inline check-icon" src="../assets/icons/checkGreen.png" />全选
          </div>
          <div class="all-info">
            <div v-if="!isEdit">
              <span class="color-gray">不含运费,</span>
              <span class="price-symbol">共￥</span>
              <span class="price-value">{{total.total_price ? total.total_price : 0}}</span>
            </div>
            <div v-else>
              <span>已选择 {{total.number ? total.number : 0}} 件</span>
            </div>
          </div>
          <div v-if="!isEdit" class="check-btn" @click="goToCheckOut">
            结算
            <span>({{total.number ? total.number : 0}})</span>
          </div>
          <div v-if="isEdit" class="check-btn">
            <span class="edit-btn" @click="delModal(null,1)">删除选中商品</span>
          </div>
        </div>
      </div>
    </div>
     
  </div>
</template>

<script>
import Header from "../components/common/header";
import proItem from "../components/pro-list";
import slideDelete from "../components/common/slideDelete";
import api from './../units/config';
import Request from "../units/request";
import cartNum from "../store/store";
// data
import cartPageMock from "../mock/cart";
import recommendMock from "../mock/recommend";
export default {
  name: 'cart',
  components: {
    Header,
    proItem,
    slideDelete
  },
  data () {
    return {
      usrNumId: 15896705091,
			mode: "cart",
			platform: 'app',
			shopId: 202,
			empNumId: 1805230010000,
			accessToken:'1e189ad7c046499b9e32cdccae3af421',
			objType: 'item',
			appOperationSequenceNumber: '1807020030025999',
			cartAddr: {
				addrDetail: "武林广场（地铁站）",
				userName: "韩梅梅",
				userPhone: "138****5521"
			},
      cartList: [],
      outOfStockList:[],
			total: {},
      cartItemGifts: [],
      recommendList: [],
			checkedList: [],
			isCheckedAll: false,
			num: 0, //产品数量
			isHideDel: true, //判断是否显示删除模态框
      delIndex: 0, //判断删除哪个商品
      isEdit: false,
    }
  },
  watch: {

  },
  methods: {
    goToDetailPage: function (fromPage,toPage,arg) {
      this.$router.push({
        path: toPage,
        query: {
          from: fromPage,
          style_num_id: arg,
        }
      })
    },
    goToCheckOut: function () {
      this.$router.push({
        path: 'checkout',
        query: {
          appOperationSequenceNumber: this.appOperationSequenceNumber,
        }
      })
    },
    // 公用提示
    comToast: function(msg,position) {
		  this.$vux.toast.text(msg, position ? position : 'middle');
		},
    // 获取购物车商品列表
		getInitList: function(){
			var this_ = this;
			Request.query({
        method: 'gb.mall.cart.item.get',
        data:{
					//"usr_num_id": this_.userNumId,
					"mode": this_.mode,
					"platform": this_.platform,
					"shop_id": this_.shopId,
					//"emp_num_id": this_.empNumId,
					"access_token": this_.accessToken,
        },
        success:function(res){
        	if(res.data.code == 0) {
            // checkedall 为0表示全选状态，为-1表示选择部分
            this_.isCheckedAll = res.data.checkedall == 0 ? true : false;
            // 获取门店信息
            if(res.data.current_cart && res.data.current_cart.shop_id) {
              this_.shopId = res.data.current_cart.shop_id;
            }
            // 购物车商品列表
						if(res.data.current_cart && res.data.current_cart.cartitemlist && res.data.current_cart.cartitemlist.length) {
              this_.cartList = res.data.current_cart.cartitemlist;
              this_.checkedList = [];
              for (var i=0; i< this_.cartList.length; i++) {
                this_.checkedList.push(this_.cartList[i].cart_id);
              }
						} else {
							this_.cartList = [];
            }
            // 购物车数量总计
						if(res.data.get_cart_total) {
							this_.total = res.data.get_cart_total;
						} else {
							this_.total = null;
            }
            // 购物车促销计算
						if(res.data.promotion_cauclate && res.data.promotion_cauclate.app_operation_sequence_number){
							this_.appOperationSequenceNumber = res.data.promotion_cauclate.app_operation_sequence_number;
            }
            // 购物车缺货商品列表
            if(res.data.stock_out_list  && res.data.stock_out_list.length) {
              this_.outOfStockList = res.data.stock_out_list;
            } else {
              this_.outOfStockList = [];
            }
            this_.recommendListRequest();
					} else {
						this_.comToast(res.data.message)
					}
        },
        error: function(res){
          console.log(res); 
        }
			})
		},
		// 显示购物车总数量和已选商品数量
		getCartQty: function(){
			var this_ = this;
			Request.query({
				method: 'gb.mall.cart.item.qty.get',
				data:{
					"shop_id": this_.shopId,
					// "usr_num_id": this_.usrNumId,
					// "emp_num_id": this_.empNumId,
					"access_token": this_.accessToken,
				},
				success:function(res){
					if (res.data.code == 0) {
						if (res.data.number) {
              // this_.$store.dispatch('cartNum/changeNum',res.data.number)
              this_.$store.dispatch('cartNum/changeNum',res.data.variety)
						} else {
							this_.$store.dispatch('cartNum/changeNum',0)
						}
					} else {
						this_.comToast(res.data.message)
					}
				},
				error: function(res){
					console.log(res); 
				}
			})
		},
    // 单选事件
    singleChecked: function (index){
      this.cartList[index].is_checked = this.cartList[index].is_checked == 0 ? 1 : 0 ;
      var requestVal = [];
      requestVal.push({
        "cart_id": this.cartList[index].cart_id,
        "total_quantity": this.cartList[index].quantity,
        "is_checked": this.cartList[index].is_checked,
        "selected_promotion": null
      });
      for(var i = 0; i < this.cartList.length; i++){
        var selectIndex = this.checkedList.indexOf(this.cartList[i].cart_id);
        if(this.cartList[i].is_checked == 1) {
          if( selectIndex == -1){
            this.checkedList.push(this.cartList[i].cart_id)
          }  
        }else {
          this.checkedList.splice(index,1)
        }
      }
      if(this.checkedList.length == this.cartList.length) {
        this.isCheckedAll = true;  //判断是否为全选
      } else {
        this.isCheckedAll = false;
      }
			this.singleRequest(requestVal)
    },
    // 单选或取消请求
		singleRequest(val) {
      // console.log(val)
			var this_ = this;
			Request.query({
				method: 'gb.mall.cart.item.edit',
				data:{
					// "usr_num_id": this_.usrNumId,
					"obj_type": this_.objType,
					"mode": this_.mode,
					// "emp_num_id": this_.empNumId,
					"cart_params": val,
					"access_token": this_.accessToken,
				},
				success:function(res){
					if(res.data.code == 0) {
						// 更新列表
						this_.getInitList();
						// 更新数量
						this_.getCartQty()
					} else {
						this_.comToast(res.data.message)
					}
				},
				error: function(res){
					console.log(res); 
				}
			})
		},
    // checkbox全选事件
    checkedAllEvent: function () {
      this.isCheckedAll = !this.isCheckedAll;
      if (this.isCheckedAll) {
        for (var i = 0; i< this.cartList.length; i++ ){
          this.cartList[i].is_checked = 1;
        }
      } else {
        for (var i = 0; i< this.cartList.length; i++ ){
          this.cartList[i].is_checked = 0;
        }
      }
      this.checkedList = [];
      for (var i = 0; i < this.cartList.length; i++) {
        if(this.cartList[i].is_checked == 1) {
          this.checkedList.push(this.cartList[i].cart_id)
        }
      }
      this.checkedAllRequest()
    },
    // 全选请求
    checkedAllRequest(){
			var this_ = this;
			Request.query({
				method: 'gb.mall.all.cart.item.choose',
				data:{
					// "usr_num_id": this_.userNumId,
					"type": this_.isCheckedAll ? "checked" : "cancel",
					"platform": this_.platform,
					"shop_id": this_.shopId,
					// "emp_num_id": this_.empNumId,
					"access_token": this_.accessToken,
				},
				success:function(res){
					if(res.data.code == 0) {
						// 更新列表
						this_.getInitList();
						// // 更新数量
						this_.getCartQty();
					} else {
						this_.comToast(res.data.message)
					}
				},
				error: function(res){
					console.log(res); 
				}
			})
		},
    // 购物车减按钮
    decreased: function (index) {
      var this_ = this;
      var num = this.cartList[index].quantity;
      if (num == 1) {
        // this.isHideDel = false;
        this.delIndex = index;
        this.$vux.confirm.show({
          // 组件除show外的属性
          'hide-on-blur': true,
          title: '删除商品',
          content: '确认删除选中的商品？',
          onCancel () {
            this_.$vux.confirm.hide();
          },
          onConfirm () {
            this_.delPro(index,0)
          }
        })
      } else {
        num--
        this.num = num;
        // this.getVal(index,this.cartList);
        var requestVal=[];
        requestVal.push({
          "cart_id": this.cartList[index].cart_id,
          "total_quantity": this.num,
          "is_checked": this.cartList[index].is_checked,
          "selected_promotion": null
        });
        this.singleRequest(requestVal);
      };
    },
    // 输入框输入
    changeVal: function (index) {
      var inputVal = this.cartList[index].quantity;
      if(inputVal < 1) {
        this.cartList[index].quantity = 1
      } else if (inputVal > this.cartList[index].store) {
        this.cartList[index].quantity = this.cartList[index].store;
      } else {
        this.cartList[index].quantity = inputVal;
      }
      // this.getVal(index,this.cartList);
      var requestVal=[];
      requestVal.push({
        "cart_id": this.cartList[index].cart_id,
        "total_quantity": this.cartList[index].quantity,
        "is_checked": this.cartList[index].is_checked,
        "selected_promotion": null
      });
      this.singleRequest(requestVal);
    },
    // 点击添加按钮
    increased: function(index) {
      var num = this.cartList[index].quantity;
      if (num < this.cartList[index].store) {
        num++
      } else {
        return false;
      };
      var requestVal=[];
      requestVal.push({
        "cart_id": this.cartList[index].cart_id,
        "total_quantity": num,
        "is_checked": this.cartList[index].is_checked,
        "selected_promotion": null
      });
      this.singleRequest(requestVal);
    },
    // 删除商品请求
		delPro(index,edit){
      var this_ = this;
      var cartId;
      // edit=0为单个删除，为1是点击编辑删除
      if (edit == 0) {
        cartId = this_.cartList[index].cart_id;
      } else {
        cartId = this_.checkedList.join(",");
      }
      console.log(cartId);
			Request.query({
				method: 'gb.mall.cart.item.delete',
				data:{
					// "usr_num_id": this_.usrNum_id,
					"cart_id": cartId,
					"mode": this_.mode,
					// "emp_num_id": this_.empNumId,
					"access_token": this_.accessToken
				},
				success:function(res){
					// 删除后提示信息
					this_.comToast(res.data.message);
					// 删除后更新列表
					this_.getInitList();
					// 删除后更新购物车数量
					this_.getCartQty();
				},
				error: function(res){
					console.log(res); 
				}
			})
    },
    // 删除模态框
    delModal: function(index,edit){
      var this_ = this;
      if (this.total.number > 0 ) {
        this.$vux.confirm.show({
          // 组件除show外的属性
          'hide-on-blur': true,
          title: '删除商品',
          content: '确认删除选中的商品？',
          onCancel () {
            this_.$vux.confirm.hide();
          },
          onConfirm () {
            this_.delPro(index,edit)
          }
        });
      } else {
        this.comToast("您还没有选中任何商品哦~")
      }
    },
    // 缺货商品加入收藏夹请求
    addToFavRequest: function () {
      var this_ = this;
			Request.query({
				method: 'gb.mall.into.favorite.move',
				data:{
					// "usr_num_id": this_.userNumId,
          "shop_id": this_.shopId,  //之后可能需要修改
					// "emp_num_id": this_.empNumId,
          "access_token": this_.accessToken,
				},
				success:function(res){
					if(res.data.code == 0) {
						// 更新列表
						this_.getInitList();
						// // 更新数量
						this_.getCartQty();
					} else {
						this_.comToast(res.data.message)
					}
				},
				error: function(res){
					console.log(res); 
				}
			})
    },
    // 清除缺货商品事件
    removeOutStock: function () {
      var this_ = this;
      this.$vux.confirm.show({
        // 组件除show外的属性
        'hide-on-blur': true,
        title: '清空缺货商品',
        content: '您确定要清空缺货商品吗？',
        onCancel () {
          this_.$vux.confirm.hide();
        },
        onConfirm () {
          this_.removeOutStockRequest();
        }
      })
    },
    // 清空缺货商品请求
    removeOutStockRequest: function () {
      var this_ = this;
			Request.query({
				method: 'gb.mall.cart.item.clear',
				data:{
					// "usr_num_id": this_.userNumId,
          "shop_id": this_.shopId,  //之后可能需要修改
					// "emp_num_id": this_.empNumId,
          "access_token": this_.accessToken,
				},
				success:function(res){
					if(res.data.code == 0) {
						// 更新列表
						this_.getInitList();
						// // 更新数量
						this_.getCartQty();
					} else {
						this_.comToast(res.data.message)
					}
				},
				error: function(res){
					console.log(res); 
				}
			})
    },
    // 推荐商品列表请求
    recommendListRequest: function () {
      var this_ = this;
      var data; 
      if(this_.cartList &&　this_.cartList.length) {
        var catId = [];
        for (var i=0; i<this_.cartList.length; i++){
          catId.push(this_.cartList[i].cat_id)
        }
        data = {
          "cat_id": catId,
          "is_recommend": 1,
          "shop_num_id": this_.shopId,
          "page_no": 1,
          "page_size": 10,
          "access_token": this_.accessToken
        };
      } else {
        data = {
          "is_recommend": 1,
          "shop_num_id": this_.shopId,
          "page_no": 1,
          "page_size": 10,
          "access_token": this_.accessToken
        };
      }
			Request.query({
				method: 'com.gb.soa.omp.cgoods.service.findStyleByRelate',
				data: data,
				success:function(res){
					if(res.data.code == 0) {
            this_.recommendList = res.data.lists;
            // this_.recommendList = recommendMock;
            if (this_.recommendList.length > 0) {
							for(var i=0; i<this_.recommendList.length; i++){
								this_.recommendList[i].title = this_.recommendList[i].title.substring(0,21) + "...";
							}
						}
					} else {
						this_.comToast(res.data.message)
					}
				},
				error: function(res){
					console.log(res); 
				}
			})
    },
    // 加入购物车请求
		addToCartRequest: function(pro){
      var this_ = this;
			Request.query({
				method: 'gb.mall.cart.item.add',
				data:{
					// "usr_num_id": this_.userNumId,
          "shop_id": this_.shopId,
          "item_num_id": pro.item_num_id ? pro.item_num_id : pro.default_item_num_id,
          "quantity": 1,
          "package_sku_ids": null,
          "package_id": null,
          "obj_type": "item",
          "mode": "cart",
					// "emp_num_id": this_.empNumId,
          "access_token": this_.accessToken,
				},
				success:function(res){
					if(res.data.code == 0) {
						// 更新列表
						this_.getInitList();
						// 更新数量
						this_.getCartQty();
					} else {
						this_.comToast(res.data.message)
					}
				},
				error: function(res){
					console.log(res); 
				}
			})
    },
    // 编辑事件
    showEdit: function () {
      this.isEdit = !this.isEdit;
    },
  },
  mounted(){
    // console.log(cartPageMock)
    // this.cartList = cartPageMock.cartPageMock.current_cart.cartitemlist;
    // this.outOfStockList = cartPageMock.cartPageMock.stock_out_list;
    // this.total = cartPageMock.cartPageMock.get_cart_total;
    // this.cartItemGifts = cartPageMock.cartPageMock.cart_item_gifts;
    // this.isCheckedAll = cartPageMock.cartPageMock.checkedall == 1 ? true : false;
    // console.log(this.cartList)
    this.getInitList();
    this.getCartQty();
  },
  deactivated(){
    this.$destroy();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../assets/css/common";
  @import "../assets/css/cart";
  h1, h2 {
    font-weight: normal;
  }

</style>
