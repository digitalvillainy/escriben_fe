<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import PreviewIcon from '../icons/PreviewIcon.vue';
import InfoIcon from '../icons/InfoIcon.vue';
import SaveIcon from '../icons/SaveIcon.vue';

const emit = defineEmits(['togglePreview']);
const preview = ref<boolean>(false);

const togglePreview = (): void => {
	emit('togglePreview');
	preview.value = !preview.value;
};

</script>
<template>
	<div class="flex flex-row w-auto bg-neutral-900 p-4 justify-end space-x-4 place-items-center">

		<div class="flex flex-row space-x-4 place-items-center">
			<SaveIcon />
			<InfoIcon />
			<PreviewIcon @click="togglePreview" :previewMode="preview" />
		</div>

	</div>
</template>
