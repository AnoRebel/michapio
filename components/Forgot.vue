<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { string } from "yup";
import { storeToRefs } from "pinia";
import { useForms } from "@/stores/forms";

const forms = useForms();
const { toggleForm, submitForm } = forms;
const { isActiveForm } = storeToRefs(forms);

const { handleSubmit, isSubmitting } = useForm({
  initialValues: {
    email: "",
  },
});
const {
  errorMessage: emailError,
  value: email,
  meta: emailMeta,
} = useField("email", string().email().required().label("Email"));

const onInvalid = ({ values, errors, results }) => {
  console.log("Invalid Values: ", values); // current form values
  console.log("Invalid Errors: ", errors); // a map of field names and their first error message
  console.log("Invalid Results: ", results); // a detailed map of field names and their validation results
};
const submit = handleSubmit((values, { resetForm }) => {
  submitForm("forgot", values);
  resetForm();
}, onInvalid);
</script>

<template>
  <form @submit="submit">
    <label name="email" class="relative w-full">
      <span class="sr-only">Email Address</span>
      <Icon
        name="heroicons:at-symbol-solid"
        class="absolute inset-y-2.5 left-0 h-5 w-5 items-center text-slate-800"
      />
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
      <Icon
        v-if="emailMeta.pending"
        name="heroicons:arrow-path"
        class="absolute inset-y-2.5 right-0 h-5 w-5 animate-spin items-center text-slate-800"
      />
      <Icon
        v-if="emailMeta.dirty && emailMeta.valid"
        name="heroicons:check"
        class="absolute inset-y-2.5 right-0 h-5 w-5 items-center text-green-500"
      />
      <span class="my-0.5 text-xs text-red-600">{{ emailError }}</span>
    </label>
    <div class="mt-5 sm:mt-6">
      <div class="text-underline mb-3 inline-flex w-full items-center justify-around">
        <button
          v-if="!isActiveForm('login')"
          type="button"
          class="animate_animated animate_slideInLeft underline"
          @click="toggleForm('login')"
        >
          Login
        </button>
        <button
          v-if="!isActiveForm('register')"
          type="button"
          class="animate_animated animate_slideInLeft underline"
          @click="toggleForm('register')"
        >
          Register
        </button>
        <button
          v-if="!isActiveForm('forgot')"
          type="button"
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
        <span>Recover</span>
      </button>
    </div>
  </form>
</template>
