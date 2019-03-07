<template>
	<div class="orderlist">
		<Header title="附近门店"></Header>
     <div class="container">
        <div class="head_part">
          <div class="position" @click="showCities">
            <span>上海市</span>
            <img v-if="!cityListMask" src="../assets/icons/arrow_down.png"/>
            <img v-else src="../assets/icons/arrow_up.png" />
          </div>
          <div class="relavant">
            <span>全部门店</span>
          </div>
        </div>
        <div class="body_part" style="overflow-y:auto">
           <div class="inner">
             <div class="areas">
               <ul>
                 <li v-for="(v,i) in areas" :class="current==i?'active':''" @click="chooseArea(i,v.shops)">{{v.area_name}}</li>
               </ul>
             </div>
             <div class="storeList">
                <div class="storeItems">
                    <div class="storeInfo">
                       <p class="storeName">嘉定曹安公路店</p>
                       <p class="storePos">营业时间 9:00-21:00</p>
                       <p class="storePos">江苏省常州市曲金曲湖塘镇万达广场</p>
                    </div>
                    <div class="tel">
                       <img src="../assets/icons/phone.png"/>
                    </div>
                </div>
             </div>
           </div>
        </div>
     </div>
		<div>
      <transition name="apear">        
          <div class="cityListMask" v-show="cityListMask" @click="hideMask">
          <transition name="move">  
           <div class="cities" v-show="cityListMask">
              <CitySelect 
                :currentCity="currentCity"
                @getSelectCity="getSelectCity"
              />
           </div>
          </transition> 
         </div>
      </transition>
    </div>
	</div>
</template>
<script>
import Header from '@/components/common/header.vue'
import api from '../units/config'
import CitySelect from '@/components/common/cityPosition.vue'
export default {
	components:{
		Header,
		CitySelect
	},
	data () {
		return {
		 current:0,
     showModel:false,
     currentCity:'苏州' ,
     cityListMask:false,
     areas:[{area_name:'嘉定区',shops:[]},
     {area_name:'徐汇区',shops:[]},
     {area_name:'虹桥区',shops:[]}],
     selectedStores:[],
		}
	},
	created(){	    
      this.$store.dispatch('footerStatus/hideFooter');
      this.getCurrentCity();
  },
  methods:{
    showCities(){ //显示选择城市
      this.cityListMask=true;      
    },
    chooseArea(index,store){ //选择区域
      this.current=index;
      this.selectedStores=store;
    },
   getSelectCity(param){ //选择城市
     console.log(param)
   },
   getCurrentCity() { //获取订单数据   
      let that = this;
      this.$http.query({
        url:'https://wx.yiako.com/bbc-service/queryAddress/addressByLocalhost',
        method:'get',
        data:{
          'jsonParam':{"lat": 31.27574,"lon": 121.41901,"querytype" :0,"tenant_num_id": 6,"data_sign": 1}
        },
        success:function(addressRes){
          console.log(addressRes)
          if(addressRes.data.code==0){
            that.currentCityName=addressRes.data.data;
            that.$broadcast('getCurrentCity',that.currentCityName);
          }
        }
      })
    },
    hideMask(){
      this.cityListMask=false;
    }

  }
}
</script>
<style lang="less" scoped>
  .container {
    height: 100%;
    font-family: PingFangSC-Regular;
    background-color:#f3f4f6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .head_part{
      flex:1;
      background:#ffffff;     
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      text-align:center;
      font-size:24px;
      font-family:PingFang-SC-Regular;
      color:rgba(102,102,102,1);
      line-height:88px;
      .position{
        flex: 2;
        border-right:1px solid #efefef;
        span{
          display: inline-block;
          vertical-align: middle;
          padding-right:8px;
          max-width:100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        };
        img{
          display: inline-block;
          vertical-align: middle;
          width:17px;
          height:10px;
        }
      }
      .relavant{
        flex: 6;
        span{
          vertical-align: middle;
          padding-right:8px;
        };
        img{
          vertical-align: middle;
          width:17px;
          height:10px;
        }
      }
    }
    .body_part{
      flex:10;
      padding-top:25px;
      .inner{
        background:#ffffff;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        .areas{
          flex:2;
          text-align: center;
          font-size:28px;
          background:#F3F4F6;
          li{
            font-family:PingFang-SC-Medium;
            color:#666666;
            line-height:115px;
            &.active{
              background:#ffffff;
              font-family:PingFang-SC-Medium;
              color:#333333;
              line-height:115px;
            }
          }         
        }
        .storeList{
          flex:6;
          padding-left:44px;
          .storeItems{
            padding:40px 30px 40px 0;
            border-bottom: 1px solid rgba(239,239,239,1);
            text-align: left;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .storeInfo{
              flex:6;
              .storeName{
                font-size:28px;
                font-family:PingFang-SC-Medium;
                color:rgba(51,51,51,1);
                line-height:36px;
              }
              .storePos{
                padding-top:8px;
                font-size:24px;
                font-family:PingFang-SC-Regular;
                color:rgba(102,102,102,1);
                line-height:36px;
              }
            }
            .tel{
              flex:2;
              text-align: right;
              img{
                display: inline-block;
                width:43px;
                height:42px;
              }
            }
          }
        }
      }
    }
  }
   .cityListMask{
        position:fixed;
        width:100%;
        bottom:0;
        top:88px;
        background:rgba(0,0,0,.6);
        .cities{
          height:calc(100% - 20px);
          background:#ffffff;
          position:absolute;
          width:100%;
          bottom:0px;
          transform: translate3d(0, calc(-6%), 0);
        }
      }
   .apear-enter-active, .apear-leave-active {      
        transition: all .5s;              
        &.apear-enter, &.apear-leave-active {
            background:rgba(0,0,0,0);            
        } 
    }
   .move-enter-active,.move-leave-active{
       transition: all .5s;
       &.move-enter,&.move-leave-active{
          transform: translate3d(0, calc(100%), 0);
       }
    } 
</style>


