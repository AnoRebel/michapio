<script setup lang="ts">
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
  CheckIcon,
} from "@heroicons/vue/24/outline";
import { AtSymbolIcon } from "@heroicons/vue/24/solid";
import { useField, useForm } from "vee-validate";
import { string } from "yup";
import { storeToRefs } from "pinia";
import { useForms } from "@/stores/forms";

const forms = useForms();
const { toggleForm, submitForm } = forms;
const { isActiveForm } = storeToRefs(forms);
const isPass = ref(true);
const { handleSubmit, isSubmitting } = useForm({
  initialValues: {
    name: "",
    email: "",
    password: "",
  },
});
const {
  value: name,
  meta: nameMeta,
  errorMessage: nameError,
} = useField("name", string().min(3).required().label("Username"));
const {
  value: email,
  meta: emailMeta,
  errorMessage: emailError,
} = useField("email", string().email().required().label("Email"));
const {
  value: password,
  meta: passwordMeta,
  errorMessage: passwordError,
} = useField("password", string().required().min(3).label("Password"));

const onInvalid = ({ values, errors, results }) => {
  console.log("Invalid Values: ", values); // current form values
  console.log("Invalid Errors: ", errors); // a map of field names and their first error message
  console.log("Invalid Results: ", results); // a detailed map of field names and their validation results
};
const submit = handleSubmit((values, { resetForm }) => {
  submitForm("register", values);
  resetForm();
}, onInvalid);
</script>

<template>
  <form class="flex w-full flex-col space-y-6 px-3" @submit="submit">
    <label name="name" class="relative w-full">
      <span class="sr-only">Username</span>
      <UserIcon class="absolute inset-y-2.5 h-5 w-5 items-center text-slate-800" />
      <input
        v-model="name"
        type="text"
        name="name"
        class="block w-full border-0 border-b-2 border-slate-800/70 bg-transparent py-2 px-9 text-slate-800 placeholder:text-sm placeholder:italic placeholder:text-slate-500 focus:border-slate-300 focus:ring-0"
        :class="{
          'border-green-500/70': nameMeta.dirty && nameMeta.valid,
          'border-red-500/70': nameMeta.dirty && !nameMeta.valid,
        }"
        placeholder="Username"
        required
      />
      <ArrowPathIcon
        v-if="nameMeta.pending"
        class="absolute inset-y-2.5 right-0 h-5 w-5 animate-spin items-center text-slate-800"
      />
      <CheckIcon
        v-if="nameMeta.dirty && nameMeta.valid"
        class="absolute inset-y-2.5 right-0 h-5 w-5 items-center text-green-500"
      />
      <span class="my-0.5 text-xs text-red-600">{{ nameError }}</span>
    </label>
    <label name="email" class="relative w-full">
      <span class="sr-only">Email Address</span>
      <AtSymbolIcon class="absolute inset-y-2.5 h-5 w-5 items-center text-slate-800" />
      <input
        v-model="email"
        type="email"
        name="email"
        class="block w-full border-0 border-b-2 border-slate-800/70 bg-transparent py-2 px-9 text-slate-800 placeholder:text-sm placeholder:italic placeholder:text-slate-500 focus:border-slate-300 focus:ring-0"
        :class="{
          'border-green-500/70': emailMeta.dirty && emailMeta.valid,
          'border-red-500/70': emailMeta.dirty && !emailMeta.valid,
        }"
        placeholder="Email Address"
        required
      />
      <ArrowPathIcon
        v-if="emailMeta.pending"
        class="absolute inset-y-2.5 right-0 h-5 w-5 animate-spin items-center text-slate-800"
      />
      <CheckIcon
        v-if="emailMeta.dirty && emailMeta.valid"
        class="absolute inset-y-2.5 right-0 h-5 w-5 items-center text-green-500"
      />
      <span class="my-0.5 text-xs text-red-600">{{ emailError }}</span>
    </label>
    <label name="password" class="relative w-full">
      <span class="sr-only">Password</span>
      <LockClosedIcon class="absolute inset-y-2.5 h-5 w-5 items-center text-slate-800" />
      <input
        v-model="password"
        :type="isPass ? 'password' : 'text'"
        name="password"
        class="block w-full border-0 border-b-2 border-slate-800/70 bg-transparent py-2 px-9 text-slate-800 placeholder:text-sm placeholder:italic placeholder:text-slate-500 focus:border-slate-300 focus:ring-0"
        :class="{
          'border-green-500/70': passwordMeta.dirty && passwordMeta.valid,
          'border-red-500/70': passwordMeta.dirty && !passwordMeta.valid,
        }"
        placeholder="Password"
        required
      />
      <EyeIcon
        v-if="isPass"
        class="animate__animated animate__fadeIn absolute inset-y-2.5 right-1 h-5 w-5 cursor-pointer items-center text-slate-800"
        @click="isPass = !isPass"
      />
      <EyeSlashIcon
        v-else
        class="animate__animated animate__fadeIn absolute inset-y-2.5 right-1 h-5 w-5 cursor-pointer items-center text-slate-800"
        @click="isPass = !isPass"
      />
      <span class="my-0.5 text-xs text-red-600">{{ passwordError }}</span>
    </label>
    <div class="mt-5 sm:mt-6">
      <div class="text-underline mb-3 inline-flex w-full items-center justify-around">
        <button
          v-if="!isActiveForm('login')"
          class="animate_animated animate_slideInLeft underline"
          @click="toggleForm('login')"
        >
          Login
        </button>
        <button
          v-if="!isActiveForm('register')"
          class="animate_animated animate_slideInLeft underline"
          @click="toggleForm('register')"
        >
          Register
        </button>
        <button
          v-if="!isActiveForm('forgot')"
          class="animate_animated animate_slideInRight underline"
          @click="toggleForm('forgot')"
        >
          Forgot Password?
        </button>
      </div>
      <button
        type="submit"
        class="animate__animated animate__slideInBottom inline-flex w-full transform justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none active:scale-90 sm:text-sm"
        :class="{ 'bg-indigo-500/70': isSubmitting }"
        :disabled="isSubmitting"
      >
        <svg
          v-if="isSubmitting"
          class="mr-3 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>Register</span>
      </button>
    </div>
  </form>
</template>
