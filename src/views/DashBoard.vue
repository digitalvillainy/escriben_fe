<script setup lang="ts">
import StepCard from "../components/cards/StepCard.vue";
import PlusIcon from "../components/icons/PlusIcon.vue";
import CloseIcon from "../components/icons/CloseIcon.vue";
import EditIcon from "../components/icons/EditIcon.vue";
import DeleteModal from "../components/Modals/DeleteModal.vue";
import Layout from "../components/Layouts/Layout.vue";

import {useNotebooksStore, Notebook} from "../stores/notebooks";
import {useUserStore} from "../stores/user";
import {onBeforeMount, ref} from "vue";
import {RouterLink, useRouter} from "vue-router";

//Initialize stores
const notebookStore = useNotebooksStore();
const userStore = useUserStore();
const $router = useRouter();
const show = ref<boolean>(false);
const deleteTarget = ref<number>(0);
let notebooks = ref<Notebook[]>([
  {
    id: 0,
    user_id: 0,
    title: "",
    created_at: "",
    updated_at: "",
  },
]);

//Create Notebook and route to the notebook page
const createNotebook = async (
    title: string,
    user_id: number,
): Promise<void> => {
  try {
    const response = await notebookStore.createNotebook(title, user_id);
    if (!response) return;
    await $router.push({
      name: "notebooks",
      params: {notebook_id: response.id},
    });
  } catch (error) {
    console.error(error);
  }
};

//Requests Notebooks for user
const getNotebooks = async (): Promise<void> => {
  try {
    await notebookStore.getNotebooksByUserId();
  } catch (error) {
    console.error(error);
  }
};

//Delete Notebook
const deleteNotebook = async (mode: boolean): Promise<void> => {
  if (mode) {
    try {
      await notebookStore.deleteNotebook(deleteTarget.value);
      show.value = !show.value;
      notebooks.value = notebookStore.getNotebooks;
    } catch (error) {
      console.error(error);
    }
  } else {
    show.value = !show.value;
  }
};

const deleteModalCtrl = (id: number): void => {
  deleteTarget.value = id;
  show.value = !show.value;
};

//Get Notebooks and initialize notebooks store
onBeforeMount(() => {
  getNotebooks();
  notebooks.value = notebookStore.getNotebooks;
});

</script>
<template>
  <Layout :footer="false">
    <template #content>
      <h3
          class="text-5xl text-center font-normal mt-36 mb-20 pb-2 font-antonio text-shadow-lg"
      >
        Notebooks
      </h3>
      <div class="w-full flex flex-row justify-start px-12">
        <StepCard
            @click="
                        createNotebook('New Notebook', userStore.getUser.id)
                    "
            class="w-44 h-64 drop-shadow-2xl border-custom-cyan border-dashed border-4 flex flex-col cursor-pointer hover:bg-gray-600 hover:text-white hover:border-cyan-400"
        >
          <PlusIcon class="mx-auto"/>
          <span class="font-antonio text-lg text-center"
          >Create Notebook</span
          >
        </StepCard>
      </div>
      <div
          class="w-full flex flex-row flex-wrap justify-start bg-zinc-900 h-full mt-8 pt-8 px-7 overflow-y-scroll overflow-x-hidden"
      >
        <h3
            v-if="notebooks.length === 0"
            class="text-3xl font-antonio text-shadow-lg"
        >
          Please create a notebook to get started...
        </h3>
        <StepCard
            v-else
            v-for="(notebook, index) in notebooks"
            v-bind:key="index"
            class="w-44 h-64 drop-shadow-2xl border-custom-cyan border-doshed border-4 flex flex-col hover:bg-gray-600 hover:text-white m-4 hover:border-cyan-400"
        >
                    <span
                        class="text-white font-antonio text-md text-center flex-grow"
                    >{{ notebook.title }}</span
                    >
          <div
              class="flex flex-row justify-between cursor-pointer hover:bg-gray-600 hover:text-white"
          >
            <CloseIcon @click="deleteModalCtrl(notebook.id)"/>
            <router-link
                :to="{
                                name: 'notebooks',
                                params: { notebook_id: notebook.id ?  notebook.id : 0 },
                            }"
            >
              <EditIcon/>
            </router-link>
          </div>
        </StepCard>
      </div>
    </template>
    <template #modal>
      <DeleteModal @confirmed="deleteNotebook" :show="show">
        Are you sure you want to delete this notebook?
      </DeleteModal>
    </template>
  </Layout>
</template>
