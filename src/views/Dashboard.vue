<script setup lang="ts">
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
	<div>
		Dashboard
	</div>
</template>

