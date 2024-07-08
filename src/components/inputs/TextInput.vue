<script setup lang="ts">
defineProps<{
	type: string
	label: string
	placeholder: string
}>();
</script>
<template>
	<label class="relative" :for="label">
		<input 
			:type="type" 
			class="w-full p-2 placeholder:text-custom-coal/75 text-custom-coal rounded-lg bg-zinc-300 shadow-[inset_1px_4px_8px_0_rgba(47,46,65,0.6)]" 
			:placeholder="placeholder" 
		/>
		<slot class="absolute top-0 right-0" />
	</label>
</template>
