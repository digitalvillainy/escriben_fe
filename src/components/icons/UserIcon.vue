<script setup lang="ts">
import { ref } from 'vue';
import {RouterLink} from 'vue-router';

const props = defineProps({svgClass: String});

const show = ref(false);

</script>
<template>
	<div class="relative">
		<svg fill="none" xmlns="http://www.w3.org/2000/svg" :class="props.svgClass" @click="show = !show">
			<g clip-path="url(#a)">
				<path
					d="M13 14.857A7.429 7.429 0 1 0 13 0a7.429 7.429 0 0 0 0 14.857Zm-2.652 2.786C4.63 17.643 0 22.274 0 27.99c0 .951.772 1.723 1.724 1.723h22.552c.952 0 1.724-.772 1.724-1.723 0-5.717-4.631-10.348-10.348-10.348h-5.304Z" />
			</g>
			<defs>
				<clipPath id="a">
					<path fill="#fff" d="M0 0h26v29.714H0z" />
				</clipPath>
			</defs>
		</svg>
		<div v-if="show" class="absolute bg-black/60 top-9 right-0 bg-red p-2 w-56 flex flex-col space-y-2">
			<RouterLink to="/profile" class="text-shadow hover:text-cyan-400">Profile</RouterLink>
			<button class="text-shadow hover:text-cyan-400 text-left">Logout</button>
		</div>
	</div>
</template>
