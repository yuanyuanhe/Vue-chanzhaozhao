import pageLoad from './pageLoad.vue'
import Vue from 'vue'

const pageLoadBox = Vue.extend(pageLoad)

let instance

const initInstane = () =>{
  if (Vue.prototype.$isServer) return
  instance = new pageLoadBox({
    el: document.createElement('div')
  })
}

const showPageLoad = (bool) =>{
  if(!instance){
    initInstane()
    document.body.appendChild(instance.$el)
  }

  Vue.nextTick(() => {
    instance.visible = !!bool
  })
}

export default showPageLoad

// export default {
//   install: function(Vue, opts = {}){
//     Vue.prototype.pageLoad = showPageLoad
//   }
// }

