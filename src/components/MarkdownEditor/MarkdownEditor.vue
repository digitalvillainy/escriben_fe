<script setup lang="ts">
import { ref, watch, onMounted, defineProps } from 'vue';
import { marked } from 'marked';

const props = defineProps({
	preview: {
		type: Boolean,
		default: true,
	},
	notes: {
		type: Array,
		default: '',
	},
	notebooks: {
		type: Array,
		default: '',
	}
});

const markdown = ref('# Markdown Editor');
const html = ref('');


const updatePreview = () => {
	html.value = marked(markdown.value);
};

markdown.value = props.notes[0]?.content || '';

watch(markdown, updatePreview);

onMounted(() => {
	updatePreview();
});


</script>
<template>
	<div class="flex flex-row">
		<textarea v-model="markdown" @input="updatePreview" class="bg-zinc-600 p-6"></textarea>
		<div v-html="html" class="preview bg-zinc-400 p-6 prose text-white break-words overflow-x-hidden"></div>
	</div>
</template>

<style scoped>
textarea {
	min-width: 50%;
}

.preview {
	min-width: 50% !important;
	max-width: 50% !important;
}
</style>
