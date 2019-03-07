<template>
	<div class="wraper">
      <div class="cityList">
          <h4 class="dt">已开通服务的城市</h4>
          <p class="ul">
            <span v-for="(v,i) in cityList" 
              :class="cur==i?'active':''"
              @click="bindCity(i,v.city_name,v.areas)">{{v.city_name}}</span>
          </p>
       </div>
	</div>
</template>
<script>
export default {
  props:['currentCity'],
	data () {
		return {
      cur:null,
      cityList: [],
      selectedVal:[],
      curentCity: "",
		}
	},
	created(){
	  this.curentCity=this.currentCity;
	  //this.getCities();
	},
	methods:{
      //选择城市
      bindCity: function (arrange,cName,area) {
        this.cur=arrange;
        this.selectedCity=cName;
        this.selectedVal=area;
        this.$emit('getSelectCity',{city_name:this.selectedCity,areas:this.selectedVal});
      },
      getCities(){
        let that=this;
        let defaultAreas=[];
        this.$http.query({
          url:'https://wx.yiako.com/bbc-service/queryMdmsSubUnits/queryCityAll',
          method:'get',
          data:{
               'jsonParam':{"tenantNumId": 6,"dataSign": 1}                
              },
          success:function(res){
             that.cityList=JSON.parse(res.data.data);
             let arrange;
             for(var i=0;i<that.cityList.length;i++){
                  let item=that.cityList[i];
                      item.index=i;
                  if(item.city_name=='上海市'){
                     arrange=item.index;
                      defaultAreas=item.areas;
                    }
                   if(item.city_name==that.curentCity){
                     that.cur=item.index;
                     that.$emit('getSelectCity',{city_name:item.city_name,areas:item.areas});
                     break;
                   }else{
                     that.cur=arrange;
                     that.$emit('getSelectCity',{city_name:'上海市',areas:defaultAreas});
                   }
             }
          }
      });
    }
	}
}
</script>
<style lang="less" scoped>
 .wraper{
    padding:30px;
    color:#333333;
    background:#F3F4F6;
    height:100%;
    overflow-y: auto;
    .currentCity{
       width:100%;
       padding-bottom:20px;
        .dt{
           font-size:26px;
           line-height: 30px;
           padding-bottom:20px;
        }
        .dd{
            display: inline-block;
            padding:0 30px;
            text-align:center;
            line-height:80px;
            border:1px solid #ffffff;
            background:#ffffff;
            border-radius:6px;
        }
    }
    .cityList{     
      .dt{
           font-size:26px;
           line-height: 50px;
        }
        .ul{
           display: flex;
           flex-direction: row;
           justify-content: space-between;
           flex-wrap: wrap;
           text{
              padding:0 30px;
              text-align:center;
              line-height:80px;
              border:1px solid #ffffff;
              background:#ffffff;
              border-radius:6px;
              margin-top:30px;
           }
           .active{
              border:1px solid #208656;
              background:#208656;
              color:#ffffff;
           }
        }
    }
    
  }
</style>


