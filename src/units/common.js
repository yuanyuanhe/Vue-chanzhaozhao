import Vue from 'vue'
import ToastBox from './toast/toast.js'
import PageLoad from './pageLoad/pageLoad.js'

export default {
	install: function(Vue, options){
    Vue.prototype.pageLoad = PageLoad
		Vue.prototype.local = function(){
			if(arguments && arguments.length>0){
				if(arguments.length == 1){
					return JSON.parse(localStorage.getItem(arguments[0]))
				}else if(arguments.length == 2){
					localStorage.setItem(arguments[0],JSON.stringify(arguments[1]))
				}else{
					console.log("error")
				}
			}else{
				console.log("error")
			}
		}
		Vue.prototype.removelocal = function(){
			if(arguments && arguments.length>0){
				if(arguments.length == 1){
					localStorage.removeItem(arguments[0])
				}else{
					console.log("error")
				}
			}else{
				localStorage.clear()
			}
		}
		Vue.prototype.phoneVerify = function(){
			var reg = /^[1][3,4,5,7,8][0-9]{9}$/
			return reg.test(arguments[0])
		}
	}
}