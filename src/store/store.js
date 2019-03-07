import Vue from 'vue';
import Vuex from 'vuex';
import footerStatus from './modules/footerStatus'
import cartNum from './modules/cartNum'
import pageLoad from './modules/pageLoad'
Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		footerStatus,
    cartNum,
    pageLoad
	}
});