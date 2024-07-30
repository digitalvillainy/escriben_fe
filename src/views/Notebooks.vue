<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import MarkdownEditor from '../components/MarkdownEditor/MarkdownEditor.vue';
import CloseChevronIcon from '../components/icons/CloseChevronIcon.vue';
import CloseIcon from '../components/icons/CloseIcon.vue';
import DeleteModal from '../components/Modals/DeleteModal.vue';

import { useRouter, useRoute } from 'vue-router';
import { useNotebooksStore } from '../stores/notebooks';
import { useNotesStore } from '../stores/notes';
import {useUserStore} from '../stores/user';
import { ref, onBeforeMount, onMounted, computed } from 'vue';

const { notebook_id } = useRoute().params;
const notebookStore = useNotebooksStore();
const notesStore = useNotesStore();
const userStore = useUserStore();

let currentNotebook = ref<object>({});
let currentNotes = ref<array<object>>([]);
let selectedNote = ref<object>({});
let hiddenToggle = ref<boolean>(false);
let deleteTarget = ref<object>({});
let show = ref<boolean>(false);
let timeout;

const changeSelectedNote = (note): void => {
	selectedNote.value = note;
};

const hideMenu = (): void => {
	hiddenToggle.value = !hiddenToggle.value;
};

const deleteModalCtrl = (note: object): void => {
	deleteTarget.value = note;
	show.value = !show.value;
};

const addNote = (): void => {
	const newNote = {
		title: 'New Note',
		content: '# Add your content here...',
		notebook_id: notebook_id,
	};

	notesStore.createNote(newNote.title, newNote.content, newNote.notebook_id);
};

const deleteNote = async (): Promise<void> => {
	await notesStore.deleteNoteById(deleteTarget.value.id);
	show.value = !show.value;
	currentNotes.value = await notesStore.getNotesByNotebook(notebook_id);
	selectedNote.value = currentNotes.value[0];
};

const updateNotes = (notes: string): void => {
	if (notes.content === '') {
		notes.content = '# Add your content here...';
	}

	if (notes.title === '') {
		notes.title = 'New Note';
	}

	selectedNote.value.content = notes;
	clearTimeout(timeout);
	timeout = setTimeout(
		() => {
			notesStore.updateNoteById(selectedNote.value.id, selectedNote.value.title, selectedNote.value.content)
		}, 1000);
};

const updateNotebooks = (notebook): void => {
	currentNotebook.value.title = notebook.title;
	clearTimeout(timeout);
	timeout = setTimeout(
		() => {
			notebookStore.updateNotebook(notebook.id, notebook.title);
		}, 1000);
};

const updateNotebook = (notebook): void => {
	notebookStore.updateNotebookById(notebook.id, notebook.title, notebook.color, notebook.icon);
};

onBeforeMount(async (): Promise<void> => {
	currentNotes.value = await notesStore.getNotesByNotebook(notebook_id);
	const defaultNote = {
		title: 'New Note',
		content: '# Add your content here...',
		notebook_id: notebook_id,
	};
	selectedNote.value = currentNotes.value.length > 0 ? currentNotes.value[0] : defaultNote;

	// Create a default note if there are no notes
	if (currentNotes.value.length == 0) {
		notesStore.createNote(defaultNote.title, defaultNote.content, defaultNote.notebook_id);
	}

});

onMounted((): void => {
	currentNotebook.value = notebookStore.getNotebooks.find((notebook) => notebook.id == notebook_id);
});

/*
* TODO: Add The Following
* User Profile
* Update all modals with new composables
* Sharing Functionality
* Hide the Editor for readonly mode
* Search
* Save Progress Icon
* Add simpified layout component
* Add Export to PDF
*/
</script>
<template>
	<section class="flex flex-col h-screen">
		<NavBar />
		<main class="flex flex-col place-items-center flex-grow">
			<h3 class="text-3xl text-center font-normal mt-16 mb-12 pb-2 font-antonio text-shadow-lg cursor-pointer">
				<input type="text" v-model="currentNotebook.title" @input="updateNotebooks(currentNotebook)"
					class="bg-transparent" />/
				<input type="text" v-model="selectedNote.title" @input="updateNotes(selectedNote.content)"
					class="bg-transparent" />
			</h3>
			<h5 class="text-2xl text-center font-antonio text-shadow-lg my-8">
				Written By: {{ userStore.getFullName }}
			</h5>
			<section class="flex flex-row w-full px-4">
				<aside class="flex flex-col h-full w-1/12 p-4 place-content-between relative" v-if="!hiddenToggle">
					<ul class="flex flex-col list-disc font-antonio text-base">
						<li>
							{{ currentNotebook.title }}
						</li>
						<li class="ml-2 flex flex-row justify-between place-items-center" v-for="( note, index ) in currentNotes"
							:key="index">
							<button
								:class="[{ 'text-cyan-400': note.title === selectedNote.title }, 'm-1 text-shadow hover:text-cyan-400 overflow-x-hidden']"
								@click="changeSelectedNote(note)">
								{{ note.title }}
							</button>
							<CloseIcon class="w-3 h-3 cursor-pointer" @click="deleteModalCtrl(note)" />
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
		<DeleteModal @confirmed="deleteNote" :show="show">
			Are you sure you want to delete this note?
		</DeleteModal>
	</section>
</template>
