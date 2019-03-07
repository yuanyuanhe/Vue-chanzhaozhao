const state = {
	count: 0
};
const getters = {
	getNum(state) {
		return state.count
	}
};
const mutations = {
  changeCartNum(state,val) {
    state.count = val;
  }
};
const actions = {
	changeNum(context,val) {
		context.commit('changeCartNum',val);
	}
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
