 <template>
  <div class="slider-delete-container" ref="delContainer">
    <div class="flex slider-delete">
      <div class="slider-content" 
        @touchstart.capture='touchStart'
        @touchmove.capture='touchMove'
        @touchend.capture='touchEnd'
        :style="deleteSlider"
        ref="sliderContent"
      >
        <slot></slot>
      </div>
      <div class="btn-slide-container" ref='btnContainer' :style="btnPosition">
        <div @click="delEvent" :style="btnHeight" class="btn">
          删除
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "slideDelete",
    data() {
     return {
      startX:0,   //触摸位置
      endX:0,     //结束位置
      moveX: 0,   //滑动时的位置
      disX: 0,    //移动距离
      deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
      btnPosition: '',
      btnHeight: '',
     }
    },
    methods:{
      touchStart(ev){
        var btnEle = document.querySelectorAll('.btn-slide-container');
        var contentEle = document.querySelectorAll('.slider-content');
        for(var i = 0; i< btnEle.length; i++) {
          btnEle[i].attributes.style.value="transform:translateX(100%)"
        }
        for(var i = 0; i< contentEle.length; i++) {
          contentEle[i].attributes.style.value="transform:translateX(0px)"
        }
        ev= ev || event
        //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        if(ev.touches.length == 1){
          // 记录开始位置
          this.startX = ev.touches[0].clientX;
        }
      },
      touchMove(ev){
        // console.log(this.deleteSlider)
        ev = ev || event;
        //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
        let wd=this.$refs.btnContainer.offsetWidth;
        let parent =  ev.currentTarget.parentElement;
        if(ev.touches.length == 1) {
          // 滑动时距离浏览器左侧实时距离
          this.moveX = ev.touches[0].clientX     
          //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
          this.disX = this.startX - this.moveX;
          // console.log(this.disX)
          // 如果是向右滑动或者不滑动，不改变滑块的位置
          if (this.disX < 0 || this.disX == 0) {
            this.$refs.sliderContent.style.cssText="transform:translateX(0px)"  
            this.$refs.btnContainer.style.cssText="transform: translate(100%,0);transition: transform .2s" 
            // 大于0，表示左滑了，此时滑块开始滑动 
          }else if (this.disX > 0) {
            //具体滑动距离我取的是 手指偏移距离*5。
            // this.deleteSlider = "transform:translateX(-" + this.disX*5 + "px)"; 
            // this.btnPosition = "transform: translate(0,0)";       
            // 最大也只能等于删除按钮宽度 
            // if (this.disX*5 >= wd) {
              this.$refs.sliderContent.style.cssText="transform:translateX(-" + wd + "px)"  
              this.$refs.btnContainer.style.cssText="transform: translate(0,0);transition: transform .2s"   
            // }
          }
        }
      },
      touchEnd(ev){
        ev = ev || event;
        let wd = this.$refs.btnContainer.offsetWidth;
        let parent =  ev.currentTarget.parentElement;
        if (ev.changedTouches.length == 1) {
          let endX = ev.changedTouches[0].clientX;
          this.disX = this.startX - endX;
          // console.log(this.disX)
          //如果距离小于删除按钮一半,强行回到起点     
          if ((this.disX*5) < (wd/2)) {
            this.$refs.sliderContent.style.cssText="transform:translateX(0px)"  
            this.$refs.btnContainer.style.cssText="transform: translate(100%,0);transition: transform .2s"
          }else{
            //大于一半 滑动到最大值
            this.$refs.sliderContent.style.cssText="transform:translateX(-" + wd + "px)"  
            this.$refs.btnContainer.style.cssText="transform: translate(0,0);transition: transform .2s" 
          }
        }
      },
      //删除事件
      delEvent(){
        var this_ = this;
        this.$vux.confirm.show({
          // 组件除show外的属性
          'hide-on-blur': true,
          title: '删除商品',
          content: '确认删除选中的商品？',
          onCancel () {
            this_.resetSlider();
            this_.$vux.confirm.hide();
          },
          onConfirm () {
            this_.$emit('delEvent');
            this_.resetSlider();
          }
        });
        // this.$emit('delEvent')
      },
      resetSlider(){
        this.$refs.sliderContent.style.cssText="transform:translateX(0px)"  
        this.$refs.btnContainer.style.cssText="transform: translate(100%,0);transition: transform .2s"
      }
    },
    mounted(){
      this.deleteSlider = "transform:translateX(0px)";
      this.btnPosition = "transform: translate(100%,0)";
      this.btnHeight = 'height:' + this.$refs.delContainer.offsetHeight + 'px;line-height:' + this.$refs.delContainer.offsetHeight + 'px';
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/css/common";
  .slider-delete-container{
    width: 100%;
  }
  .slider-delete{
    width: 100%;
    position: relative;
    user-select: none;
    .slider-content{
      width: 100%;
      //设置过渡动画
      transition: transform 0.2s;    
      -webkit-transition: transform 0.2s;
      -moz-transition: transform 0.2s;
      -o-transition: transform 0.2s;
    }
    .btn-slide-container{
      position: absolute;
      background:red;
      right: 0;
      top: 0;
      color: @white;
      text-align: center;
      .btn{
        padding: 0 10px;
      }
    }
  }
</style>