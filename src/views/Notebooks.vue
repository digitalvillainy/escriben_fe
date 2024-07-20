<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import MarkdownEditor from '../components/MarkdownEditor/MarkdownEditor.vue';

import {useRouter, useRoute} from 'vue-router';
import {useNotebooksStore} from '../stores/notebooks';
import {ref} from 'vue';

const {notebook_id}= useRoute().params;
const notebookStore = useNotebooksStore();

let currentNotebook = ref({});
currentNotebook.value = notebookStore.getNotebooks.find((notebook) => notebook.id == notebook_id);

</script>
<template>
	<section class="flex flex-col h-screen">
		<NavBar />
		<main class="flex flex-col place-items-center flex-grow">
			<h3 class="text-3xl text-center font-normal mt-20 mb-20 pb-2 font-antonio text-shadow-lg">{{ currentNotebook.title }} / Note 1</h3>
			<section class="flex flex-row w-full px-4">
				<aside class="flex flex-col h-screen w-1/12 p-4 mb-12">
					<ul class="flex flex-col list-disc font-antonio text-base">
						<li>{{currentNotebook.title}}</li>
						<!-- TODO: List all notes in the notebook -->
						<li class="ml-8">Note 1</li>
						<!-- TODO: Create new note in notebook -->
						<li>Add Note</li>
					</ul>
				</aside>
				<MarkdownEditor class="w-11/12 h-screen" />
			</section>
		</main>
	</section>
</template>

