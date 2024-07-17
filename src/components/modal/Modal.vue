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
	emit('open');
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

const emit = defineEmits(['confirm', 'open', 'close']);

</script>
<template>
	<div>
		<dialog 
			ref="dialog" 
			@close="visible = false">
			<slot name="content"></slot>
			<slot name="footer"></slot>
			<slot name="actionButtons">
				<button
					v-if="!hideConfirmBtn"
					class="bg-custom-cyan hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded"
					@click="confirm"
				>
					{{ props.showBtnText }}
				</button>
				<button
					v-if="showCancelBtn"
					class="bg-red-800 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
					@click="closeModal"
				>
					{{ props.closeBtnText }}
				</button>
			</slot>
		</dialog>
		<div>
			<slot name="show" @click="showModal"></slot>
		</div>
	</div>
</template>
