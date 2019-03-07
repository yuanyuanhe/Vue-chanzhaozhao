import Toast from './toast.vue'
const toastPlugin = {}

toastPlugin.install = function(Vue, opt={}){
  const toastBox = Vue.extend(Toast)
  toastBox.prototype.close = function(){
    this.visiable = false
  }
  Vue.prototype.$toasts = (option = {}) =>{
    let instance = new toastBox().$mount(document.createElement('div'))
    instance.message = typeof option === 'string' ? option : option.message
    document.body.appendChild(instance.$el)
    setTimeout(function(){
      instance.close()
    },1000)
  }
}

export default toastPlugin