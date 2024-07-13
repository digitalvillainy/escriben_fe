<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import StepCard from '../components/cards/StepCard.vue';
import TextInput from '../components/inputs/TextInput.vue';
import UserIcon from '../components/icons/UserIcon.vue';
import LockIcon from '../components/icons/LockIcon.vue';
import MailIcon from '../components/icons/MailIcon.vue';

import { reactive, computed } from 'vue';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

import { getApi } from '../axios.ts';

const router = useRouter();
const { email, token } = useRoute().query;

// Form State
const form = reactive({
	password: '',
	confirmPassword: '',
});

// Rules for vuelidate validation
const rules = computed(() => {
	return {
		password: { required, minLength: minLength(8) },
		confirmPassword: { required, sameAs: sameAs(form.password) },
	}
});

const v$ = useVuelidate(rules, form);

const submitForm = async () => {
	const result = await v$.value.$validate();
	if (!result) return

	try {
		const payload: object = { 
			token: token, 
			email: email,
			password: form.password
		};
		const response = await getApi(`/reset-password?token=${token}&email=${email}&password=${form.password}`);
		router.push({ name: 'login' });
	} catch (error) {
		v$.value.$touch();
		console.log(error);
	}
};
</script>

<template>
	<section class="flex flex-col h-screen">
		<NavBar />
		<form class="flex flex-col place-items-center flex-grow" @submit.prevent="submitForm">
			<h3 class="text-5xl text-center font-normal mt-36 mb-20 pb-2 font-antonio text-shadow-lg">Reset Password</h3>
			<StepCard class="w-[49rem] h-[20rem] drop-shadow-2xl border-black border-2 flex flex-col">
				<h5 class="font-antonio text-3xl text-left">Create Your New Password</h5>
				<div class="flex flex-col gap-x-2">
					<TextInput type="password" label="Password" placeholder="Password" class="w-full relative" v-model="form.password" :errors="v$.password.$errors">
						<LockIcon class="absolute top-1 right-1.5"/>
					</TextInput>
					<TextInput type="password" label="Type Password Again" placeholder="Type Password Again" class="w-full relative" v-model="form.confirmPassword" :errors="v$.confirmPassword.$errors">
						<LockIcon class="absolute top-1 right-1.5"/>
					</TextInput>
				</div>
				<div class="flex flex-row space-x-3">
					<button type="submit" class="w-full p-2 text-2xl shadow-2xl rounded-lg bg-custom-cyan hover:bg-cyan-500">SUBMIT</button>
				</div>
			</StepCard>
		</form>
		<Footer />
	</section>
</template>
