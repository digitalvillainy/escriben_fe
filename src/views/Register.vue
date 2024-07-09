<script setup lang="ts">
import { RouterLink } from 'vue-router';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import StepCard from '../components/cards/StepCard.vue';
import TextInput from '../components/inputs/TextInput.vue';
import UserIcon from '../components/icons/UserIcon.vue';
import LockIcon from '../components/icons/LockIcon.vue';
import MailIcon from '../components/icons/MailIcon.vue';

import {reactive} from 'vue';

const form = reactive({
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
});

</script>

<template>
	<NavBar />
	<form class="min-h-screen flex flex-col place-items-center">
		<h3 class="text-5xl text-center font-normal mt-36 mb-20 pb-2 font-antonio text-shadow-lg">Register/Login</h3>
		<StepCard class="w-[49rem] h-[30rem] drop-shadow-2xl border-black border-2">
			<h5 class="font-antonio text-3xl text-left">Register User</h5>
			<div class="flex flex-row justify-between space-x-3">
				<TextInput type="text" label="First Name" placeholder="First Name" class="w-full relative">
					<UserIcon class="absolute top-2 right-0"/>
				</TextInput>
				<TextInput type="text" label="Last Name" placeholder="Last Name" class="w-full relative">
					<UserIcon class="absolute top-2 right-0"/>
				</TextInput>
			</div>
			<div class="flex flex-row justify-between space-x-3">
				<TextInput type="text" label="Email" placeholder="Email" class="w-full relative">
					<MailIcon class="absolute top-2 right-1.5"/>
				</TextInput>
				<TextInput type="text" label="Username" placeholder="Username" class="w-full relative">
					<UserIcon class="absolute top-2 right-0"/>
				</TextInput>
			</div>
			<!-- TODO: Add password validation -->
			<!-- TODO: Add password restrictions -->
			<div class="flex flex-row justify-between space-x-3">
				<TextInput type="password" label="Password" placeholder="Password" class="w-full relative">
					<LockIcon class="absolute top-1 right-1.5"/>
				</TextInput>
				<TextInput type="password" label="Type Password Again" placeholder="Type Password Again" class="w-full relative">
					<LockIcon class="absolute top-1 right-1.5"/>
				</TextInput>
			</div>
			<div class="flex flex-row justify-between space-x-3">
				<div class="flex flex-row justify-between w-5/12">
					<RouterLink to="/forgot" class="text-shadow hover:text-cyan-400">Forgot Password?</RouterLink>
					<RouterLink to="/login" class="text-shadow hover:text-cyan-400">Already Have An Account?</RouterLink>
				</div>
				<button type="submit" class="w-5/12 p-2 text-2xl shadow-2xl rounded-lg bg-custom-cyan hover:bg-cyan-500">REGISTER</button>
			</div>
		</StepCard>
	</form>
	<Footer />
</template>
