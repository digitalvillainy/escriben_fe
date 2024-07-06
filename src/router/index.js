import { createMemoryHistory, createRouter } from "vue-router";
import {Register} from "@/views";

const routes = [
	{
		path: "/register",
		name: "register",
		component: Register
	}
];


const router = createRouter({
	history: createMemoryHistory(),
	routes
});
