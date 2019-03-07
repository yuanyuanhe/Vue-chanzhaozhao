const state = {
	pageLoadProperty: false
};

const mutations = {
	show(state) {
		state.pageLoadProperty = true;
	},
	close(state) {
		state.pageLoadProperty = false;
	}
};

const actions = {
	closePageLoad(context) {
    
    context.commit('close');
    console.log(state.pageLoadProperty)
	},
	showPageLoad(context) {
    
    context.commit('show');
    console.log(state.pageLoadProperty)
	}
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}