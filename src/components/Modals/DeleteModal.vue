<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
	show: Boolean,
	deleteConfirm: Boolean
});

const confirm = ref(false);
const diaglog = ref(null);

const openDialog = (confirm: boolean) => {
	confirm.value = confirm;
	diaglog.value.showModal();
};

const closeDialog = (confirm: boolean) => {
	confirm.value = confirm;
	diaglog.value.close();
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
