<script setup lang="ts">
import CloseChevronIcon from '../icons/CloseChevronIcon.vue';
import CloseIcon from '../icons/CloseIcon.vue';
import { ref, watch } from 'vue';

const props = defineProps({
	hide: {
		type: Boolean,
	},
	selectedNote: {
		type: Object,
	},
	currentNotebook: {
		type: Object,
	},
	currentNotes: {
		type: Object,
	},
});

const hiddenToggle = ref<boolean>(false);

const hideMenu = (): void => {
	hiddenToggle.value = !hiddenToggle.value;
};

watch(() => props.hide, (newValue) => {
	hiddenToggle.value = newValue
})

</script>
<template>
	<aside class="flex flex-row lg:flex-col h-full w-full lg:w-2/12 lg:p-4 place-content-between relative z-30" v-show="!hiddenToggle">
		<ul class="flex flex-col list-disc font-antonio text-base absolute top-16 left-0 bg-black/80 backdrop-blur-sm w-full px-4 pt-9 pb-3 lg:bg-transparent">
			<li class="ml-3">
				{{ currentNotebook.title }}
			</li>
			<li class="ml-2 flex flex-row justify-between place-items-center" v-for="( note, index ) in currentNotes"
				:key="index">
				<button
					:class="[{ 'text-cyan-400': note.title === selectedNote.title }, 'm-1 text-shadow hover:text-cyan-400 overflow-x-hidden']"
					@click="$emit('changeSelected', note)">
					{{ note.title }}
				</button>
				<CloseIcon class="w-5 h-5 cursor-pointer" @click="$emit('deleteCtrl', note)" />
			</li>
			<li class="ml-3">
				<button class="m-1 text-shadow hover:text-cyan-400" @click="$emit('add')">
					Add Note
				</button>
			</li>
		</ul>
	</aside>
</template>
