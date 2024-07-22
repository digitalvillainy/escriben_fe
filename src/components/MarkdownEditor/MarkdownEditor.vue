<script setup lang="ts">
import { ref, watch, onBeforeMount, defineProps } from 'vue';
import { marked } from 'marked';

const props = defineProps({
	preview: {
		type: Boolean,
		default: true,
	},
	notes: {
		type: Object,
		default: '',
	},
	notebooks: {
		type: String,
		default: '',
	}
});

const markdown = ref('# Markdown Editor');
const html = ref('');


const updatePreview = () => {
	markdown.value = props.notes.content ? props.notes.content : markdown.value;
	html.value = props.notes.content ? marked(props.notes.content) : marked(markdown.value);
};

updatePreview();

watch(markdown, updatePreview);

watch(props, updatePreview);



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
