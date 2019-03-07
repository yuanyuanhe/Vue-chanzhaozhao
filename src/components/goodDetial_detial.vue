<template>
  <div class="productDetail">
    <div class="fill_t"></div>
    <div v-html="wap_desc"></div>
  </div>

</template>
<script>
  export default {
    name: "",
    data(){
      return{
        recommendList:[],
        wap_desc:''
      }
    },
    mounted(){

    },
    methods:{
      getDetail(ec_style_num_id){
        this.$http.query({
          method:'com.gb.soa.omp.cgoods.api.service.styledescbystylenumid.get',
          data:{
            "ec_style_num_id":ec_style_num_id,
            "type":"wap"
          },
          success:(data)=>{
            console.log('detial',data);
            if(data.data.code==0){
              this.wap_desc=data.data.wap_desc;
            }
          },
          error: (err)=>{
            console.log(err);
          }
        })
      }
    }
  }
</script>
<style>
  .productDetail{
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .productDetail  img{
    width: 100%;
  }
  .fill_t{
    height: 88px;
  }
</style>
