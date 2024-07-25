<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import MarkdownEditor from '../components/MarkdownEditor/MarkdownEditor.vue';
import CloseChevronIcon from '../components/icons/CloseChevronIcon.vue';
import CloseIcon from '../components/icons/CloseIcon.vue';

import { useRouter, useRoute } from 'vue-router';
import { useNotebooksStore } from '../stores/notebooks';
import { useNotesStore } from '../stores/notes';
import { ref, onBeforeMount, onMounted, computed } from 'vue';

const { notebook_id } = useRoute().params;
const notebookStore = useNotebooksStore();
const notesStore = useNotesStore();

let currentNotebook = ref<object>({});
let currentNotes = ref<array<object>>([]);
let selectedNote = ref<object>({});
let hiddenToggle = ref<boolean>(false);
let timeout;

const changeSelectedNote = (note): void => {
	selectedNote.value = note;
};

const hideMenu = (): void => {
	hiddenToggle.value = !hiddenToggle.value;
};

const addNote = (): void => {
	const newNote = {
		title: 'New Note',
		content: '# Add your content here...',
		notebook_id: notebook_id,
	};

	notesStore.createNote(newNote.title, newNote.content, newNote.notebook_id);
};

const deleteNote = async (note) => {
	await notesStore.deleteNoteById(note.id);
	currentNotes.value = await notesStore.getNotesByNotebook(notebook_id);
	selectedNote.value = currentNotes.value[0];
};

const updateNotes = (notes): void => {
	selectedNote.value.content = notes;
	clearTimeout(timeout);
	timeout = setTimeout(
		() => {
			notesStore.updateNoteById(selectedNote.value.id, selectedNote.value.title, selectedNote.value.content)
		}, 1000);
};

const updateNotebooks = (notebook): void => {
	currentNotebook.value.content = notes;
	clearTimeout(timeout);
	timeout = setTimeout(
		() => {
			notebookStore.updateNotebooks();
		}, 1000);
	selectedNote.value.title = notebook.title;
};

const updateNotebook = (notebook): void => {
	notebookStore.updateNotebookById(notebook.id, notebook.title, notebook.color, notebook.icon);
};

const title = computed(() => {
	return selectedNote?.title || 'New Note';
});

onBeforeMount(async (): Promise<void> => {
	currentNotes.value = await notesStore.getNotesByNotebook(notebook_id);
	const defaultNote = {
		title: 'New Note',
		content: '# Add your content here...',
		notebook_id: notebook_id,
	};
	selectedNote.value = currentNotes.value.length > 0 ? currentNotes.value[0] : defaultNote;
});

onMounted((): void => {
	currentNotebook.value = notebookStore.getNotebooks.find((notebook) => notebook.id == notebook_id);
});

// TODO: Handle issue regarding updating Notebook and note name

</script>
<template>
	<section class="flex flex-col h-screen">
		<NavBar />
		<main class="flex flex-col place-items-center flex-grow">
			<h3 class="text-3xl text-center font-normal mt-20 mb-20 pb-2 font-antonio text-shadow-lg cursor-pointer">
				<input type="text" v-model="currentNotebook.title" @input="updateNotes(selectedNote.content)"
					class="bg-transparent" />/
				<input type="text" v-model="selectedNote.title" @input="updateNotes(selectedNote.content)"
					class="bg-transparent" />
			</h3>
			<section class="flex flex-row w-full px-4">
				<aside class="flex flex-col h-full w-1/12 p-4 place-content-between relative" v-if="!hiddenToggle">
					<ul class="flex flex-col list-disc font-antonio text-base">
						<li>
							{{ currentNotebook.title }}
						</li>
						<li class="ml-8 flex flex-row justify-between place-items-center" v-for="( note, index ) in currentNotes">
							<button :key="index"
								:class="[{ 'text-cyan-400': note.title === selectedNote.title }, 'm-1 text-shadow hover:text-cyan-400']"
								@click="changeSelectedNote(note)">
								{{ note.title }}
							</button>
							<CloseIcon class="w-3 h-3 cursor-pointer" @click="notesStore.deleteNoteById(note.id)" />
						</li>
						<li>
							<button class="m-1 text-shadow hover:text-cyan-400" @click="addNote">
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
				<MarkdownEditor class="w-11/12" @update:modelValue="updateNotes" :notes="selectedNote" />
			</section>
		</main>
	</section>
</template>
