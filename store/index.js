import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		avatarUrl: "",
	},
	mutations: {
		login(state, userInfo) {
			state.userName = userInfo.userName || '新用户';
			state.avatarUrl = userInfo.avatarUrl || '/static/img/visitor.png';
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "您未登录";
			state.avatarUrl = '/static/img/visitor.png';
			state.hasLogin = false;
		}
	}
})

export default store
