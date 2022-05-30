import SocketIO from 'socket.io-client';
import VueSocketIoExtended from 'vue-socket.io-extended';
import Vue from 'vue';

const url = process.env.VUE_APP_WS_API;
const socket = SocketIO(url, {
	transports: ['websocket'],
	path: '/chat',
	reconnection: true,
	reconnectionAttempts: Infinity,
	autoConnect: false
});
Vue.use(VueSocketIoExtended, socket);
