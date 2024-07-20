<script setup lang="ts">
import { ref, watch } from 'vue';
import { marked } from 'marked';

const markdown = ref('# Markdown Editor');
const html = ref('# Markdown Editor');

const updatePreview = () => {
	html.value = marked(markdown.value);
};

watch(markdown, updatePreview);

</script>
<template>
	<div class="flex flex-row">
		<textarea v-model="markdown" @input="updatePreview" class="w-full bg-zinc-600 p-6"></textarea>
		<div v-html="html" class="w-full bg-zinc-400 p-6 prose text-white"></div>
	</div>
</template>

<style scoped>
</style>
