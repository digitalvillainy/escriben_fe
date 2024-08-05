<script setup lang="ts">
import NavBar from '../NavBar.vue';
import Footer from '../Footer.vue';

const props = defineProps({
	footer: { type: Boolean, default: true },
});

</script>
<template>
	<section class="flex flex-col h-screen">
		<NavBar />
		<main class="flex flex-col place-items-center flex-grow">
			<slot name="content" />
		</main>
		<slot name="modal" />
		<Footer v-if="props.footer" />
	</section>
</template>
