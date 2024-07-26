<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
	show: Boolean,
	deleteConfirm: Boolean
});

const confirm = ref<boolean>(false);
const dialog = ref<HTMLElement | null>(null);

const openDialog = (confirm: boolean): void => {
	confirm.value = confirm;
	dialog.value.showModal();
};

const closeDialog = (confirm: boolean): void => {
	confirm.value = confirm;
	dialog.value.close();
};

</script>
<template>
	<dialog ref="dialog">
		<div class="modal-content">
			<p class="text-3xl font-antonio text-center">
				Are you sure you want to delete this?
			</p>
			<div class="flex flex-row justify-between">
				<button @click="closeDialog(true)">YES</button>
				<button @click="closeDialog(false)">NO</button>
			</div>
		</div>
	</dialog>
</template>
