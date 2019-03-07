import Vue from 'vue';
import PopShowSelect from './PopShowSelect.vue';
const Constructor = Vue.extend(PopShowSelect); // 直接将Vue组件作为Vue.extend的参数
const Instance = (data, cb) => {
  var instance = new Constructor({
    el: document.createElement('div'),
    data: {
      data: {
        spec:data
      }
    }
  });
  instance.callback = function (id,type,num,img) {
    cb(id,type,num,img);
  };
  // 关闭方法，删除节点
  instance.closePop=()=>{
    instance.show=false;
    instance.$el.addEventListener('transitionend', event=>{
      if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
      }
    });
  }
  document.body.appendChild(instance.$el);
  Vue.nextTick(function() {
    instance.show = true;
    instance.$el.addEventListener('transitionend', event=>{
      console.log(666)
      if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
      }
    });
  });
};
export default {
  install: Vue => {
    Vue.prototype.PopShowSelect = Instance; // 将PopProduct组件暴露出去，并挂载在Vue的prototype上
  }
};
