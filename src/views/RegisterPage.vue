<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import StepCard from "../components/cards/StepCard.vue";
import TextInput from "../components/inputs/TextInput.vue";
import UserIcon from "../components/icons/UserIcon.vue";
import LockIcon from "../components/icons/LockIcon.vue";
import MailIcon from "../components/icons/MailIcon.vue";
import Layout from "../components/Layouts/Layout.vue";

import { reactive, computed, ref } from "vue";
import {
    required,
    email,
    minLength,
    sameAs,
    alpha,
    alphaNum,
} from "@vuelidate/validators";
import { useUserStore } from "../stores/user";
import { useVuelidate } from "@vuelidate/core";

import { postApi } from "../axios.ts";

interface ErrorWithResponse extends Error {
    response?: {
        message: string;
    };
}

const router = useRouter();
const userStore = useUserStore();
const errorMessage = ref<string>("");

// Form State
const form = reactive({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
});

// Rules for vuelidate validation
const rules = computed(() => {
    return {
        first_name: { required, alpha },
        last_name: { required, alpha },
        email: { required, email },
        username: { required, minLength: minLength(6), alphaNum },
        password: { required, minLength: minLength(8) },
        confirmPassword: { required, sameAs: sameAs(form.password) },
    };
});

const failedLogin = ref<boolean>(false);

const v$ = useVuelidate(rules, form);

const submitForm = async () => {
    const result = await v$.value.$validate();
    if (!result) return;

    try {
        const response = await postApi("/register", form);
        if (response.status) {
            failedLogin.value = true;
            return;
        }

        if (response.token) {
            userStore.login(response.token);
            userStore.setUser(response.user);
            router.push({ name: "dashboard" });
        }
    } catch (error) {
        const e = error as ErrorWithResponse;
        if (e.response?.message) {
            errorMessage.value = e.response.message.split(".")[0];
        }
        failedLogin.value = true;
        v$.value.$touch();
        console.error(error);
    }
};
</script>

<template>
    <Layout>
        <template #content>
            <form
                class="flex flex-col justify-center place-items-center flex-grow w-11/12 mx-auto"
                @submit.prevent="submitForm"
            >
                <StepCard
                    class="flex flex-col w-full lg:w-[49rem] lg:h-[30rem] drop-shadow-2xl border-black border-2"
                >
                    <h5 class="font-antonio text-3xl text-left">Login User</h5>
                    <div
                        class="flex flex-col lg:flex-row justify-between gap-x-2"
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
                            label="Username"
                            placeholder="Username"
                            class="w-full relative"
                            v-model="form.username"
                            :errors="v$.username.$errors"
                        >
                            <UserIcon />
                        </TextInput>
                    </div>
                    <div
                        class="flex flex-col lg:flex-row justify-between gap-x-2 !mt-1.5"
                    >
                        <TextInput
                            type="password"
                            label="Password"
                            placeholder="Password"
                            class="w-full relative"
                            v-model="form.password"
                            :errors="v$.password.$errors"
                        >
                            <LockIcon class="absolute top-1 right-1.5" />
                        </TextInput>
                        <TextInput
                            type="password"
                            label="Type Password Again"
                            placeholder="Type Password Again"
                            class="w-full relative"
                            v-model="form.confirmPassword"
                            :errors="v$.confirmPassword.$errors"
                        >
                            <LockIcon class="absolute top-1 right-1.5" />
                        </TextInput>
                    </div>
                    <div
                        class="flex flew-row justify-center !mt-0"
                        v-if="failedLogin"
                    >
                        <p class="text-red-800 text-shadow">
                            {{ errorMessage }}
                        </p>
                    </div>
                    <div class="flex flex-col lg:flex-row lg:justify-between">
                        <div
                            class="flex flex-col lg:flex-row lg:justify-between lg:w-5/12 w-full"
                        >
                            <RouterLink
                                to="/forgot-password"
                                class="text-shadow hover:text-cyan-400"
                                >Forgot Credentials?</RouterLink
                            >
                            <RouterLink
                                to="/login"
                                class="text-shadow hover:text-cyan-400"
                                >Already Have An Account?</RouterLink
                            >
                        </div>
                        <button
                            type="submit"
                            class="w-full mt-6 lg:mt-0 lg:w-5/12 p-2 text-2xl shadow-2xl rounded-lg bg-custom-cyan hover:bg-cyan-500"
                        >
                            REGISTER
                        </button>
                    </div>
                </StepCard>
            </form>
        </template>
    </Layout>
</template>
