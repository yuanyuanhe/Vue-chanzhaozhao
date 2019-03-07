const state = {
	showFooter: true
};
const getters = {
	isShow(state) {
		return state.showFooter
	}
};
const mutations = {
	show(state) {
		state.showFooter = true;
	},
	hide(state) {
		state.showFooter = false;
	}
};
const actions = {
	hideFooter(context) {
		context.commit('hide');
	},
	showFooter(context) {
		context.commit('show');
	}
};
export default {
  	namespaced: true,
    state,
    getters,
    mutations,
    actions
}
