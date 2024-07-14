<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import {getApi} from '../axios.ts';
import {useUserStore} from '../stores/user';

const userStore = useUserStore();
const getDashboard = async () => {
	try {
		console.log(localStorage.getItem('token'));
		//TODO: add user id after crating user store in pinia
		const response = await getApi(`/notebooks?user_id=${userStore.id}`);
		console.log(response);
	} catch (error) {
		console.error(error);
	}
	console.log('Dashboard');
}

getDashboard();
</script>
<template>

	<section class="flex flex-col h-screen">
		<NavBar />
		<main class="flex flex-col place-items-center flex-grow">Dashboard</main>
		<Footer />
	</section>

</template>

