<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref<HTMLElement | null>(null);

const props = defineProps({
	showBtnText: String,
	closeBtnText: String,
	hideConfirmBtn: Boolean,
	showCancelBtn: Boolean,
});

const showModal = (): void => {
	dialog.value?.showModal();
	visible.value = true;
};

const confirm = (): void => {
	dialog.value?.close();
	visible.value = false;
	emit('confirm');
};

const closeModal = (): void => {
	dialog.value?.close();
	visible.value = false;
	emit('close');
};

const emit = defineEmits(['confirm', 'close']);


</script>
<template>
	<div>
		<dialog ref="dialog">
			<slot></slot>
			<button 
				class="w-5/12 p-2 text-2xl shadow-2xl rounded-lg bg-custom-cyan hover:bg-cyan-500" 
				@click="closeModal">
				{{closeBtnText}}
			</button>
		</dialog>
		<button 
			class="w-full p-2 text-base shadow-2xl rounded-lg bg-custom-cyan hover:bg-cyan-500" 
			@click="showModal">
			{{showBtnText}}
		</button>
	</div>
</template>
