<script setup lang="ts">
import MarkdownEditor from "../components/MarkdownEditor/MarkdownEditor.vue";
import DeleteModal from "../components/Modals/DeleteModal.vue";
import Layout from "../components/Layouts/Layout.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";

import { useRoute } from "vue-router";
import { useNotebooksStore, Notebook } from "../stores/notebooks";
import { useNotesStore, Note } from "../stores/notes";
import { useUserStore } from "../stores/user";
import { ref, onBeforeMount, onMounted, provide } from "vue";

const { notebook_id } = useRoute().params;
const notebookStore = useNotebooksStore();
const notesStore = useNotesStore();
const userStore = useUserStore();

let currentNotes = ref<Array<Note>>([]);
let hiddenToggle = ref<boolean>(false);
let currentNotebook = ref<Notebook>({
    id: 0,
    user_id: 0,
    title: "",
    created_at: "",
    updated_at: "",
});
let selectedNote = ref<Note>({
    id: 0,
    title: "",
    content: "",
    notebook_id: 0,
    created_at: "",
    updated_at: "",
});
let deleteTarget = ref<Note>({
    id: 0,
    title: "",
    content: "",
    notebook_id: 0,
    created_at: "",
    updated_at: "",
});
let savedNotes = ref<boolean>(false);
let show = ref<boolean>(false);
let timeout: number;
const notes_id = Array.isArray(notebook_id) ? notebook_id[0] : notebook_id;

provide("savedNotes", savedNotes);
const changeSelectedNote = (note: Note): void => {
    selectedNote.value = note;
};

const hideMenu = (): void => {
    hiddenToggle.value = !hiddenToggle.value;
};

const deleteModalCtrl = (note: Note): void => {
    deleteTarget.value = note;
    show.value = !show.value;
};

const addNote = (): void => {
    const newNote = {
        title: "New Note",
        content: "# Add your content here...",
        notebook_id: notes_id,
    };

    notesStore.createNote(newNote.title, newNote.content, newNote.notebook_id);
};

const deleteNote = async (): Promise<void> => {
    show.value = !show.value;
    if (deleteTarget.value.id !== undefined) {
        await notesStore.deleteNoteById(deleteTarget.value.id);
    }
    currentNotes.value = await notesStore.getNotesByNotebook(notes_id);
    selectedNote.value = currentNotes.value[0];
};

const updateNotes = (notes: Note): void => {
    savedNotes.value = false;
    if (notes.content === "") {
        notes.content = "# Add your content here...";
    }

    if (notes.title === "") {
        notes.title = "New Note";
    }

    selectedNote.value.content = notes.content;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        notesStore
            .updateNoteById(
                selectedNote.value.id,
                selectedNote.value.title,
                selectedNote.value.content,
            )
            .then(() => (savedNotes.value = true));
    }, 1000);
};

const updateNotebooks = (notebook: Notebook): void => {
    currentNotebook.value.title = notebook.title;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        notebookStore.updateNotebook(notebook.id, notebook.title);
    }, 1000);
};

onBeforeMount(async (): Promise<void> => {
    const notes_id = Array.isArray(notebook_id) ? notebook_id[0] : notebook_id;
    currentNotes.value = await notesStore.getNotesByNotebook(notes_id);
    const defaultNote: Note = {
        id: 0,
        title: "New Note",
        content: "# Add your content here...",
        notebook_id: notes_id,
        created_at: "",
        updated_at: "",
    };

    selectedNote.value =
        currentNotes.value.length > 0 ? currentNotes.value[0] : defaultNote;

    // Create a default note if there are no notes
    if (currentNotes.value.length == 0) {
        notesStore.createNote(
            defaultNote.title,
            defaultNote.content,
            defaultNote.notebook_id,
        );
    }
});

onMounted((): void => {
    currentNotebook.value = notebookStore.getNotebooks.filter(
        (notebook) => notebook.id === parseInt(notes_id),
    )[0];
});
</script>
<template>
    <Layout :footer="false">
        <template v-slot:content>
            <h3
                class="text-3xl text-center font-normal mt-16 mb-12 pb-2 font-antonio text-shadow-lg cursor-pointer"
            >
                <input
                    type="text"
                    v-model="currentNotebook.title"
                    @input="updateNotebooks(currentNotebook)"
                    class="bg-transparent"
                />
                <input
                    type="text"
                    v-model="selectedNote.title"
                    @input="updateNotes(selectedNote)"
                    class="bg-transparent"
                />
            </h3>
            <h5 class="text-2xl text-center font-antonio text-shadow-lg my-8">
                Written By: {{ userStore.getFullName }}
            </h5>
            <section
                class="flex flex-col lg:flex-row w-full lg:w-10/12 xl:w-11/12 px-4"
            >
                <Sidebar
                    :currentNotebook="currentNotebook"
                    :currentNotes="currentNotes"
                    :selectedNote="selectedNote"
                    @changeSelected="changeSelectedNote"
                    @deleteCtrl="deleteModalCtrl"
                    @add="addNote"
                    :hide="hiddenToggle"
                />
                <MarkdownEditor
                    class="w-full"
                    :notes="selectedNote"
                    @update:modelValue="updateNotes"
                    @close="hideMenu"
                />
            </section>
        </template>
        <template v-slot:modal>
            <DeleteModal
                :show="show"
                @confirmed="deleteNote"
                @close="show = !show"
            >
                Are you sure you want to delete this note?
            </DeleteModal>
        </template>
    </Layout>
</template>
