<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import ProfilePic from '../components/ProfilePic/ProfilePic.vue'
import TextInput from '../components/inputs/TextInput.vue';
import UserIcon from '../components/icons/UserIcon.vue';
import LockIcon from '../components/icons/LockIcon.vue';
import MailIcon from '../components/icons/MailIcon.vue';
import StepCard from '../components/cards/StepCard.vue';

import { reactive, computed } from 'vue';
import { required, email, minLength, sameAs, alpha, alphaNum } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

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
		first_name: { required, alpha },
		last_name: { required, alpha },
		email: { required, email },
		username: { required, minLength: minLength(6), alphaNum },
	}
});


const v$ = useVuelidate(rules, form);

const submitForm = async () => {
	const result = await v$.value.$validate();
	if (!result) return

	try {
		const response = await postApi('/user', form);
		if (response.status) {
			failedLogin.value = true;
			return
		}

		if (response.token) {
			localStorage.setItem('token', response.token);
			useUserStore().setUser(response.user);
			router.push({ name: 'dashboard' });
		}
	} catch (error) {
		v$.value.$touch();
		console.error(error);
	}
};

/**
* TODO: Add a method to submit the form
* Add a method to delete the account
* Add a method to change the password
* Add a method to update User Information
* Add a method to update User Avatar
*/
</script>
<template>
	<section class="flex flex-col h-screen space-y-24">
		<NavBar />
		<main class="flex flex-row justify-between w-5/12 mx-auto flex-grow">
			<ProfilePic />
			<form class="flex flex-col place-items-center flex-grow" @submit.prevent="submitForm">
				<StepCard class="w-[49rem] h-auto drop-shadow-2xl border-black border-2 flex flex-col content-between space-y-12">
					<h5 class="font-antonio text-3xl text-left">User Settings</h5>
					<div class="flex flex-row justify-between gap-x-2 content-between">
						<TextInput type="text" label="First Name" placeholder="First Name" class="w-full relative"
							v-model="form.first_name" :errors="v$.first_name.$errors">
							<UserIcon svgClass="absolute -top-8 right-0 w-8 h-8 fill-[#3F3D56]" />
						</TextInput>
						<TextInput type="text" label="Last Name" placeholder="Last Name" class="w-full relative"
							v-model="form.last_name" :errors="v$.last_name.$errors">
							<UserIcon svgClass="absolute -top-8 right-0 w-8 h-8 fill-[#3F3D56]" />
						</TextInput>
					</div>
					<div class="flex flex-row justify-between gap-x-2 !mt-1.5">
						<TextInput type="text" label="Email" placeholder="Email" class="w-full relative" v-model="form.email"
							:errors="v$.email.$errors">
							<MailIcon class="absolute top-2 right-1.5" />
						</TextInput>
						<TextInput type="text" label="Username" placeholder="Username" class="w-full relative"
							v-model="form.username" :errors="v$.username.$errors">
							<UserIcon svgClass="absolute -top-8 right-0 w-8 h-8 fill-[#3F3D56]" />
						</TextInput>
					</div>
					<div class="flex flex-row justify-end space-x-3">
						<button type="submit"
							class="w-full p-2 text-2xl shadow-2xl rounded-lg bg-custom-cyan hover:bg-cyan-500">SAVE</button>
					</div>
				</StepCard>
			</form>
		</main>
		<Footer />
	</section>
</template>
