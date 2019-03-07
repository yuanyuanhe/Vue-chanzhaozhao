<template>
  <div class="wraper">
      <div class="container">
        <div class="assessment">
           <div class="goodsPic">
             <img src="../../assets/images/ordertempic.png"/>
           </div>
           <ul class="levels">
             <li :class="selectItem==0?'active':''" @click="selectTab(0)">
               <img src="../../assets/icons/PraiseAct.png" v-if="selectItem==0" />
               <img src="../../assets/icons/Praise.png" v-else />
               <span>好评</span>
             </li>
             <li :class="selectItem==1?'active':''" @click="selectTab(1)">
               <img src="../../assets/icons/ReviewAct.png" v-if="selectItem==1" />
               <img src="../../assets/icons/Review.png" v-else />
               <span>中评</span>
             </li>
             <li :class="selectItem==2?'active':''" @click="selectTab(2)">
               <img src="../../assets/icons/negativeAct.png" v-if="selectItem==2" />
               <img src="../../assets/icons/negative.png" v-else />
               <span>差评</span>
             </li>
           </ul>
        </div>
        <div class="advice">
            <textarea ref="tArea" rows="8" cols="50" v-model="comments" name="advice" placeholder="针对本品，发表一下您的看法和建议吧..." @input="inputComments" ></textarea>
        </div>
        <div class="showGoodsPic">
          <span class="goodsPic" v-if="fromCamera"><img :src="camera_imgSrc"/></span>
          <span v-if="!fromCamera" class="goodsPic" v-for="(v,i) in imgSrc">
            <img :src="v" />
          </span>         
           <div class="uploadPic">
              <div class="camera" @click="takePic">
                <img src="../../assets/icons/addpic.png" alt="" />
              </div>
              <p>拍照图片</p>
           </div>
           <div class="uploadPic">
              <div class="camera" @click="choosePic">
                <input type="file" ref="img" id="img" name="" value="" multiple @change="getPic($event)" accept="image/png,image/gif,image/jpg,image/jpeg" hidden />
                <img src="../../assets/icons/addpic.png" alt="" />
              </div>
              <p>选择图片</p>
           </div>
        </div>       
     </div>
  </div>
</template>
<script>
import api from '../../units/config'
export default {
  props:['index','goodsId'],
  data () {
    return {
      selectItem:0, 
      comments:'',
      imgSrc:[],
      camera_imgSrc:'',
      fromCamera:true      
    }
  },
  created(){
    
  },
  methods:{
      selectTab(num){//评价等级
       this.selectItem=num;
       this.$emit('favoriteLevel',num,this.index,this.goodsId);
      },
      inputComments(){//发表评论  
        this.$emit('inputComments',this.comments,this.index)
      },
    takePic(){ //调用本地相机
      let that=this;             
//    navigator.device.capture.captureImage(function(mediaFiles) {
//        alert(mediaFiles)         
//        var i, path, len;
//        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
//            path = mediaFiles[i].fullPath;
//            // do something interesting with the file
//            that.imgSrc.push(path);
//        }
//    }, function(error) {
//        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
//    }, {limit:6});

//    this.fromCamera=true;
//    navigator.camera.getPicture( function (imageData) {        
//      that.camera_imgSrc = 'data:image/jpeg;base64,' + imageData||that.imgSrc;
//    }, function (message) {
//         alert('Failed because: ' + message);
//         that.camera_imgSrc=that.imgSrc||'';
//    }, { 
//        quality: 50,
//        destinationType: Camera.DestinationType.DATA_URL
//    });                            
    },
    choosePic(){ //选择本地图片 
      this.$refs.img.click();
    },
    getPic(ev){ //获取选择到的本地图片     
      this.fromCamera=false;
      var files = ev.target.files,size=0,filesArr=[],url=""; // 得到files
      var lengthN =parseInt(files.length);
      if(lengthN>4){ // 图片上传超过四个
          alert('图片个数不能超过4个');
          this.$refs.img.value=''; // 清空当前的上传控件，
          lengthN=0; 
          return;
      }
      for(var i=0;i<lengthN;i++){
        size= files[i].size;
        if(size>1024*1024){ // 单个图片大于1M
          alert(files[i].name+'这张图片大于1M');
          this.$refs.img.value=''; // 清空当前的上传控件，
          lengthN=0;
          return;
        }
        url = window.URL.createObjectURL(files[i]);
        filesArr.push(url)
      }
      console.log(filesArr)
      if(filesArr.length>0) this.imgSrc=filesArr||camera_imgSrc;
      this.$emit('getGoodsPic',this.imgSrc,this.index);
    }
  }
}
</script>
<style lang="less" scoped>
.container{
     background:#ffffff;
     padding:32px 35px;
     .assessment{
       display: flex;
       flex-direction: row;
       justify-content: flex-start;
       align-items: center;
       padding-bottom:40px;
       .goodsPic{
         flex: 2;
         img{
           width:89px;
           height:89px;
         }
       }
       .levels{
         flex:6;
         li{
            display: inline-block;
            margin-right: 46px;
            height:23px;
            font-size:24px;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(204,204,204,1);
            line-height:21px;
           &.active{
              color:#007440;             
           }
           img{
               display: inline-block;
               width:45px;
               height:52px;
               vertical-align: middle;
           }
           span{
             display: inline-block;
             vertical-align: middle;
             margin-left:16px;
           }
         }
         
       }
      }
       .advice{
         border-top:1px solid rgba(239,239,239,1);
         padding-top:30px;
         textarea{
           resize: none;
           font-size: 20px;
           font-family:PingFang-SC-Regular;
           font-weight:400;
           color:#cccccc;
           line-height:21px;
            &::-webkit-input-placeholder { 
                color:#cccccc;
            }
            &:-moz-placeholder { 
               color:#cccccc;
            }
            &::-moz-placeholder {
               color:#cccccc;
            }
            &:-ms-input-placeholder { 
               color:#cccccc;
            }
         }
       }
       .showGoodsPic{
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: end;
          flex-wrap: wrap;
          padding-bottom:5px;
          .goodsPic{
            display: inline-block;
            img{
              width:120px;
              height:120px;
            }            
          }
          .uploadPic{
             .camera{
                width:120px;
                height:120px;
                background:rgba(255,255,255,1);
                box-shadow:0px 2px 10px 0px rgba(97,58,11,0.1);
                text-align: center;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
               img{
                 display: inline-block;
                 width:61px;
                 height:52px;
               }
             }
           p{
              width:120px;
              height:23px;
              padding:24px 0;
              font-size:24px;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:rgba(204,204,204,1);
              line-height:21px;
              text-align: center;
           }
       }
     }
     
  }
</style>


