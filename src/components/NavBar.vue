<script setup lang="ts">
	import { RouterLink } from 'vue-router';
	import { useUserStore } from '../stores/user.ts';
	import { useRouter } from 'vue-router';
	const userStore = useUserStore();

	const authenticated = userStore.isAuthenticated;
	const router = useRouter();
	const logout = () => {
		userStore.logout();
		router.push({ name:'login' });
	}
</script>
<template>
	<div class="flex flex-row justify-between place-items-center text-white font-antonio bg-black px-3 text-xl">
		<RouterLink to="/" class="m-2 text-shadow hover:text-cyan-400">Home</RouterLink>
		<span class="text-2xl">-Escriben-</span>
		<div class="flex flex-row place-items-center" v-if="!authenticated">
			<RouterLink to="/register" class="m-2 text-shadow hover:text-cyan-400">Register</RouterLink>
			<RouterLink to="/login" class="m-2 text-shadow hover:text-cyan-400">Login</RouterLink>
		</div>
		<div class="flex flex-row place-items-center" v-else>
			<button @click="logout" class="m-2 text-shadow hover:text-cyan-400">Logout</button>
		</div>
	</div>
</template>
