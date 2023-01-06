import ElementUI from 'element-ui';
import Vue from 'vue';
import Barrage from 'vue-custom-barrage';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/index.less';
import './socket-io/index.js';
import './utils/vue.prototype';
import './icons/index';
import './permission';
import './theme/global.less';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(Barrage);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
