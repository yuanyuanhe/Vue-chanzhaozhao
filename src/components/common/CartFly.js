import Vue from 'vue';
import CartFly from './CartFly.vue';
const Constructor = Vue.extend(CartFly); // 直接将Vue组件作为Vue.extend的参数
const Instance = (img) => {
  var instance = new Constructor({
    el: document.createElement('img'),
    data:{
      img:img
    }
  });
  document.body.appendChild(instance.$el);
  Vue.nextTick(()=> {
    instance.show = true;
    instance.$el.addEventListener('animationend', event=>{
      if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
      }
    });
  });
};
export default {
  install: Vue => {
    Vue.prototype.CartFly = Instance; // 将PopProduct组件暴露出去，并挂载在Vue的prototype上
  }
};
