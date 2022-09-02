<template>
  <form class="w-full flex flex-col space-y-6 px-3" @submit="submit">
    <label name="lname" class="relative w-full">
      <span class="sr-only">Username</span>
      <UserIcon class="h-5 w-5 text-slate-800 absolute inset-y-2.5 items-center" />
      <input
        v-model="username"
        type="text"
        name="username"
        class="bg-transparent text-slate-800 placeholder:text-sm placeholder:italic placeholder:text-slate-500 block w-full py-2 px-9 border-0 border-b-2 border-slate-800/70 focus:ring-0 focus:border-slate-300"
        :class="{
          'border-green-500/70': nameMeta.dirty && nameMeta.valid,
          'border-red-500/70': nameMeta.dirty && !nameMeta.valid,
        }"
        placeholder="Username"
        required
      />
      <ArrowPathIcon
        v-if="nameMeta.pending"
        class="h-5 w-5 text-slate-800 absolute right-0 inset-y-2.5 items-center animate-spin"
      />
      <CheckIcon
        v-if="nameMeta.dirty && nameMeta.valid"
        class="h-5 w-5 text-green-500 absolute right-0 inset-y-2.5 items-center"
      />
      <span class="text-xs my-0.5 text-red-600">{{ nameError }}</span>
    </label>
    <label name="password" class="relative w-full">
      <span class="sr-only">Password</span>
      <LockClosedIcon class="h-5 w-5 text-slate-800 absolute inset-y-2.5 items-center" />
      <input
        v-model="password"
        :type="isPass ? 'password' : 'test'"
        name="password"
        class="bg-transparent text-slate-800 placeholder:text-sm placeholder:italic placeholder:text-slate-500 block w-full py-2 px-9 border-0 border-b-2 border-slate-800/70 focus:ring-0 focus:border-slate-300"
        :class="{
          'border-green-500/70': passwordMeta.dirty && passwordMeta.valid,
          'border-red-500/70': passwordMeta.dirty && !passwordMeta.valid,
        }"
        placeholder="Password"
        required
      />
      <EyeIcon
        v-if="isPass"
        class="h-5 w-5 text-slate-800 absolute right-1 inset-y-2.5 items-center cursor-pointer animate__animated animate__fadeIn"
        @click="isPass = !isPass"
      />
      <EyeSlashIcon
        v-else
        class="h-5 w-5 text-slate-800 absolute right-1 inset-y-2.5 items-center cursor-pointer animate__animated animate__fadeIn"
        @click="isPass = !isPass"
      />
      <span class="text-xs my-0.5 text-red-600">{{ passwordError }}</span>
    </label>
    <div class="mt-5 sm:mt-6">
      <div class="w-full inline-flex justify-around items-center mb-3 text-underline">
        <button
          v-if="!isActiveForm('login')"
          class="underline animate_animated animate_slideInLeft"
          @click="toggleForm('login')"
        >
          Login
        </button>
        <button
          v-if="!isActiveForm('register')"
          class="underline animate_animated animate_slideInLeft"
          @click="toggleForm('register')"
        >
          Register
        </button>
        <button
          v-if="!isActiveForm('forgot')"
          class="underline animate_animated animate_slideInRight"
          @click="toggleForm('forgot')"
        >
          Forgot Password?
        </button>
      </div>
      <button
        type="submit"
        class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white animate__animated animate__slideInBottom transform transition active:scale-90 hover:bg-indigo-700 focus:outline-none sm:text-sm"
        :class="{ 'bg-indigo-500/70': isSubmitting }"
        :disabled="isSubmitting"
      >
        <svg
          v-if="isSubmitting"
          class="animate-spin mr-3 h-5 w-5 text-white"
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
        <span>Login</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
  CheckIcon,
} from "@heroicons/vue/24/outline";
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
    password: "",
  },
});
const {
  value: username,
  meta: nameMeta,
  errorMessage: nameError,
} = useField(
  "name",
  string()
    .required()
    .test(
      "name-not-registered",
      "Username not registered!",
      async val => await checkExists("username", val)
    )
    .label("Username")
);
const {
  value: password,
  meta: passwordMeta,
  errorMessage: passwordError,
} = useField("password", string().required().min(2).label("Password"));

const onInvalid = ({ values, errors, results }) => {
  console.log("Invalid Values: ", values); // current form values
  console.log("Invalid Errors: ", errors); // a map of field names and their first error message
  console.log("Invalid Results: ", results); // a detailed map of field names and their validation results
};
const submit = handleSubmit((values, { resetForm }) => {
  submitForm("login", values);
  resetForm({
    values: {
      name: values.name,
      password: "",
    },
  });
}, onInvalid);
</script>
