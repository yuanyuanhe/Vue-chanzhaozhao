<style lang="less">
  page,
  .body {
    height: 100%;
    background: #F3F4F6;
  }
  .address-list{
    padding-bottom: 100px;
    .address-list-all{
      padding: 45px 180px 45px 45px;
      background: #fff;
      margin-bottom: 25px;
      position: relative;
      .address-area{
        color: #000;
        font-size: 24px;
        line-height: 40px;
      }
      .address-contact{
        font-size: 24px;
        color: #999999;
        padding: 30px 0;
        div{
          display: inline-block;
        }
        div:first-child{
          margin-right: 10px;
          width: 180px;
        }
        .address-contact-tel{
          width: 180px;
          margin-right: 10px;
        }
        .address-contact-label{
          height: 24px;
          line-height: 22px;
          color: #208656;
          font-size: 20px;
          border-radius: 12px;
          text-align: center;
          padding: 0 20px;
          border: 1px solid #208656;
          vertical-align: middle;
          box-sizing: border-box;
        }
      }
      .address-isok{
        color: #999999;
        font-size: 24px;
      }
      .edit-address-btn{
        position: absolute;
        width: 90px;
        top: 0;
        bottom: 0;
        right: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .edit-address-btn-icon{
          width: 50px;
          height: 50px;
          display: block;
        }
      }
    }
    .add-address-btn{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      color: #fff;
      background: #208656;
      line-height: 100px;
      text-align: center;
      font-size: 32px;
    }
  }
</style>
<template>
  <div class="body">
    <Header v-if="!hideHeader" title="地址管理"></Header>
    <div class="address-list">
      <div v-if="isOk" class="address-list-all" v-for="x in addressList" :key="x.pageId">
        <div class="address-area">{{x.prv_name}} {{x.city_name}} {{x.city_area_name}} {{x.adr}}</div>
        <div class="address-contact">
          <div class="address-contact-name">{{x.cont_empe}}</div>
          <div class="address-contact-tel">{{x.contact_no}}</div>
          <!--<div class="address-contact-label">{{item.label}}</div>-->
        </div>
        <div v-if="x.isGo" class="address-isok">超出配送范围，可门店自提</div>
        <div class="edit-address-btn" @click="editAddress(x.adr_num_id)">
          <img class="edit-address-btn-icon" src="../assets/icons/edit-address.png" />
        </div>
      </div>
      <div @click="addArea" class="add-address-btn">新建地址</div>
    </div>
  </div>
</template>

<script>
  import api from './../units/config'
  import Header from "../components/common/header";
  export default {
    components:{
      Header
    },
    props: ['hideHeader'],
    data(){
      return{
        addressList:[],             //收货地址列表
        isOk: false,                //是否加载完成
        usrNumId:'',
        accessToken:''
      }
    },
    methods:{
      addArea(){
        this.$router.push({
          name: 'addAddress'
        })
      },
      editAddress(id){
        this.$router.push({
          name: 'editAddress',
          query:{
            id: id
          }
        })
        // wx.navigateTo({
        //   url: 'addAddress?id='+id
        // })
      },
      /**
       * 收货地址列表
       */
      allAddressList(){
        const self = this;
        self.httpAjax({
          method: api.vip.getAddress,
          data:{
            "usr_num_id": self.usrNumId,
            "access_token": self.accessToken
          }
          // success:function(res){
          //   if(res.data.code == 0){
          //     self.isOk = true;
          //     self.addressList = res.data.member_adrs;
          //   }
          // },
          // error: function(res){
          //   console.log(res);
          // }
        }).then(res=>{
          self.isOk = true;
          self.addressList = res.member_adrs;
        },res=>{
          console.log(res);
        })
      }
    },
    created(){
      this.usrNumId = this.local('usr_num_id');
      this.accessToken = this.local('access_token')
      this.$store.dispatch('footerStatus/hideFooter');
      this.allAddressList();
    }
  }
</script>
