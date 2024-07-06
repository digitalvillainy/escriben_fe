import { createWebHistory, createRouter } from "vue-router";
import Register from "../components/views/Register.vue";
import Home from "../components/views/Home.vue";

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
	}
];


const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
