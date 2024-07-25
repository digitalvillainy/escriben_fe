<script setup lang="ts">
import EditBar from '../EditBar/EditBar.vue';
import { ref, watch, onBeforeMount, defineEmits } from 'vue';
import { marked } from 'marked';

const props = defineProps({
	notes: {
		type: Object,
		default: '',
	},
});

const markdown = ref<string>('# Markdown Editor');
const html = ref<string>('');
const hidePreview = ref<boolean>(false);
const emit = defineEmits(['update:modelValue']);

const updatePreview = (): void => {
	markdown.value = props.notes.content ? props.notes.content : markdown.value;
	html.value = props.notes.content ? marked(props.notes.content) : marked(markdown.value);
};

const saveNotesProgress = (): void => {
	emit('update:modelValue', markdown.value);
	updatePreview();
};

// Initialize preview
updatePreview();

watch(markdown, updatePreview);

watch(props, updatePreview);

</script>
<template>
	<section class="flex flex-col">
		<EditBar class="w-auto" @togglePreview="hidePreview = !hidePreview" />
		<div class="flex flex-row">
			<textarea v-model="markdown" @input="saveNotesProgress" :class="[{ 'editor-full': hidePreview }, 'editor']" class="bg-zinc-600 p-6"></textarea>
			<div v-html="html" v-if="!hidePreview"
				class="preview bg-zinc-400 p-6 prose text-white break-words overflow-x-hidden"></div>
		</div>
	</section>
</template>

<style scoped>
.editor {
	min-width: 50%;
}

.editor-full {
	min-width: 100% !important;
	max-width: 100% !important;
	min-height: 100% !important;
}

.preview {
	min-width: 50% !important;
	max-width: 50% !important;
}
</style>
