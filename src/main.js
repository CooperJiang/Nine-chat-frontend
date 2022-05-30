import ElementUI from 'element-ui';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/index.less';
import './socket-io/index.js';
import './utils/vue.prototype';
import Message from '@/components/Message/index.js';
import './icons/index';
import './permission';
import './theme/global.less';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Message.register);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
