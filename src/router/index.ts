import { createWebHistory, createRouter } from "vue-router";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";

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
		path: "/port",
		beforeEnter: () => {
			location.href='https://robertorivera.dev'
		},
		component: { template: '<div>Going to https://robertorivera.dev</div>' }
	},
	{
		path: "/instagram",
		beforeEnter: () => {
			location.href='https://www.instagram.com/xerafenix/'
		},
		component: { template: '<div>Going to https://www.instagram.com/xerafenix/' }
	},
	{
		path: "/threads",
		beforeEnter: () => {
			location.href='https://www.threads.net/@xerafenix?xmt=AQGzDZ1U138aT8iCQUGgKSTueEldyfHN98hibwqq1Oeylm0'
		},
		component: { template: '<div>Going to https://www.threads.net/@xerafenix?xmt=AQGzDZ1U138aT8iCQUGgKSTueEldyfHN98hibwqq1Oeylm0' }
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
