<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import ProfilePic from '../components/ProfilePic/ProfilePic.vue'
import TextInput from '../components/inputs/TextInput.vue';
import UserIcon from '../components/icons/UserIcon.vue';
import LockIcon from '../components/icons/LockIcon.vue';
import MailIcon from '../components/icons/MailIcon.vue';
import StepCard from '../components/cards/StepCard.vue';
import Layout from '../components/Layouts/Layout.vue';

import { reactive, computed, ref } from 'vue';
import { email, minLength, alpha, alphaNum } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useUserStore } from '../stores/user';
import { postApi } from '../axios.ts';

const userStore = useUserStore();
const errorMessage = ref<string>('');
const failedLogin = ref<boolean>(false);

const form = reactive({
	first_name: '',
	last_name: '',
	email: '',
	username: '',
});

// Rules for vuelidate validation
const rules = computed(() => {
	return {
		first_name: { alpha },
		last_name: { alpha },
		email: { email },
		username: { minLength: minLength(6), alphaNum },
	}
});


const v$ = useVuelidate(rules, form);

const submitForm = async () => {
	const result = await v$.value.$validate();
	if (!result) return

	let payload: object = {};

	//Filter out empty fields
	for (const key in { ...form }) {
		if (form[key].length > 0) {
			payload[key] = form[key];
		}
	}

	//Update User via id
	payload['id'] = userStore.getUser.id;
	try {
		const response = await postApi('/update-user', payload);
		if (response.status) {
			failedLogin.value = true;
			return
		}

	} catch (error) {
		failedLogin.value = true;
		v$.value.$touch();
		console.error(error);
	}
};

</script>
<template>
	<Layout>
		<template #content>
			<div class="flex flex-col place-items-center mt-20">
				<ProfilePic />
				<form class="flex flex-col place-items-center mt-12" @submit.prevent="submitForm">
					<StepCard
						class="w-[49rem] h-auto drop-shadow-2xl border-black border-2 flex flex-col content-between space-y-12">
						<h5 class="font-antonio text-3xl text-left">Update User Profile</h5>
						<div class="flex flex-row justify-between gap-x-2 content-between">
							<TextInput type="text" label="First Name" placeholder="First Name" class="w-full relative"
								v-model="form.first_name" :errors="v$.first_name.$errors">
								<UserIcon />
							</TextInput>
							<TextInput type="text" label="Last Name" placeholder="Last Name" class="w-full relative"
								v-model="form.last_name" :errors="v$.last_name.$errors">
								<UserIcon />
							</TextInput>
						</div>
						<div class="flex flex-row justify-between gap-x-2 !mt-1.5">
							<TextInput type="text" label="Email" placeholder="Email" class="w-full relative" v-model="form.email"
								:errors="v$.email.$errors">
								<MailIcon class="absolute top-1 right-1.5" />
							</TextInput>
							<TextInput type="text" label="Username" placeholder="Username" class="w-full relative"
								v-model="form.username" :errors="v$.username.$errors">
								<UserIcon />
							</TextInput>
						</div>
						<div class="flex flex-row justify-end space-x-3">
							<button type="submit"
								class="w-full p-2 text-2xl shadow-2xl rounded-lg bg-custom-cyan hover:bg-cyan-500">SAVE</button>
						</div>
					</StepCard>
				</form>
			</div>
		</template>
	</Layout>
</template>
