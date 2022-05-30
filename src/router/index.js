import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Chat';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
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
	}
];

const router = new VueRouter({
	routes
});

export default router;
