<script setup lang="ts">
import NotFoundIcon from '../components/icons/NotFoundIcon.vue';
import Layout from '../components/Layouts/Layout.vue';
</script>
<template>
	<Layout :footer="false">
		<template #content>
			<div class="flex flex-col h-full justify-center place-items-center space-y-4 overflow-y-hidden">
				<h1 class="text-5xl text-center font-antonio text-shadow">
					404 Page Not Found
				</h1>
				<NotFoundIcon class="size-96" />
			</div>
		</template>
	</Layout>
</template>
