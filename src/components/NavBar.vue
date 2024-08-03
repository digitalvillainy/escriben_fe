<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUserStore } from '../stores/user.ts';
import { useRouter } from 'vue-router';
import UserIcon from '../components/icons/UserIcon.vue';
import ProfilePicIcon from '../components/icons/ProfilePicIcon.vue';
const userStore = useUserStore();

const authenticated = localStorage.getItem('token');
const router = useRouter();

const logout = () => {
	userStore.logout();
	router.push({ name: 'login' });
};


</script>
<template>
	<div class="flex flex-row justify-between place-items-center text-white font-antonio bg-black px-3 text-xl">
		<RouterLink to="/dashboard" v-if="authenticated" class="m-2 text-shadow hover:text-cyan-400">Dashboard</RouterLink>
		<RouterLink to="/" v-else class="m-2 text-shadow hover:text-cyan-400">Home</RouterLink>
		<span class="text-2xl">-Escriben-</span>
		<div class="flex flex-row place-items-center" v-if="!authenticated">
			<RouterLink to="/register" class="m-2 text-shadow hover:text-cyan-400">Register</RouterLink>
			<RouterLink to="/login" class="m-2 text-shadow hover:text-cyan-400">Login</RouterLink>
		</div>
		<div class="flex flex-row place-items-center" v-else>
			<ProfilePicIcon svgClass="w-8 h-8 fill-black hover:fill-cyan-400 cursor-pointer"/>
		</div>
	</div>
</template>
