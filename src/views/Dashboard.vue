<script setup lang="ts">
import {getApi} from '../axios.ts';

const getDashboard = async () => {
	try {
		console.log(localStorage.getItem('token'));
		const response = await getApi('/notebooks');
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

