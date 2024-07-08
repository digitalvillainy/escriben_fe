<script setup lang="ts">
	import { RouterLink } from 'vue-router';
	import { ref } from 'vue';
	import InstagramIcon from '../components/icons/social/InstagramIcon.vue';
	import ThreadsIcon from '../components/icons/social/ThreadsIcon.vue';
	import FooterTriangleIcon from '../components/icons/FooterTriangleIcon.vue';

	const year: number = ref<number>(new Date().getFullYear());
</script>

<template>
	<footer class="flex flex-row justify-between px-5 mt-20">
		<div class="flex flex-row justify-between w-28 place-self-end pb-3">
			<RouterLink to="/instagram" target="_blank" class="text-shadow">
				<InstagramIcon />
			</RouterLink>
			<RouterLink to="/threads" target="_blank" class="text-shadow">
				<ThreadsIcon />
			</RouterLink>
		</div>
		<div class="w-full flex flex-row justify-center place-self-end">
			<FooterTriangleIcon />
		</div>
		<p class="place-self-end w-72 text-right font-antonio pb-3">Made By 
			<RouterLink to="/port" target="_blank" class="text-shadow hover:text-cyan-400">
				Roberto Rivera 
			</RouterLink>
			© {{ year }}</p>
	</footer>
</template>
