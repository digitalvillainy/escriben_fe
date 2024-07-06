<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
	<div class="bg-custom-gray min-h-screen text-white">
		<!-- <header class=""> -->
		<!-- 	<NavBar /> -->
		<!-- </header> -->
		<main>
			<RouterView />
		</main>
	</div>
</template>

<style scoped></style>
