import Vue from 'vue'
import App from './App'

import store from './store'

// 图标组件
import faicon from '@/components/fa-icon/fa-icon.vue'
Vue.component('faicon',faicon)

Vue.config.productionTip = false

Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
  ...App
})
app.$mount()
