<template>
  <form class="w-full flex flex-col space-y-6 px-3" @submit="submit">
    <label name="name" class="relative w-full">
      <span class="sr-only">Username</span>
      <UserIcon class="h-5 w-5 text-slate-800 absolute inset-y-2.5 items-center" />
      <input
        v-model="name"
        type="text"
        name="name"
        class="bg-transparent text-slate-800 placeholder:text-sm placeholder:italic placeholder:text-slate-300 block w-full py-2 px-9 border-0 border-b-2 border-slate-800/70 focus:ring-0 focus:border-slate-300"
        placeholder="Username"
        required
      />
      <RefreshIcon
        v-if="nameMeta.pending"
        class="h-5 w-5 text-slate-800 absolute right-0 inset-y-2.5 items-center animate-spin"
      />
      <CheckIcon
        v-if="nameMeta.dirty && nameMeta.valid"
        class="h-5 w-5 text-green-500 absolute right-0 inset-y-2.5 items-center"
      />
      <span class="text-xs my-0.5 text-red-600">{{ errors.name }}</span>
    </label>
    <label name="email" class="relative w-full">
      <span class="sr-only">Email Address</span>
      <AtSymbolIcon class="h-5 w-5 text-slate-800 absolute inset-y-2.5 items-center" />
      <input
        v-model="email"
        type="email"
        name="email"
        class="bg-transparent text-slate-800 placeholder:text-sm placeholder:italic placeholder:text-slate-300 block w-full py-2 px-9 border-0 border-b-2 border-slate-800/70 focus:ring-0 focus:border-slate-300"
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
      <span class="text-xs my-0.5 text-red-600">{{ errors.email }}</span>
    </label>
    <label name="password" class="relative w-full">
      <span class="sr-only">Password</span>
      <LockClosedIcon class="h-5 w-5 text-slate-800 absolute inset-y-2.5 items-center" />
      <input
        v-model="password"
        :type="isPass ? 'password' : 'test'"
        name="password"
        class="bg-transparent text-slate-800 placeholder:text-sm placeholder:italic placeholder:text-slate-300 block w-full py-2 px-9 border-0 border-b-2 border-slate-800/70 focus:ring-0 focus:border-slate-300"
        :class="{
          'border-green-500/70': passwordMeta.dirty && passwordMeta.valid,
          'border-red-500/70': passwordMeta.dirty && !passwordMeta.valid,
        }"
        placeholder="Password"
        required
      />
      <EyeIcon
        v-if="isPass"
        class="h-5 w-5 text-slate-800 absolute right-[-5.5rem] inset-y-2.5 items-center cursor-pointer animate__animated animate__fadeIn animate__faster"
        @click="isPass = !isPass"
      />
      <EyeOffIcon
        v-else
        class="h-5 w-5 text-slate-800 absolute right-1 inset-y-2.5 items-center cursor-pointer animate__animated animate__fadeIn animate__faster"
        @click="isPass = !isPass"
      />
      <span class="text-xs my-0.5 text-red-600">{{ errors.password }}</span>
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
        <span>Register</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeOffIcon,
  RefreshIcon,
  CheckIcon,
} from "@heroicons/vue/outline";
import { AtSymbolIcon } from "@heroicons/vue/solid";
import { useField, useForm } from "vee-validate";
import { object, string } from "yup";
import { storeToRefs } from "pinia";
import { useForms } from "@/stores/forms";

const emit = defineEmits(["submitted"]);

const forms = useForms();
const { toggleForm, submitForm } = forms;
const { isActiveForm } = storeToRefs(forms);
const isPass = ref(true);
const schema = object({
  name: string()
    .required()
    .test(
      "name-taken",
      "Username already taken",
      async val => !(await checkExists("username", val))
    )
    .label("Username"),
  email: string()
    .email()
    .required()
    .test("email-taken", "Email already taken", async val => !(await checkExists("email", val)))
    .label("Email"),
  password: string().required().min(2).label("Password"),
});
const { value: name, meta: nameMeta } = useField("name");
const { value: email, meta: emailMeta } = useField("email");
const { value: password, meta: passwordMeta } = useField("password");

const { handleSubmit, isSubmitting, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    email: "",
    password: "",
  },
});
const onInvalid = ({ values, errors, results }) => {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
};
const submit = handleSubmit((values, { resetForm }) => {
  emit("submitted", "register");
  console.log(values);
  resetForm();
}, onInvalid);
</script>
