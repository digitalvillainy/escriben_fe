<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import MarkdownEditor from '../components/MarkdownEditor/MarkdownEditor.vue';

import { useRouter, useRoute } from 'vue-router';
import { useNotebooksStore } from '../stores/notebooks';
import { useNotesStore } from '../stores/notes';
import { ref, onBeforeMount, onMounted, computed } from 'vue';

const { notebook_id } = useRoute().params;
const notebookStore = useNotebooksStore();
const notesStore = useNotesStore();

let currentNotebook = ref({});
let currentNotes = ref([]);
let selectedNote = ref({});
let timeout;

const changeSelectedNote = (note): void => {
	selectedNote.value = note;
};

const addNote = (): void => {
	const newNote = {
		title: 'New Note',
		content: '# Add your content here...',
		notebook_id: notebook_id,
	};

	notesStore.createNote(newNote.title, newNote.content, newNote.notebook_id);
};

const updateNotes = (notes): void => {
	selectedNote.value.content = notes;
	clearTimeout(timeout);
	timeout = setTimeout(
		() => {
			notesStore.updateNoteById(selectedNote.value.id, selectedNote.value.title, selectedNote.value.content)
		}, 1000);
};

const title = computed(() => {
	return selectedNote?.title || 'New Note';

});

onBeforeMount(async (): Promise<void> => {
	currentNotes.value = await notesStore.getNotesByNotebook(notebook_id);
	selectedNote.value = currentNotes.value[0];
});

onMounted((): void => {
	currentNotebook.value = notebookStore.getNotebooks.find((notebook) => notebook.id == notebook_id);
});

</script>
<template>
	<section class="flex flex-col h-screen">
		<NavBar />
		<main class="flex flex-col place-items-center flex-grow">
			<!-- TODO: Add an option to update the name of the note -->
			<h3 class="text-3xl text-center font-normal mt-20 mb-20 pb-2 font-antonio text-shadow-lg cursor-pointer">{{
				currentNotebook.title }} /
				<input type="text" v-model="selectedNote.title" @input="updateNotes(selectedNote.content)"
					class="bg-transparent" />
			</h3>
			<section class="flex flex-row w-full px-4">
				<!-- TODO: Create a hide show for aside -->
				<aside class="flex flex-col h-screen w-1/12 p-4 mb-12">
					<ul class="flex flex-col list-disc font-antonio text-base">
						<li>
							{{ currentNotebook.title }}
						</li>
						<li class="ml-8" v-for="( note, index ) in currentNotes">
							<button :key="index"
								:class="[{ 'text-cyan-400': note.title === selectedNote.title }, 'm-1 text-shadow hover:text-cyan-400']"
								@click="changeSelectedNote(note)">
								{{ note.title }}
							</button>
						</li>
						<li>
							<button class="m-1 text-shadow hover:text-cyan-400" @click="addNote">
								Add Note
							</button>
						</li>
					</ul>
				</aside>
				<MarkdownEditor class="w-11/12" @update:modelValue="updateNotes" :notes="selectedNote" />
			</section>
		</main>
	</section>
</template>
