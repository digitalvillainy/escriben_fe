<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
	<header>
		<NavBar />
	</header>
	<main>
		<h1 class="text-3xl font-bold underline">Escriben</h1>
		<RouterView />
	</main>
</template>

<style scoped></style>
