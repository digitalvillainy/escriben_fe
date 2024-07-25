<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import StepCard from '../components/cards/StepCard.vue';
import PlusIcon from '../components/icons/PlusIcon.vue';
import CloseIcon from '../components/icons/CloseIcon.vue';
import EditIcon from '../components/icons/EditIcon.vue';

import { getApi, postApi } from '../axios.ts';
import { useNotebooksStore } from '../stores/notebooks';
import { useUserStore } from '../stores/user';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const notebookStore = useNotebooksStore();
const userStore = useUserStore();
let notebooks: array<object> = ref([{}]);

//WARN: Currently not working
//TODO: Fix 500 error issues with user_id
//Create Notebook
const createNotebook = async (title: string, user_id: number): Promise<void> => {
	try {
		const response = await notebookStore.createNotebook(title, user_id);
		$router.push({ name: 'notebook', params: { notebook_id: response.id } });
	} catch (error) {
		console.error(error);
	}
};

//Requests Notbooks for user
const getNotebooks = async (): Promise<void> => {
	try {
		await notebookStore.getNotebooksByUserId();
	} catch (error) {
		console.error(error);
	}
}

getNotebooks();

notebooks.value = notebookStore.getNotebooks;

const deleteNotebook = async (id: number): Promise<void> => {
	try {
		await notebookStore.deleteNotebook(id);
	} catch (error) {
		console.error(error);
	}
};

</script>
<template>
	<section class="flex flex-col h-screen">
		<NavBar />
		<main class="flex flex-col place-items-center flex-grow">
			<h3 class="text-5xl text-center font-normal mt-36 mb-20 pb-2 font-antonio text-shadow-lg">Notebooks</h3>
			<div class="w-full flex flex-row justify-start px-12">
				<StepCard @click="createNotebook('New Notebook', userStore.user_id)" class="w-44 h-64 drop-shadow-2xl border-custom-cyan border-dashed border-4 flex flex-col 
					cursor-pointer hover:bg-gray-600 hover:text-white hover:border-cyan-400">
					<PlusIcon class="mx-auto" />
					<span class="font-antonio text-lg text-center">Create Notebook</span>
				</StepCard>
			</div>
			<div
				class="w-full flex flex-row flex-wrap justify-start bg-zinc-900 h-full mt-8 pt-8 px-7 overflow-y-scroll overflow-x-hidden">
				<h3 v-if="notebooks.length === 0" class="text-3xl font-antonio text-shadow-lg">
					Please create a notebook to get started...
				</h3>
				<StepCard v-else v-for="( notebook, index ) in notebooks" v-bind:key="index" class="w-44 h-64 drop-shadow-2xl border-custom-cyan border-doshed border-4 
					flex flex-col hover:bg-gray-600 hover:text-white m-4 hover:border-cyan-400">
					<span class="text-white font-antonio text-md text-center flex-grow">{{ notebook.title }}</span>
					<div class="flex flex-row justify-between cursor-pointer hover:bg-gray-600 hover:text-white">
						<CloseIcon @click="deleteNotebook(notebook.id)" />
						<router-link :to="{ name: 'notebooks', params: { notebook_id: notebook.id } }">
							<EditIcon />
						</router-link>
					</div>
				</StepCard>
			</div>
		</main>
	</section>
</template>
