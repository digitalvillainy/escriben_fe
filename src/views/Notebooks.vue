<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import MarkdownEditor from '../components/MarkdownEditor/MarkdownEditor.vue';

import { useRouter, useRoute } from 'vue-router';
import { useNotebooksStore } from '../stores/notebooks';
import { useNotesStore } from '../stores/notes';
import { ref, onBeforeMount, onMounted } from 'vue';

const { notebook_id } = useRoute().params;
const notebookStore = useNotebooksStore();
const notesStore = useNotesStore();

let currentNotebook = ref({});
let currentNotes = ref([]);

let selectedNote = ref({});

const changeSelectedNote = (note): void => {
	selectedNote.value = note;
};

const addNote = () => {
	const newNote = {
		title: 'New Note',
		content: '# Add your content here...',
		notebook_id: notebook_id,
	};

	notesStore.createNote(newNote.title, newNote.content, newNote.notebook_id);
};

onBeforeMount(async () => {
	currentNotes.value = await notesStore.getNotesByNotebook(notebook_id);
	selectedNote.value = currentNotes.value[0];
});

onMounted(() => {
	currentNotebook.value = notebookStore.getNotebooks.find((notebook) => notebook.id == notebook_id);
});

</script>
<template>
	<section class="flex flex-col h-screen">
		<NavBar />
		<main class="flex flex-col place-items-center flex-grow">
			<!-- TODO: Add an option to update the name of the note -->
			<h3 class="text-3xl text-center font-normal mt-20 mb-20 pb-2 font-antonio text-shadow-lg">{{ currentNotebook.title
				}} / {{ selectedNote?.title || 'New Note' }}</h3>
			<section class="flex flex-row w-full px-4">
				<!-- TODO: Create a hide show for aside -->
				<aside class="flex flex-col h-screen w-1/12 p-4 mb-12">
					<ul class="flex flex-col list-disc font-antonio text-base">
						<li>
							{{ currentNotebook.title }}
						</li>
						<li class="ml-8" v-for="( note, index ) in currentNotes">
							<button :key="index" class="m-1 text-shadow hover:text-cyan-400" @click="changeSelectedNote(note)">
								{{ note.title }}
							</button>
						</li>
						<!-- TODO: Create new note in notebook -->
						<li>
							<button class="m-1 text-shadow hover:text-cyan-400" @click="addNote">
								Add Note
							</button>
						</li>
					</ul>
				</aside>
				<MarkdownEditor class="w-11/12" :notebook="currentNotebook" :notes="selectedNote" />
			</section>
		</main>
	</section>
</template>
