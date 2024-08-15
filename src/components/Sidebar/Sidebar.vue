<script setup lang="ts">
import CloseChevronIcon from '../icons/CloseChevronIcon.vue';
import CloseIcon from '../icons/CloseIcon.vue';
import { ref } from 'vue';

const props = defineProps({
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

</script>
<template>
	<aside class="flex flex-col h-full w-1/12 p-4 place-content-between relative" v-if="!hiddenToggle">
		<ul class="flex flex-col list-disc font-antonio text-base">
			<li>
				{{ currentNotebook.title }}
			</li>
			<li class="ml-2 flex flex-row justify-between place-items-center" v-for="( note, index ) in currentNotes"
				:key="index">
				<button
					:class="[{ 'text-cyan-400': note.title === selectedNote.title }, 'm-1 text-shadow hover:text-cyan-400 overflow-x-hidden']"
					@click="$emit('changeSelected', note)">
					{{ note.title }}
				</button>
				<CloseIcon class="w-3 h-3 cursor-pointer" @click="$emit('deleteCtrl', note)" />
			</li>
			<li>
				<button class="m-1 text-shadow hover:text-cyan-400" @click="$emit('add')">
					Add Note
				</button>
			</li>
		</ul>

		<div class="flex flex-row w-full justify-end sticky bottom-8 right-4 z-20">
			<CloseChevronIcon class="w-10 h-10 mt-12 cursor-pointer" @click="hideMenu" />
		</div>
	</aside>
	<aside class="flex flex-col h-full w-fit p-4 place-content-end relative" v-else>
		<div class="flex flex-row w-full justify-end sticky bottom-8 right-4 z-20">
			<CloseChevronIcon class="w-10 h-10 mt-12 cursor-pointer rotate-180" @click="hideMenu" />
		</div>
	</aside>
</template>
