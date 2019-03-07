<template>
    <div class="good-detail">
        <Header title="商品详情"></Header>
        <div class="goods-image">
					<Swiper class="swiper-box" :list="goodImgList" :show-dots="false" :auto="true" :loop="true"></Swiper>
        </div>
        <div class="simple-intro p20">
					<p class="title">曼秀雷顿控油洁面乳<span class="share-icon"></span></p>
					<p class="intro font-24">高级护肤套装 西湖一套搞定</p>
					<p class="shop-price font-24"><span>商城价</span><span class="color-blue font-32 money-nub"><span class="money-icon font-24"></span>49</span><span class="txt-through"><span class="money-icon font-24"></span>99.00</span></p>
					<p class="vip-price font-24"><span>会员价</span><span class="color-blue font-32 money-nub"><span class="money-icon font-24"></span>49</span><span class="plus-box">plus</span></p>
					<p class="font-24">现在下单,最快今日到达</p>
        </div>
        <div class="user-operation mt24">
					<div class="source"> 
						<span class="tl">产地:湖南</span>
						<span class="tc">规格:408ml</span>
						<span class="tr">保质期:1年</span>
					</div>
					<div class="selected-good clearfix"><span class="fl">已选</span><span class="good-name fl">冰爽活碳洁面,1件</span><span class="more-icon fr"></span></div>
					<div class="selected-good clearfix"><span class="fl">领取优惠券</span><span class="more-icon fr"></span></div>
					<div class="sales">
							<p>促销</p>
							<ul>
									<li>买就买曼秀烈顿试用装</li>
									<li>购买两件以上,总价立减10元</li>
									<li>特价商品不可使用优惠券</li>
							</ul>
					</div>
            <div class="recommend-goods">
                <p class="reco-title">推荐商品</p>
                <ul>
                    <li class="inline-block">
                        <img src="./../assets/images/index/food1.png" alt="">
                        <p class="reco-name">曼秀雷顿护肤品顿护肤品</p>
                        <span class="advantage-btn">送赠品</span>
                        <span class="money-icon"><span class="money-nub">29.00</span><span class="add-icon"></span></span>
                    </li>
                    <li class="inline-block">
                        <img src="./../assets/images/index/food1.png" alt="">
                        <p class="reco-name">曼秀雷顿护肤品顿护肤品</p>
                        <span class="advantage-btn">送赠品</span>
                        <span class="money-icon"><span class="money-nub">29.00</span><span class="add-icon"></span></span>
                    </li>
                    <li class="inline-block">
                        <img src="./../assets/images/index/food1.png" alt="">
                        <p class="reco-name">曼秀雷顿护肤品顿护肤品</p>
                        <span class="advantage-btn">送赠品</span>
                        <span class="money-icon"><span class="money-nub">29.00</span><span class="add-icon"></span></span>
                    </li>
                </ul>
            </div>
            <div class="other-detail">
                <p>商品详情</p>
                <div class="source">
                    <span class="tl">产地:湖南</span>
                    <span class="tc">规格:408ml</span>
                    <span class="tr">保质期:1年</span>
                </div>
                <img src="" alt="">
            </div>


        </div>

        <div class="footer-bottom">
            <span class="shopcat-icon"></span>
            <span class="add-good">加入购物车</span>
        </div>
    </div>
</template>
<script>
import Header from '@/components/common/header.vue'
import { Swiper } from 'vux'
export default {
    components:{
        Swiper,
        Header
    },
    data () {
        return {
            goodImgList:[
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
    created(){
      this.$store.dispatch('footerStatus/hideFooter')
    }
}
</script>
<style lang="less" scoped>
.good-detail{
    font-size: 28px;
    background: #F3F4F6;
    .goods-image{
      .swiper-box{
        // height: 751px;
      }
    }

    .simple-intro{
        background: #ffffff;
        .money-icon{
          &:before{
            display: inline-block;
            vertical-align: inherit;
          }
        }
        .title{
            padding-top: 20px;
            padding-bottom: 20px;
            font-size: 28px;
            position: relative;
            .share-icon{
                content: '';
                width: 34px;
                height: 36px;
                display: inline-block;
                background: url(./../assets/icons/icon_share@2x.png) no-repeat;
                background-size:100% 100%; 
                position: absolute;
                right: 0;
                top:16px;
            }
        }
        .intro{
            color: #999999;
            padding-bottom: 20px;
        }
        .shop-price{
            line-height: 48px;
            color: #999999;
            .money-nub{
                margin-left: 22px;
                margin-right: 34px;
            }
        }
        .vip-price{
            line-height: 48px;
            color: #999999;
            padding-bottom: 24px;
            .money-nub{
                margin-left: 22px;
                margin-right: 34px;
            }
            .plus-box{
                border: 1px solid #1F9459;
                color: #1F9459;
                border-radius: 6px;
                display: inline-block;
                width: 60px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                font-size: 16px;
                position: relative;
                top: -4px;
            }
        }
    }
    .user-operation{
        background: #ffffff;
        .source{
            font-size: 24px;
            color: #666666;
            display: flex;
            justify-content: space-between;
            padding-left: 30px;
            padding-right: 54px;
            padding-top: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid #efefef;
            span{
                flex:1;
            }
        }
        .selected-good{
            font-size: 24px;
            padding:36px 36px 26px 30px;
            color: #999999;
            border-bottom: 1px solid #efefef;
            .good-name{
                font-size: 24px;
                color: #333333;
                margin-left: 30px;
            }
            .more-icon{
                width: 32px;
                height: 10px;
                background: url(./../assets/icons/more@2x.png) no-repeat;
                background-size: 100% 100%;
                display: inline-block;
            }
        }
        .sales{
            padding-bottom: 46px;
            p{
                height: 82px;
                line-height: 82px;
                padding: 0 30px;
                font-size: 24px;
                color:#999999;
            }
            ul{
                margin: 0 72px 0 98px;
                background: #F7F7F7;
                padding: 26px 26px 20px 38px;
                font-size: 22px;
                color: #333333;
                line-height: 30px;
            }
        }
        .recommend-goods{
            padding: 30px 26px 16px 26px;
            .reco-title{
                font-size: 32px;
                color: #333333;
                margin-bottom: 20px;
            }
            ul{
                display: flex;
                li{
                    flex: 1;
                    margin-right: 30px;
                    font-size: 24px;
                    color: #333333;
                    &:last-child{
                        margin-right: 0;
                    }
                    img{
                        width: 212px;
                        height: 212px;
                        display: inline-block;
                        background: #ffffff;
                    }
                    .reco-name{
                        margin-top: 16px;
                        margin-bottom: 18px;
                    }
                    .advantage-btn{
                      padding: 8px 12px;
                      color: #208656;
                      border: 1px solid #1F9459;
                      display: inline-block;
                      border-radius: 18px;
                    }
                    .money-icon{
                      display: block;
                      color: #208656;
                      margin-top: 14px;
                      position: relative;
                      &:before{
                        display: inline;
                        vertical-align: inherit;
                      }
                      .add-icon{
                        &:before{
                          content:'';
                          display: inline-block;
                          width: 36px;
                          height: 36px;
                          background: url(./../assets/icons/btnAdd.png) no-repeat;
                          background-size: 100% 100%;
                          position: absolute;
                          right: 36px;
                        }
                      }
                      .money-nub{
                          font-size: 36px;
                      }
                    }
                }
            }
        }
        .other-detail{
            p{
                font-size: 32px;
                color: #333333;
                text-align: center;
                padding:40px 0 20px 0;
                border-bottom: 1px solid #efefef;
            }
            .source{
                font-size: 24px;
                color: #666666;
                display: flex;
                justify-content: space-between;
                padding-left: 30px;
                padding-right: 54px;
                padding-top: 40px;
                padding-bottom: 20px;
                border-bottom: 1px solid #efefef;
                span{
                    flex:1;
                }
            }
        }

    }
    .footer-bottom{
        height: 98px;
        line-height: 98px;
        font-size: 32px;
        background: #208656;
        color: #ffffff;
        text-align: center;
        display: flex;
        .shopcat-icon{
            flex: 1;
            background: #F3F4F6;
            text-align: left;
            padding-left: 26px;
            display: flex;
            align-items: center;
            &:before{
                content: '';
                display: inline-block;
                width: 60px;
                height: 52px;
                background: url(./../assets/icons/cart_product@2x.png) no-repeat;
                background-size: 100% 100%;
            }
        }
        .add-good{
            width: 248px;
        }
    }
}
</style>

