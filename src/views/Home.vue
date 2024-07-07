<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ContentCreatorIcon from '../icons/ContentCreatorIcon.vue';
</script>

<template>
	<section class="flex flex-col font-antonio bg-home-hero-pattern bg-cover bg-no-repeat bg-center h-[524px] relative">
		<div class="text-right z-20">
			<RouterLink to="/register" class="m-2 text-2xl font-antonio text-shadow">Register/Login</RouterLink>
		</div>
		<div class="flex flex-row justify-center text-center z-20 h-full">
			<div class="w-fit place-self-center">
				<h1 class="text-8xl font-normal mb-4 pb-2 border-b-8 border-white border-double text-shadow-lg">Escriben</h1>
				<span class="text-xl font-bold">A Markdown Note Taking Web Application</span>
			</div>
		</div>
		<div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
		<div class="z-20 flex justify-center m-5">
			<svg xmlns="http://www.w3.org/2000/svg" width="29" height="43" viewBox="0 0 29 43" fill="none">
			  <path d="M5.3022 14H1L13.4615 41L28 14H22.511L13.4615 29.9888L5.3022 14Z" fill="white" stroke="black"/>
			  <path d="M5.3022 1H1L13.4615 27L28 1H22.511L13.4615 16.3966L5.3022 1Z" fill="white" stroke="black"/>
			</svg>
		</div>
	</section>
	<section class="h-24 font-antonio text-shadow mb-24">
		<div class="text-3xl w-5/12 mx-auto my-24">
			Escriben is a browser based note taking application. 
			Built to let you focus on writing and organizing your thoughts.
		</div>

		<div class="relative w-full">
			<div class="flex flex-row w-8/12 mx-auto">
				<ContentCreatorIcon class="z-20" />
				<p class="w-4/12 h-fit absolute bottom-14 right-60 z-20 text-2xl">
					Our in browser editor allows you to make content quickly and easily all while keeping your hands on the keyboard.
					Create a notebook to contain all your notes and share with all your colleagues.
				</p>
			</div>
			<div class="bg-zinc-500 h-52 absolute inset-x-0 bottom-0 z-10"></div>
		</div>
	</section>
	<section class="my-24">
		<h1 class="text-3xl">How Does It Work?</h1>
		<div class="w-full flex flex-row justify-evenly">

		</div>
	</section>
</template>
<style scoped>

</style>
