<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import StepCard from '../components/cards/StepCard.vue';
import TextInput from '../components/inputs/TextInput.vue';
import UserIcon from '../components/icons/UserIcon.vue';
import LockIcon from '../components/icons/LockIcon.vue';
import MailIcon from '../components/icons/MailIcon.vue';

import { reactive, computed } from 'vue';
import { required, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

import { postApi } from '../axios.ts';

const router = useRouter();

// Form State
const form = reactive({
	email: '',
});

// Rules for vuelidate validation
const rules = computed(() => {
	return {
		email: { required, email },
	}
});

const v$ = useVuelidate(rules, form);


const submitForm = async () => {
	const result = await v$.value.$validate();
	if (!result) return

	try {
		const response = await postApi('/forgot-password', form);
		router.push({ name: 'login' });
	} catch (error) {
		v$.value.$touch();
		console.error(error);
	}
};
</script>

<template>
	<section class="flex flex-col h-screen">
		<NavBar />
		<form class="flex flex-col place-items-center flex-grow" @submit.prevent="submitForm">
			<h3 class="text-5xl text-center font-normal mt-36 mb-20 pb-2 font-antonio text-shadow-lg">Forgot Password</h3>
			<StepCard class="w-[49rem] h-[20rem] drop-shadow-2xl border-black border-2 flex flex-col">
				<h5 class="font-antonio text-3xl text-left">Send Password Reset Link</h5>
				<div class="flex flex-col flex-grow">
					<TextInput type="text" label="Email" placeholder="Email" class="w-full relative" v-model="form.email" :errors="v$.email.$errors">
						<MailIcon class="absolute top-2 right-1.5"/>
					</TextInput>
				</div>
				<div class="flex flex-row justify-between space-x-3 !mt-0">
					<button type="submit" class="w-full p-2 text-2xl shadow-2xl rounded-lg bg-custom-cyan hover:bg-cyan-500">SUBMIT</button>
				</div>
			</StepCard>
		</form>
		<Footer />
	</section>
</template>
