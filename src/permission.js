import NProgress from 'nprogress';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';

NProgress.configure({ showSpinner: false });
const whiteList = ['/login', '/register'];

router.beforeEach(async (to, from, next) => {
	NProgress.start();
	document.title = '小九的聊天室';
	const hasToken = getToken();
	if (hasToken) {
		!store.state.user_info && (await store.dispatch('getUserInfo'));
		next();
	} else if (whiteList.indexOf(to.path) !== -1) {
		next();
	} else {
		next(`/login`);
		NProgress.done();
	}
});

router.afterEach(() => {
	NProgress.done();
});
