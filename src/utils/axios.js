import axios from 'axios';
import { Message } from 'element-ui';
import store from '../store/index';
import { getToken } from '@/utils/auth';

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000
});
service.interceptors.request.use(
	config => {
		if (getToken()) {
			config.headers.Authorization = getToken();
		}
		return config;
	},
	error => Promise.reject(error)
);

service.interceptors.response.use(
	response => {
		const res = response.data;
		if (![200, 201].includes(response.status)) {
			return Promise.reject(new Error(res.message || 'Error'));
		}
		return res;
	},
	error => {
		if (error.message === 'timeout of 5000ms exceeded') {
			Message.error('请求超时，请检查您的网络状态或重新请求！');
		}
		const { status, data } = error.response;
		const { code, message } = data;
		if (status === 500) {
			store.commit('resetStore');
			store.dispatch('logout');
			return;
		}
		if (code === 401) {
			Message.error(`身份信息校验失败、请重新登录`);
			store.dispatch('logout');
		} else {
			Message.error(message);
		}
		return Promise.reject(error);
	}
);

export default service;
