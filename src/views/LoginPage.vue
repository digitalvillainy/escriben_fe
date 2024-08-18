<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import StepCard from '../components/cards/StepCard.vue';
import TextInput from '../components/inputs/TextInput.vue';
import LockIcon from '../components/icons/LockIcon.vue';
import MailIcon from '../components/icons/MailIcon.vue';
import Layout from '../components/Layouts/Layout.vue';

import { reactive, computed, ref } from 'vue';
import { required, email, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

import { postApi } from '../axios.ts';
import { useUserStore } from '../stores/user';

const router = useRouter();

const userStore = useUserStore();

// Form State
const form = reactive({
	email: '',
	password: '',
});

const failedLogin: boolean = ref(false);

// Rules for vuelidate validation
const rules = computed(() => {
	return {
		email: { required, email },
		password: { required, minLength: minLength(8) },
	}
});

const v$ = useVuelidate(rules, form);

// TODO: Add error handling from server
const submitForm = async () => {
	const result = await v$.value.$validate();
	if (!result) return

	try {
		const response = await postApi('/login', form);
		if (response.status) {
			failedLogin.value = true;
			return
		}

		if (response.token) {
			localStorage.setItem('token', response.token);
			userStore.setUser(response.user);
			router.push({ name: 'dashboard' });
		}
	} catch (error) {
		v$.value.$touch();
		console.error(error);
	}
};
</script>

<template>
	<Layout>
		<template #content>
			<form class="flex flex-col justify-center place-items-center flex-grow w-full" @submit.prevent="submitForm">
				<StepCard class="w-11/12 mx-auto lg:w-[49rem] lg:h-[25rem] drop-shadow-2xl border-black border-2 flex flex-col">
					<h5 class="font-antonio text-3xl text-left">Login User</h5>
					<div class="flex flex-col flex-grow">
						<TextInput type="text" label="Email" placeholder="Email" class="w-full relative" v-model="form.email"
							:errors="v$.email.$errors">
							<MailIcon class="absolute top-1 right-1.5" />
						</TextInput>
						<TextInput type="password" label="Password" placeholder="Password" class="w-full relative"
							v-model="form.password" :errors="v$.password.$errors">
							<LockIcon class="absolute top-1 right-1.5" />
						</TextInput>
					</div>
					<div class="flex flew-row justify-center !mt-0" v-if="failedLogin">
						<p class="text-red-800 text-shadow">Invalid Credentials</p>
					</div>
					<div class="flex flex-col lg:flex-row lg:justify-between">
						<div class="flex flex-col lg:flex-row lg:justify-between lg:w-5/12 w-full">
							<RouterLink to="/forgot-password" class="text-shadow hover:text-cyan-400">Forgot Credentials?</RouterLink>
							<RouterLink to="/register" class="text-shadow hover:text-cyan-400">Not Registered?</RouterLink>
						</div>
						<button type="submit"
							class="w-full mt-6 lg:mt-0 lg:w-5/12 p-2 text-2xl shadow-2xl rounded-lg bg-custom-cyan hover:bg-cyan-500">LOGIN</button>
					</div>
				</StepCard>
			</form>
		</template>
	</Layout>
</template>
