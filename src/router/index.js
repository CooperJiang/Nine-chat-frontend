import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Chat')
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/login.vue')
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../views/register.vue')
	},
	{
		path: '*',
		redirect: '/'
	}
];

const router = new VueRouter({
	routes
});

export default router;
