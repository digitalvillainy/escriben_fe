<script setup lang="ts">
import EditBar from "../EditBar/EditBar.vue";
import {ref, watch} from "vue";
import {marked} from "marked";

const props = defineProps({
  notes: {
    type: Object,
    default: () => ({}),
  },
});

// Initialize refs
const markdown = ref<string>(props.notes.content || "# Markdown Editor");
const html = ref<string>("");
const hidePreview = ref<boolean>(true);
const emit = defineEmits(["update:modelValue", "close"]);

// Update preview with new markdown
const updatePreview = async (): Promise<void> => {
  html.value = await marked(markdown.value);
};

const saveNotesProgress = (): void => {
  const payload = {...props.notes, content: markdown.value};
  emit("update:modelValue", payload);
  updatePreview();
};

// Watch for changes in props.notes and update internal state
watch(
    () => props.notes.content,
    (newContent) => {
      console.log(newContent);
      markdown.value = newContent || "";
      updatePreview();
    },
);

// Watch for changes in markdown and update preview
watch(markdown, saveNotesProgress);
</script>
<template>
  <section class="flex flex-col h-screen">
    <EditBar
        class="w-auto"
        @togglePreview="hidePreview = !hidePreview"
        @close="$emit('close')"
    />
    <div class="flex flex-col lg:flex-row relative">
            <textarea
                v-model="markdown"
                @input="saveNotesProgress"
                :class="[{ 'editor-full': hidePreview }, 'editor']"
                class="bg-zinc-600 p-6"
            ></textarea>
      <div
          v-html="html"
          v-if="!hidePreview"
          class="absolute top-0 lg:right-0 preview-sm lg:preview bg-zinc-400 p-6 prose text-white break-words overflow-x-hidden"
      ></div>
    </div>
  </section>
</template>

<style scoped>
.editor {
  min-width: 50%;
  min-height: 100vh !important;
}

.editor-full {
  min-width: 100% !important;
  max-width: 100% !important;
  min-height: 100vh !important;
}

.preview {
  min-width: 50% !important;
  max-width: 50% !important;
  min-height: 100vh !important;
}

.preview-sm {
  min-width: 100% !important;
  max-width: 100% !important;
  min-height: 100vh !important;
}
</style>
