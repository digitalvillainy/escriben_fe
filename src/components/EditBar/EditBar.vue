<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import PreviewIcon from '../icons/PreviewIcon.vue';
const emit = defineEmits(['togglePreview']);
const preview = ref<boolean>(false);

const togglePreview = (): void => {
	emit('togglePreview');
	preview.value = !preview.value;
};

</script>
<template>
	<!-- TODO: Have a saved indicator -->
	<!-- TODO: Create a Hint Icon -->
	<div class="flex flex-row w-auto bg-neutral-900 p-4 justify-between">
		<PreviewIcon @click="togglePreview" :previewMode="preview"/>
	</div>
</template>
