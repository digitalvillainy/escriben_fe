<script setup lang="ts">
import { RouterLink } from 'vue-router';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import StepCard from '../components/cards/StepCard.vue';
import TextInput from '../components/inputs/TextInput.vue';
import UserIcon from '../components/icons/UserIcon.vue';
import LockIcon from '../components/icons/LockIcon.vue';
import MailIcon from '../components/icons/MailIcon.vue';

import { reactive, computed } from 'vue';
import { required, email, minLength, sameAs, alpha } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

import { postApi } from '../axios.ts';

// Form State
const form = reactive({
	first_name: '',
	last_name: '',
	email: '',
	username: '',
	password: '',
	confirmPassword: '',
});

// Rules for vuelidate validation
const rules = computed(() => {
	return {
		first_name: { required, alpha: true },
		last_name: { required },
		email: { required, email },
		username: { required },
		password: { required, minLength: minLength(8) },
		confirmPassword: { required, sameAs: sameAs(form.password) },
	}
});

const v$ = useVuelidate(rules, form);


const submitForm = async () => {
	const result = await v$.value.$validate();
	if (!result) return

	try {
		const response = await postApi('/register', form);
		//TODO: Store token in local storage
		//TODO: Add success message then redirect
		console.log(response);
	} catch (error) {
		//TODO: Add error message from server validation
		console.log(error);
	}

};


</script>

<template>
	<NavBar />
	<form class="min-h-screen flex flex-col place-items-center" @submit.prevent="submitForm">
		<h3 class="text-5xl text-center font-normal mt-36 mb-20 pb-2 font-antonio text-shadow-lg">Register/Login</h3>
		<StepCard class="w-[49rem] h-[30rem] drop-shadow-2xl border-black border-2">
			<h5 class="font-antonio text-3xl text-left">Register User</h5>
			<div class="flex flex-row justify-between gap-x-2">
				<TextInput type="text" label="First Name" placeholder="First Name" class="w-full relative" v-model="form.first_name" :errors="v$.first_name.$errors">
					<UserIcon class="absolute top-2 right-0"/>
				</TextInput>
				<TextInput type="text" label="Last Name" placeholder="Last Name" class="w-full relative" v-model="form.last_name" :errors="v$.last_name.$errors">
					<UserIcon class="absolute top-2 right-0"/>
				</TextInput>
			</div>
			<div class="flex flex-row justify-between gap-x-2 !mt-1.5">
				<TextInput type="text" label="Email" placeholder="Email" class="w-full relative" v-model="form.email" :errors="v$.email.$errors">
					<MailIcon class="absolute top-2 right-1.5"/>
				</TextInput>
				<TextInput type="text" label="Username" placeholder="Username" class="w-full relative" v-model="form.username" :errors="v$.username.$errors">
					<UserIcon class="absolute top-2 right-0"/>
				</TextInput>
			</div>
			<div class="flex flex-row justify-between gap-x-2 !mt-1.5">
				<TextInput type="password" label="Password" placeholder="Password" class="w-full relative" v-model="form.password" :errors="v$.password.$errors">
					<LockIcon class="absolute top-1 right-1.5"/>
				</TextInput>
				<TextInput type="password" label="Type Password Again" placeholder="Type Password Again" class="w-full relative" v-model="form.confirmPassword" :errors="v$.confirmPassword.$errors">
					<LockIcon class="absolute top-1 right-1.5"/>
				</TextInput>
			</div>
			<div class="flex flex-row justify-between space-x-3">
				<div class="flex flex-row justify-between w-5/12">
					<RouterLink to="/forgot" class="text-shadow hover:text-cyan-400">Forgot Credentials?</RouterLink>
					<RouterLink to="/login" class="text-shadow hover:text-cyan-400">Already Have An Account?</RouterLink>
				</div>
				<button type="submit" class="w-5/12 p-2 text-2xl shadow-2xl rounded-lg bg-custom-cyan hover:bg-cyan-500">REGISTER</button>
			</div>
		</StepCard>
	</form>
	<Footer />
</template>
