<template>
  <div class="activity">
    <div class="banner">
      <Swiper class="banner-box" :list="adverTisementList" :show-dots="true" dots-class="piece-class"   dots-position="center" :auto="true" :loop="true"></Swiper>
    </div>
    <div class="goodslist">
      <ul class="classify-recommend clearfix">
        <li>
          <img src="./../assets/images/index/food1.png" alt=""/>
          <p class="goods-name">埃及无籽黑提500g</p>
          <p class="price money-icon"><span class="money-nub">29.00</span><span class="add-icon"></span></p>
        </li>
        <li>
          <img src="./../assets/images/index/food1.png" alt=""/>
          <p class="goods-name">埃及无籽黑提500g</p>
          <p class="price money-icon"><span class="money-nub">29.00</span><span class="add-icon"></span></p>
        </li>
        <li>
          <img src="./../assets/images/index/food1.png" alt=""/>
          <p class="goods-name">埃及无籽黑提500g</p>
          <p class="price money-icon"><span class="money-nub">29.00</span><span class="add-icon"></span></p>
        </li>
        <li>
          <img src="./../assets/images/index/food1.png" alt=""/>
          <p class="goods-name">埃及无籽黑提500g</p>
          <p class="price money-icon"><span class="money-nub">29.00</span><span class="add-icon"></span></p>
        </li>
        <li>
          <img src="./../assets/images/index/food1.png" alt=""/>
          <p class="goods-name">埃及无籽黑提500g</p>
          <p class="price money-icon"><span class="money-nub">29.00</span><span class="add-icon"></span></p>
        </li>
        <li>
          <img src="./../assets/images/index/food1.png" alt=""/>
          <p class="goods-name">埃及无籽黑提500g</p>
          <p class="price money-icon"><span class="money-nub">29.00</span><span class="add-icon"></span></p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { Swiper } from 'vux'
export default {
  components:{
    Swiper
  },
  data () {
    return {
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
  }
}
</script>
<style lang="less" scoped>
.activity{
  .banner{
    height: 372px;
  }
  .goodslist{
    margin-top: 80px;
    ul.classify-recommend{
      padding: 0 15px;
      padding-top: 9px;
      li{
        background: #f5f5f5;
        float: left;
        width: 33.33%;
        padding: 8px 15px 41px 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;
        border-right: 1px solid #efefef;
        &:nth-child(3){
          border-right: none;
        } 
        &:nth-child(6){
          border-right: none;
        } 
        img{
          width: 210px;
          height: 210px;
        }
        p.goods-name{
          font-size: 24px;
          color: #333333;
          margin-top: 20px;
          margin-bottom: 30px;
        }
        p.price{
          font-size: 20px;
          color: #00713B;
          position: relative;
          height: 32px;
          .money-nub{
            font-size: 32px;
            margin-left: 4px;
            display: table-cell;
            vertical-align: bottom;
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
              top: -4px;
            }
          }
        }
      }
    }
  }
}
</style>


