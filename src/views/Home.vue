<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ContentCreatorIcon from '../components/icons/ContentCreatorIcon.vue';
import StepCard from '../components/cards/StepCard.vue';
import Step1Icon from '../components/icons/Step1Icon.vue';
import Step2Icon from '../components/icons/Step2Icon.vue';
import Step3Icon from '../components/icons/Step3Icon.vue';
import Footer from '../components/Footer.vue'; 
</script>

<template>
	<section class="flex flex-col font-antonio bg-home-hero-pattern bg-cover bg-no-repeat bg-center h-[524px] relative">
		<div class="text-right z-20">
			<RouterLink to="/login" class="m-2 text-md lg:text-2xl font-antonio text-shadow hover:text-cyan-400">
				Register/Login</RouterLink>
		</div>
		<div class="flex flex-row justify-center text-center z-20 h-full">
			<div class="w-fit place-self-center">
				<h1
					class="text-4xl lg:text-8xl w-fit mx-auto font-normal mb-4 pb-2 border-b-8 border-white border-double text-shadow-lg">
					Escriben
				</h1>
				<span class="text-md lg:text-xl font-bold">A Markdown Note Taking Web Application</span>
			</div>
		</div>
		<div class="z-20 flex justify-center m-5">
			<svg xmlns="http://www.w3.org/2000/svg" width="29" height="43" viewBox="0 0 29 43" fill="none">
				<path d="M5.3022 14H1L13.4615 41L28 14H22.511L13.4615 29.9888L5.3022 14Z" fill="white" stroke="black" />
				<path d="M5.3022 1H1L13.4615 27L28 1H22.511L13.4615 16.3966L5.3022 1Z" fill="white" stroke="black" />
			</svg>
		</div>
		<div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
	</section>

	<div class="font-antonio text-shadow text-xl lg:text-3xl w-5/12 mx-auto my-24">
		Escriben is a browser based note taking application.
		Built to let you focus on writing and organizing your thoughts.
	</div>
	<section class="font-roboto text-shadow mb-24 bg-zinc-500">
		<div class="flex flex-col lg:flex-row w-8/12 mx-auto">
			<ContentCreatorIcon class="size-48" />
			<p class="w-full lg:w-8/12 text-md lg:text-2xl h-fit place-self-center">
				Our in browser editor allows you to make content quickly and easily all while keeping your hands on the
				keyboard.
				Create a notebook to contain all your notes and share with all your colleagues.
			</p>
		</div>
	</section>
	<section class="my-24">
		<h1 class="text-5xl text-center font-antonio">How Does It Work?</h1>
		<div class="w-full flex flex-col items-center lg:flex-row justify-evenly my-24 space-y-12 lg:space-y-0">
			<StepCard class="h-96 w-64 lg:w-80">
				<div class="text-3xl">Create An Account</div>
				<Step1Icon class="justify-self-center w-52" />
				<p class="text-lg font-roboto">
					Create an account and start writing your first notebook.
				</p>
			</StepCard>
			<StepCard class="h-96 w-64 lg:w-80">
				<div class="text-3xl">Create Your Content</div>
				<Step2Icon class="justify-self-center w-52" />
				<p class="text-lg font-roboto">
					Write, and edit your notes using markdown
				</p>
			</StepCard>
			<StepCard class="h-96 w-64 lg:w-80">
				<div class="text-3xl">Organize Your Notes</div>
				<Step3Icon class="justify-self-center w-52" />
				<p class="txt-lg font-roboto">
					Notes are organized by notebook
				</p>
			</StepCard>
		</div>
	</section>

	<Footer />
</template>
