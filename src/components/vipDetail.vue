<template>
  <div class="body">
    <Header title="会员信息"></Header>
    <div class="vip-info-box">
      <div class="vip-info-edit">
        <div class="vip-info-edit-name">账号</div>
        <div class="vip-info-edit-con vip-info-edit-con01">{{userNum}}</div>
        <img class="vip-info-edit-level" src="../assets/icons/vipLevel.png" />
      </div>
      <div class="vip-info-edit">
        <div class="vip-info-edit-name">昵称<div class="vip-info-edit-must">*</div></div>
        <div class="vip-info-edit-con">
          <!--<div class="vip-info-edit-con vip-info-edit-con01">{{vipInfo.nick_name}}</div>-->
          <input class="vip-info-edit-input" type="text" placeholder="请填写昵称" placeholder-class="vip-info-edit-input-color"  maxlength="10" v-model.trim="name" />
        </div>
      </div>
      <div @click="showDatePicker" class="vip-info-edit">
        <div class="vip-info-edit-name">生日<div class="vip-info-edit-must">*</div></div>
        <div class="vip-info-edit-con">{{birthday}}</div>
      </div>
      <div @click="showPicker" class="vip-info-edit">
        <div class="vip-info-edit-name">性别<div class="vip-info-edit-must">*</div></div>
        <div class="vip-info-edit-con">{{sexName}}</div>
      </div>
      <div class="vip-info-edit">
        <div class="vip-info-edit-name">绑定手机号</div>
        <div class="vip-info-edit-con">
          <div class="vip-info-edit-con">{{mobile}}</div>
          <!--<input class="vip-info-edit-input" type="number" placeholder="请填写手机号" placeholder-class="vip-info-edit-input-color" />-->
        </div>
      </div>
    </div>
    <div @click="editVip" class="vip-info-editbtn">保存</div>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text=message position="middle"></toast>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  import Header from "../components/common/header"
  import api from './../units/config'
  export default {
    name: "vipDetail",
    components:{
      Toast,
      Header
    },
    data(){
      return{
        selected: '',
        sexName:'',                 //性别名称
        sexId:-1,                   //性别id
        sexList: [
          {text: '无', value: 0},
          {text: '男', value: 1},
          {text: '女', value: 2},
        ],
        birthday:'',                //生日
        name:'',                    //昵称
        userNum:'',                 //账号
        mobile:'',
        message:'',                //提示信息
        showPositionValue: false,   //toast为隐藏
        usrNumId:'',
        accessToken:''
      }
    },
    methods:{
      /**
       * 获取会员信息
       */
      getUserInfo(){
        const self = this;
        this.httpAjax({
          method: api.vip.vipDetail,
          data:{
            "usr_num_id": self.usrNumId,
            "mobile": null,
            "baby_sign": 1,
            "adr_sign": 0,
            "touch_sign": 0,
            "integral_sign": 0,
            "coupon_sign": 0,
            "growth_sign": 0,
            "access_token":self.accessToken
          }
        }).then(res=>{
          self.name = res.nick_name;
          self.birthday = res.birthday;
          if(res.sex_id==0){
            self.sexName = '无';
            self.sexId=0
          }else if(res.sex_id==1){
            self.sexName = '男';
            self.sexId=1
          }else if(res.sex_id==2){
            self.sexName = '女';
            self.sexId=2
          }
          self.mobile = res.mobile;
        },res=>{
          console.log(res);
        })
      },
      /**
       * 编辑会员信息
       */
      editVip(){
        const self = this;
        if(!this.name){
          this.showPositionValue = true;
          this.message = '昵称不能为空'
          return false
        }
        if(!this.birthday){
          this.showPositionValue = true;
          this.message = '生日不能为空'
          return false
        }
        if(this.sexId==-1){
          this.showPositionValue = true;
          this.message = '性别不能为空'
          return false
        }
        this.httpAjax({
          method: api.vip.modifyVip,
          data:{
            "usr_num_id": self.usrNumId,
            "nick_name": self.name,
            "birthday": self.birthday,
            "sex_id": self.sexId,
            "access_token": self.accessToken
          }
        }).then(res=>{
          this.showPositionValue = true;
          this.message = '修改成功'
        },res=>{
          console.log(res);
        })
      },
      /**
       * 性别选择
       */
      showPicker() {
        const self = this;
        if (!this.picker) {
          this.picker = this.$createPicker({
            title: '',
            data: [self.sexList],
            onSelect: this.selectSex,
          })
        }
        this.picker.show()
      },
      selectSex(selectedVal, selectedIndex, selectedText) {
        this.sexName = selectedText[0];
        this.sexId = selectedVal[0];
      },
      /**
       * 生日选择
       */
      showDatePicker() {
        if (!this.datePicker) {
          this.datePicker = this.$createDatePicker({
            title: '',
            min: new Date(1900, 1, 1),
            max: new Date(2020, 12, 31),
            value: new Date(),
            onSelect: this.selectBirthday,
          })
        }
        this.datePicker.show()
      },
      selectBirthday(date, selectedVal, selectedText) {
        this.birthday = selectedVal.join('-');
      },
    },
    created(){
      this.userNum = this.local('phone');
      this.usrNumId = this.local('usr_num_id');
      this.accessToken = this.local('access_token')
      this.$store.dispatch('footerStatus/hideFooter');
      this.getUserInfo();
    }
  }
</script>
<style lang="less">
  page,
  .body {
    height: 100%;
    font-family: PingFangSC-Regular;
    background-color:#f3f4f6;
    .vip-info-title{
      color: #333;
      font-size: 28px;
      padding: 50px 0 21px 36px;
    }
    .vip-info-box{
      background: #fff;
      padding-left: 45px;
      padding-top: 10px;
      .vip-info-edit{
        padding-left: 200px;
        min-height: 88px;
        color: #000;
        font-size: 26px;
        position: relative;
        border-bottom: 1px solid #EFEFEF;
        padding-top: 1px;
        padding-bottom: 1px;
        .vip-info-edit-level{
          width: 90px;
          height: 28px;
          display: inline-block;
        }
        .vip-info-edit-name{
          position: absolute;
          width: 200px;
          left: 0;
          top: 0;
          line-height: 88px;
          color: #666666;
          &.vip-info-edit-name01{
            width: auto;
          }
          .vip-info-edit-must{
            color: #eb6c39;
            display: inline-block;
          }
        }
        .vip-info-edit-con{
          width: 100%;
          line-height: 88px;
          color: #000;
          .vip-info-edit-input-color{
            color: #bcbaba;
          }
          .radio-group{
            color: #bcbaba;
            .radio{
              margin-right: 30px;
            }
          }
          .vip-info-edit-input{
            height: 88px;
            width: 100%;
          }
          &.vip-info-edit-con01{
            display: inline-block;
            width: auto;
            margin-right: 30px;
          }
        }
      }
    }
    .vip-info-editbtn{
      width: 600px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      color: #fff;
      font-size: 28px;
      background: #208656;
      border-radius: 40px;
      margin: 50px auto;
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
