import { createWebHistory, createRouter } from "vue-router";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Forgot from "../views/Forgot.vue";
import Dashboard from "../views/Dashboard.vue";
import ResetPwd from "../views/ResetPwd.vue";
import Notebooks from "../views/Notebooks.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home
	},
	{
		path: "/register",
		name: "register",
		component: Register
	},
	{
		path: "/login",
		name: "login",
		component: Login
	},
	{
		path: "/forgot-password",
		name: "forgot-password",
		component: Forgot
	},
	{
		path: "/reset-password?:token&:email",
		name: "reset-password",
		component: ResetPwd
	},
	{
		path: "/dashboard",
		name: "dashboard",
		component: Dashboard,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/notebooks?notebook_id=:notebook_id",
		name: "notebooks",
		component: Notebooks,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/port",
		beforeEnter: () => {
			location.href = 'https://robertorivera.dev'
		},
		component: { template: '<div>Going to https://robertorivera.dev</div>' }
	},
	{
		path: "/instagram",
		beforeEnter: () => {
			location.href = 'https://www.instagram.com/xerafenix/'
		},
		component: { template: '<div>Going to https://www.instagram.com/xerafenix/' }
	},
	{
		path: "/threads",
		beforeEnter: () => {
			location.href = 'https://www.threads.net/@xerafenix?xmt=AQGzDZ1U138aT8iCQUGgKSTueEldyfHN98hibwqq1Oeylm0'
		},
		component: { template: '<div>Going to https://www.threads.net/@xerafenix?xmt=AQGzDZ1U138aT8iCQUGgKSTueEldyfHN98hibwqq1Oeylm0' }
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

// TODO: Make it so when loggedin you always go to Dashboard when attempting to login/register/home
// Check if user is authenticated
router.beforeEach((to, from, next) => {
	const isAuthenticated = !!localStorage.getItem('token');
	if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
		next({ name: 'login' })
	} else {
		next()
	}
});
export default router;
