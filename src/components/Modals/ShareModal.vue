<script setup lang="ts">
import { ref } from 'vue';

defineProps({ show: Boolean });
const confirm = ref<boolean>(false);
const emit = defineEmits(['confirmed']);
const dialog = ref<HTMLElement | null>(null);

const closeDialog = (mode: boolean): void => {
	confirm.value = mode;
	emit('confirmed', confirm.value);
};

</script>
<template>
	<div v-if="show" ref="dialog"
		class="w-screen h-full bg-black/30 backdrop-blur-sm flex flex-col justify-center m-0 fixed inset-0 z-20 text-slate-800">
		<div class="bg-zinc-400 rounded-xl p-4 space-y-3 w-3/12 place-self-center absolute z-30">
			<slot></slot>
			<div class="flex flex-row justify-center space-x-40">
				<button @click="closeDialog(false)"
					class="bg-red-800 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">CANCEL</button>
				<button @click="closeDialog(true)"
					class="bg-green-800 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">INVITE</button>
			</div>
		</div>
	</div>
</template>
