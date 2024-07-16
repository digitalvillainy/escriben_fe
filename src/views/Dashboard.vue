<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import StepCard from '../components/cards/StepCard.vue';
import PlusIcon from '../components/icons/PlusIcon.vue';

import {getApi, postApi} from '../axios.ts';
import {useUserStore} from '../stores/user';
import {onMounted, ref} from 'vue';


const userStore = useUserStore();

let notebooks: array<object> = ref([{}]);

const getDashboard = async () => {
	try {
		notebooks = await getApi(`/notebooks?user_id=${userStore.id}`);
	} catch (error) {
		console.error(error);
	}
};

const createNotebook = async () => {
	try {
		const response = await postApi(`/notebooks?user_id=${userStore.id}`);

	} catch (error) {
		console.error(error);
}

	await getDashboard();
};

onMounted(() => {
	//Requests Notbooks for user
	getDashboard();
});

</script>
<template>
	<!-- TODO: Add current notebooks and if not a prompt to create -->
	<section class="flex flex-col h-screen">
		<NavBar />
		<main class="flex flex-col place-items-center flex-grow">
			<h3 class="text-5xl text-center font-normal mt-36 mb-20 pb-2 font-antonio text-shadow-lg">Notebooks</h3>
			<div class="w-full flex flex-row justify-start px-12">
				<StepCard 
					@click="createNotebook" 
					class="w-44 h-64 drop-shadow-2xl border-custom-cyan border-dashed border-4 flex flex-col cursor-pointer hover:bg-gray-600 hover:text-white">
					<PlusIcon class="mx-auto"/>
					<span class="font-antonio text-lg text-center">Create Notebook</span>
				</StepCard>
			</div>
			<div class="w-full flex flex-row flex-wrap justify-start bg-zinc-900 h-full mt-8 pt-8 px-7 overflow-y-scroll overflow-x-hidden">

				<StepCard 
					v-for="( notebook, index ) in notebooks"
					v-bind:key="index"
					class="w-44 h-64 drop-shadow-2xl border-custom-cyan border-doshed border-4 
					flex flex-col cursor-pointer hover:bg-gray-600 hover:text-white m-4 hover:border-cyan-400">
					<span class="text-white font-antonio text-md text-center">{{notebook.title}}</span>
				</StepCard>
			</div>
		</main>
	</section>

</template>

