<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import CloseIcon from '../icons/CloseIcon.vue';

const props = defineProps({
	show: Boolean
});

const emit = defineEmits(['toggleModal']);

// Open and close dialog and emit event and confirmed value
const openDialog = (): void => {
	emit('toggleModal');
};

</script>
<template>
	<div v-if="show"
		class="w-full h-full bg-black/30 backdrop-blur-sm flex flex-col justify-center m-0 fixed inset-0 z-20 text-slate-800">
		<div class="bg-zinc-300 rounded-xl p-4 space-y-24 w-8/12 place-self-center absolute z-30 text-slate-800">
			<div class="flex flex-row justify-between">
				<span class="text-3xl font-antonio">
					<slot name="title"></slot>
				</span>
				<CloseIcon class="w-10 h-10 cursor-pointer" @click="openDialog" />
			</div>
			<slot name="content"></slot>
		</div>
	</div>
</template>
