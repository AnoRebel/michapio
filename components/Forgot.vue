<template>
  <form @submit="submit">
    <label name="email" class="relative w-full">
      <span class="sr-only">Email Address</span>
      <AtSymbolIcon class="h-5 w-5 text-slate-800 absolute inset-y-2.5 items-center" />
      <input
        v-model="email"
        type="email"
        name="email"
        class="bg-transparent text-slate-800 placeholder:text-sm placeholder:italic placeholder:text-slate-500 block w-full py-2 px-9 border-0 border-b-2 border-slate-800/70 focus:ring-0 focus:border-slate-300"
        :class="{
          'border-green-500/70': emailMeta.dirty && emailMeta.valid,
          'border-red-500/70': emailMeta.dirty && !emailMeta.valid,
        }"
        placeholder="Email Address"
        required
      />
      <ArrowPathIcon
        v-if="emailMeta.pending"
        class="h-5 w-5 text-slate-800 absolute right-0 inset-y-2.5 items-center animate-spin"
      />
      <CheckIcon
        v-if="emailMeta.dirty && emailMeta.valid"
        class="h-5 w-5 text-green-500 absolute right-0 inset-y-2.5 items-center"
      />
      <span class="text-xs my-0.5 text-red-600">{{ emailError }}</span>
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
        <span>Recover</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ArrowPathIcon, CheckIcon } from "@heroicons/vue/24/outline";
import { AtSymbolIcon } from "@heroicons/vue/24/solid";
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
} = useField(
  "email",
  string()
    .email()
    .required()
    .test("email-not-exist", "Email doesn't exist!", async val => await checkExists("email", val))
    .label("Email")
);

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
