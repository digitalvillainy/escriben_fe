<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import PreviewIcon from '../icons/PreviewIcon.vue';
import InfoIcon from '../icons/InfoIcon.vue';
import SaveIcon from '../icons/SaveIcon.vue';
import CloseChevronIcon from '../icons/CloseChevronIcon.vue';

const emit = defineEmits(['togglePreview', 'close']);
const preview = ref<boolean>(false);
const flip = ref<boolean>(false);

const togglePreview = (): void => {
	emit('togglePreview');
	preview.value = !preview.value;
};

const toggleFlip = (): void => {
	emit('close');
	flip.value = !flip.value;
};

</script>
<template>
	<div class="flex flex-row w-auto bg-neutral-900 p-4 justify-between space-x-4 place-items-center">
		<CloseChevronIcon @click="toggleFlip" :class="[{ 'rotate-180': flip }]" />

		<div class="flex flex-row space-x-4 place-items-center">
			<SaveIcon />
			<InfoIcon />
			<PreviewIcon @click="togglePreview" :previewMode="preview" />
		</div>

	</div>
</template>
