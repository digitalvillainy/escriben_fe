<script setup lang="ts">
import ProfilePic from "../components/ProfilePic/ProfilePic.vue";
import TextInput from "../components/inputs/TextInput.vue";
import UserIcon from "../components/icons/UserIcon.vue";
import MailIcon from "../components/icons/MailIcon.vue";
import StepCard from "../components/cards/StepCard.vue";
import Layout from "../components/Layouts/Layout.vue";

import { reactive, computed, ref } from "vue";
import { email, minLength, alpha, alphaNum } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useUserStore } from "../stores/user";
import { postApi } from "../axios.ts";

const userStore = useUserStore();
const failedLogin = ref<boolean>(false);

type FormType = {
    [key: string]: string | number | undefined;
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
};

const form = reactive({
    id: userStore.getUser.id,
    first_name: "",
    last_name: "",
    email: "",
    username: "",
}) as FormType;

// Rules for vuelidate validation
const rules = computed(() => {
    return {
        first_name: { alpha },
        last_name: { alpha },
        email: { email },
        username: { minLength: minLength(6), alphaNum },
    };
});

const v$ = useVuelidate(rules, form);

const submitForm = async () => {
    const result = await v$.value.$validate();
    if (!result) return;

    //Filter out empty fields from form
    const payload: Partial<FormType> = {};
    for (const key in form) {
        const value = form[key as keyof FormType];
        if (value !== undefined && value !== "") {
            payload[key as keyof FormType] = value as FormType[keyof FormType];
        }
    }

    //Update User via API
    try {
        const response = await postApi("/update-user", payload);
        if (response.status) {
            failedLogin.value = true;
            return;
        }
    } catch (error) {
        failedLogin.value = true;
        v$.value.$touch();
        console.error(error);
    }
};
</script>
<template>
    <Layout>
        <template #content>
            <div class="flex flex-col place-items-center mt-20 w-full">
                <ProfilePic />
                <form
                    class="flex flex-col place-items-center mt-12 w-full"
                    @submit.prevent="submitForm"
                >
                    <StepCard
                        class="w-11/12 mx-auto lg:w-[49rem] h-auto drop-shadow-2xl border-black border-2 flex flex-col content-between space-y-12"
                    >
                        <h5 class="font-antonio text-3xl text-left">
                            Update User Profile
                        </h5>
                        <div
                            class="flex flex-col lg:flex-row justify-between gap-x-2 content-between"
                        >
                            <TextInput
                                type="text"
                                label="First Name"
                                placeholder="First Name"
                                class="w-full relative"
                                v-model="form.first_name"
                                :errors="v$.first_name.$errors"
                            >
                                <UserIcon />
                            </TextInput>
                            <TextInput
                                type="text"
                                label="Last Name"
                                placeholder="Last Name"
                                class="w-full relative"
                                v-model="form.last_name"
                                :errors="v$.last_name.$errors"
                            >
                                > >
                                <UserIcon />
                            </TextInput>
                        </div>
                        <div
                            class="flex flex-col lg:flex-row justify-between gap-x-2 !mt-1.5"
                        >
                            <TextInput
                                type="text"
                                label="Email"
                                placeholder="Email"
                                class="w-full relative"
                                v-model="form.email"
                                :errors="v$.email.$errors"
                            >
                                <MailIcon class="absolute top-1 right-1.5" />
                            </TextInput>
                            <TextInput
                                type="text"
                                label="Email"
                                placeholder="Email"
                                class="w-full relative"
                                v-model="form.email"
                                :errors="v$.email.$errors"
                            >
                                <UserIcon class="absolute top-1 right-1.5" />
                            </TextInput>
                            <TextInput
                                class="w-full p-2 text-2xl shadow-2xl rounded-lg bg-custom-cyan hover:bg-cyan-500"
                                type="text"
                                label="Username"
                                placeholder="Username"
                                v-model="form.username"
                                :errors="v$.username.$errors"
                            >
                                <UserIcon class="absolute top-1 right-1.5" />
                            </TextInput>
                        </div>
                        <div class="flex flex-row justify-end space-x-3">
                            <button
                                type="submit"
                                class="w-full p-2 text-2xl shadow-2xl rounded-lg bg-custom-cyan hover:bg-cyan-500"
                            >
                                SAVE
                            </button>
                        </div>
                    </StepCard>
                </form>
            </div>
        </template>
    </Layout>
</template>
