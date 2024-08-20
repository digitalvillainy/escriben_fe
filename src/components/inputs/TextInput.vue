<script setup lang="ts">
import { ErrorObject } from "@vuelidate/core";

defineProps<{
    type: string;
    label: string;
    placeholder: string;
    modelValue: string;
    errors: ErrorObject[];
}>();
</script>
<template>
    <div class="flex flex-col h-16">
        <label class="relative" :for="label">
            <input
                :type="type"
                :id="label"
                :placeholder="placeholder"
                :value="modelValue"
                @input="
                    $emit(
                        'update:modelValue',
                        ($event.target as HTMLInputElement).value,
                    )
                "
                class="w-full p-2 placeholder:text-custom-coal/75 text-custom-coal rounded-lg bg-zinc-300 shadow-[inset_1px_4px_8px_0_rgba(47,46,65,0.6)]"
            />
            <slot class="absolute top-0 right-0" />
        </label>
        <p
            v-for="(error, index) in errors"
            :key="index"
            class="text-red-500 text-left text-shadow"
        >
            {{ error.$message }}
        </p>
    </div>
</template>
