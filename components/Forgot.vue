<template>
  <form @submit="submit">
    <label name="email" class="relative w-full">
      <span class="sr-only">Email Address</span>
      <AtSymbolIcon class="h-5 w-5 text-slate-800 absolute inset-y-2.5 items-center" />
      <input
        v-model="email"
        type="email"
        name="email"
        class="bg-transparent text-slate-200 placeholder:text-sm placeholder:italic placeholder:text-slate-300 block w-full py-2 px-9 border-0 border-b-2 border-slate-800/70 focus:ring-0 focus:border-slate-300"
        placeholder="Email Address"
        required
      />
      <RefreshIcon
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
        class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white animate__animated animate__slideInBottom hover:bg-indigo-700 focus:outline-none sm:text-sm"
      >
        <span>Recover</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { RefreshIcon, CheckIcon } from "@heroicons/vue/outline";
import { AtSymbolIcon } from "@heroicons/vue/solid";
import { useField, useForm } from "vee-validate";
import { object, string } from "yup";
import { storeToRefs } from "pinia";
import { useForms } from "@/stores/forms";

const emit = defineEmits(["submitted"]);

const forms = useForms();
const { toggleForm, submitForm } = forms;
const { isActiveForm } = storeToRefs(forms);
const schema = object({
  email: string()
    .email()
    .required()
    .test("email-not-exist", "Email doesn't exist!", async val => await checkExists("email", val))
    .label("Email"),
});
const { errorMessage: emailError, value: email, meta: emailMeta } = useField("email");

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
  },
});
const onInvalid = ({ values, errors, results }) => {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
};
const submit = handleSubmit((values, { resetForm }) => {
  emit("submitted", "forgot");
  console.log(values);
  resetForm();
}, onInvalid);
</script>
