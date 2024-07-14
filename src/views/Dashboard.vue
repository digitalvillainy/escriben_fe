<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import StepCard from '../components/cards/StepCard.vue';
import PlusIcon from '../components/icons/PlusIcon.vue';

import {getApi, postApi} from '../axios.ts';
import {useUserStore} from '../stores/user';

const userStore = useUserStore();

const getDashboard = async () => {
	try {
		const response = await getApi(`/notebooks?user_id=${userStore.id}`);
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
};


//Requests Notbooks for user
getDashboard();

</script>
<template>

	<section class="flex flex-col h-screen">
		<NavBar />
		<main class="flex flex-col place-items-center flex-grow">
			<h3 class="text-5xl text-center font-normal mt-36 mb-20 pb-2 font-antonio text-shadow-lg">Notebooks</h3>
			<div class="w-full flex flex-row justify-start px-12">
				<StepCard 
					@click="createNotebook" 
					class="w-64 h-96 drop-shadow-2xl border-custom-cyan border-dashed border-8 flex flex-col cursor-pointer hover:bg-gray-600 hover:text-white"
				>
					<PlusIcon class="mx-auto"/>
				</StepCard>
			</div>
			<div class="w-full flex flex-row justify-start bg-zinc-500">
			</div>
		</main>
		<Footer />
	</section>

</template>

