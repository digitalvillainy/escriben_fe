<script setup lang="ts">
import CloseIcon from "../icons/CloseIcon.vue";

const props = defineProps({
    show: Boolean,
});

const emit = defineEmits(["toggleModal"]);

// Open and close dialog and emit event and confirmed value
const openDialog = (): void => {
    emit("toggleModal");
};
</script>
<template>
    <div
        v-if="props.show"
        class="w-full h-full bg-black/30 backdrop-blur-sm flex flex-col justify-center m-0 fixed inset-0 z-20 text-slate-800"
    >
        <div
            class="bg-zinc-300 rounded-xl space-y-8 w-8/12 h-[36rem] place-self-center absolute z-30 text-slate-800 overflow-y-auto"
        >
            <div
                class="flex flex-row justify-between w-full bg-zinc-900 px-8 py-4 text-white sticky top-0 z-30"
            >
                <span class="text-3xl font-antonio">
                    <slot name="title"></slot>
                </span>
                <CloseIcon
                    class="w-10 h-10 cursor-pointer"
                    @click="openDialog"
                />
            </div>
            <div class="px-8">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
