<style lang="less">
  page,
  .body {
    height: 100%;
    background: #F3F4F6;
  }
  .add-address-box{
    height: 100%;
    overflow: scroll;
    .add-address-info{
      margin-top: 25px;
      margin-bottom: 25px;
      .add-address-info-con{
        padding: 0 0 0 40px;
        background: #fff;
        .add-address-info-box{
          position: relative;
          padding-left: 135px;
          border-bottom: 1px solid #e4e4e4;
          font-size: 24px;
          padding-bottom: 1px;
          &.add-address-info-boxspe{
            border-bottom: 0;
          }
          .add-address-info-name{
            display: inline-block;
            height: 90px;
            line-height: 90px;
            position: absolute;
            width: 135px;
            left: 0;
            top: 0;
            color: #666666;
          }
          .add-address-info-text{
            width: 100%;
            display: block;
            height: 90px;
            line-height: 90px;
            outline: 0;
            border: 0;
            font-size: 24px;
            color: #666;
            &::-webkit-input-placeholder{
              font-size: 24px;
              color: #999;
            }
          }
          .add-address-label{
            display: flex;
            min-height: 90px;
            justify-content: flex-start;
            align-items:center;
            flex-wrap: wrap;
            .add-address-label-con{
              width: 100px;
              height: 44px;
              border-radius: 27px;
              line-height: 42px;
              text-align: center;
              border: 1px solid #EFEFEF;
              margin-right: 30px;
              color: #CCCCCC;
              box-sizing: border-box;
              &.add-address-label-con-active{
                background: #208656;
                border: 1px solid #208656;
                color: #fff;
              }
            }
          }
        }
      }
      &.add-address-infospe{
        margin-top: 0;
        margin-bottom: 70px;

      }
    }
    .save-address{
      margin: 0 auto 50px;
      width: 600px;
      height: 80px;
      font-size: 28px;
      line-height: 78px;
      text-align: center;
      background: #208656;
      color: #fff;
      border-radius: 40px;
      border: 1px solid #208656;
      box-sizing: border-box;
      &.delete-address{
        color: #208656;
        background: #fff;
      }
    }
    .weui-cells{
      font-size: 24px;
      margin-top: 0;
      height: 90px;
      line-height: 90px;
      padding: 0;
      text-align: left;
      .weui-cell{
        padding: 0;
      }
      &:after{
        border: 0;
      }
      &:before{
        border: 0;
      }
      .vux-popup-picker-select{
        text-align: left!important;
      }
    }
  }
  .vux-popup-header{
    height: 80px!important;
    div{
      font-size: 40px;
      height: 80px;
      line-height: 80px;
    }
  }
  .cube-picker-panel{
    height: 546px;
    font-size: 28px;
    .cube-picker-choose{
      height: 120px;
      .cube-picker-cancel{
        line-height: 120px;
        padding: 0 32px;
        font-size: 28px;
      }
      .cube-picker-confirm{
        line-height: 120px;
        padding: 0 32px;
        font-size: 28px;
      }
    }
    .cube-picker-content{
      top: 40px;
      .border-bottom-1px{
        height: 136px;
      }
      .border-top-1px{
        height: 136px;
      }
      .cube-picker-wheel-wrapper{
        padding: 0 32px;
        div{
          height: 340px;
          font-size: 40px;
          .cube-picker-wheel-scroll{
            margin-top: 136px;
            line-height: 72px;
            .cube-picker-wheel-item{
              height: 72px;

            }
          }
        }
      }

    }
    .cube-picker-title-group{
      display: none;
    }
    .cube-picker-footer{
      height: 40px;
    }
  }
</style>
<template>
  <div class="body">
    <div class="add-address-box">
      <Header title="编辑地址"></Header>
      <div class="add-address-info">
        <div class="add-address-info-con">
          <div class="add-address-info-box">
            <div class="add-address-info-name">收货人</div>
            <input class="add-address-info-text" type="text" placeholder="收货人姓名" v-model.trim="addressName"/>
          </div>
        </div>
        <div class="add-address-info-con">
          <div class="add-address-info-box add-address-info-boxspe">
            <div class="add-address-info-name">手机号</div>
            <input class="add-address-info-text" type="text" placeholder="收货人手机号" v-model.trim="addressTel" maxlength="11"/>
          </div>
        </div>
      </div>
      <div class="add-address-info add-address-infospe">
        <div class="add-address-info-con">
          <div class="add-address-info-box">
            <div class="add-address-info-name">所在地址</div>
            <address-picker @getArea="getArea" :region="region" :regionId="regionId"></address-picker>
          </div>
        </div>
        <div class="add-address-info-con">
          <div class="add-address-info-box add-address-info-boxspe">
            <div class="add-address-info-name">详细地址</div>
            <input class="add-address-info-text" type="text" placeholder="小区、街道、写字楼、学校"  v-model.trim="addressDetail"/>
          </div>
        </div>
        <!--<div class="add-address-info-con">-->
          <!--<div class="add-address-info-box add-address-info-boxspe">-->
            <!--<div class="add-address-info-name">标签</div>-->
            <!--<div class="add-address-label">-->
              <!--<div @click="selectAreaLabel" v-for="x in areaLabel" data-index="{{index}}" class="add-address-label-con {{index==currentLabelIndex?'add-address-label-con-active':''}}">{{item.name}}</div>-->
              <!--<div class="add-address-label-con add-address-label-con-active">公司</div>-->
              <!--<div class="add-address-label-con">自定义</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <div @click="submitAddress" class="save-address">保存地址</div>
      <div @click="deleteAddress" class="save-address delete-address">删除地址</div>
      <!--<showModal wx:if="{{showInput}}" :fade.sync="showInput" :syncTitle.sync="parentTitle"></showModal>-->
      <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="showPositionText" position="middle"></toast>
    </div>
  </div>
</template>
<script>
  import api from './../units/config'
  import Header from "../components/common/header"
  import addressPicker from './common/addressPicker'
  import { Toast } from 'vux'
  // import showModal from '../components/vipCenter/showModal'
  export default{
    components: {
      Header,
      addressPicker,
      Toast,
      // showModal
    },
    data(){
      return{
        showInput: false,   //模态框隐藏
        currentLabelIndex: -1,     //当前label标签index
        editId:'',              //编辑地址id
        addressName:'',         //联系人姓名
        addressTel:'',          //联系人电话
        region: [],            //三级联动所在地址省市区
        regionId:[],           //三级省市区id
        addressDetail:'',      //地址详情
        areaLabel:[
          {name:'家',currentActive: false},
          {name:'学校',currentActive: false},
          {name:'自定义',currentActive: false}
        ],                     //标签选择
        showPositionValue: false,      //提示信息
        showPositionText: '',          //提示内容
        usrNumId:'',
        accessToken:''
      }
    },
    methods:{
      /**
       * 选择标签
       */
      selectAreaLabel(e){
        let index = e.currentTarget.dataset.index;
        // this.areaLabel[index].currentActive = !this.areaLabel[index].currentActive;
        if(index==this.currentLabelIndex){
          this.currentLabelIndex=-1;
        }else{
          this.currentLabelIndex = index;
          if(index==2){
            this.showInput = true
          }
        }
      },
      /**
       * 删除当前地址
       * @param id 当前地址id
       */
      deleteAddress(){
        const self = this;
        self.httpAjax({
          method: api.vip.deleteAddress,
          data:{
            "adr_num_id": self.editId,
            "usr_num_id": self.usrNumId,
            "access_token": self.accessToken
          }
        }).then(res=>{
          self.$router.go(-1)
        },res=>{
          console.log(res);
        })
      },
      /**
       * 提交地址
       */
      submitAddress(){
        if(this.addressName==''){
          this.showPositionValue = true;
          this.showPositionText = '请输入姓名';
          return false;
        }
        if(!this.editTel(this.addressTel)){
          console.log(this.addressTel);
          this.showPositionValue = true;
          this.showPositionText = '请输入正确电话';
          return false;
        }
        if(!this.regionId.length){
          this.showPositionValue = true;
          this.showPositionText = '请选择所在地址';
          return false;
        }
        if(this.addressDetail==''){
          this.showPositionValue = true;
          this.showPositionText = '请输入详细地址';
          return false;
        }
        // 新增地址
        this.addAddress()
      },
      /**
       * 检测电话号码
       */
      editTel(phone) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(phone)) {
          return false;
        } else {
          return true;
        }
      },
      /**
       * 收货地址详情
       */
      getAddressDetail(id){
        const self = this;
        self.httpAjax({
          method: api.vip.addressDetail,
          data:{
            "adr_num_id": id,
            "usr_num_id": self.usrNumId,
            "access_token": self.accessToken
          }
        }).then(res=>{
          let memberAdrName = res.member_adr;
          self.addressName = res.member_adr.cont_empe;
          self.addressTel = res.member_adr.contact_no;
          self.defaultSign = res.member_adr.default_sign;
          self.addressDetail = res.member_adr.adr;
          self.region = [memberAdrName.prv_name,memberAdrName.city_name,memberAdrName.city_area_name];
          self.regionId = [memberAdrName.prv_num_id,memberAdrName.city_num_id,memberAdrName.city_area_num_id];
          self.$nextTick(function () {
            self.region = [memberAdrName.prv_name,memberAdrName.city_name,memberAdrName.city_area_name];
            self.regionId = [memberAdrName.prv_num_id,memberAdrName.city_num_id,memberAdrName.city_area_num_id];
          })
        },res=>{
          console.log(res);
        })
      },
      /**
       * 编辑地址
       */
      addAddress(){
        const self = this;
        let params = {
          "usr_num_id": self.usrNumId,
          "default_sign":1,                   //是否为默认
          "prv_num_id": self.regionId[0],     //省id
          "city_num_id":self.regionId[1],      //市id
          "city_area_num_id":self.regionId[2], //区id
          "adr":self.addressDetail,           //详细地址
          "mobile": self.addressTel,          //电话
          "receiver": self.addressName,       //收件人
          "adr_num_id": self.editId,          //编辑地址id
          "channel_num_id": 90,               //渠道id
          "access_token": self.accessToken
        };
        self.httpAjax({
          method: api.vip.modifyAddress,
          data:params,
        }).then(res=>{
          // console.log(res);
          self.$router.go(-1)
        },res=>{
          console.log(res);
        })
      },
      /**
       * 组件addressPicker传回的所在区域
       */
      getArea(m){
        this.regionId = m
      }
    },
    created(){
      this.editId = this.$route.query.id;
      this.usrNumId = this.local('usr_num_id');
      this.accessToken = this.local('access_token')
      this.$store.dispatch('footerStatus/hideFooter');
      this.getAddressDetail(this.editId)
    }
  }
</script>
