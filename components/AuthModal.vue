<template>
  <TransitionRoot as="template" :show="isAuthOpen">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="setAuthState(false)">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-slate-800 bg-opacity-90 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <!-- <TransitionChild -->
        <!--   as="template" -->
        <!--   enter="ease-out duration-300" -->
        <!--   enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" -->
        <!--   enter-to="opacity-100 translate-y-0 sm:scale-100" -->
        <!--   leave="ease-in duration-200" -->
        <!--   leave-from="opacity-100 translate-y-0 sm:scale-100" -->
        <!--   leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" -->
        <!-- > -->
        <TransitionChild
          as="template"
          enter="animate__animated animate_bounceIn duration-300"
          leave="animate__animated animate__bounceOut duration-200"
        >
          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          >
            <div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 font-medium text-slate-900 animate__animated animate__slideInTop"
                >
                  <span v-if="form.login">Login / Sign Up</span>
                  <span v-if="form.forgot">Forgot Passord?</span>
                  <span v-if="form.register">Register</span>
                </DialogTitle>
                <div v-if="form.login" class="mt-2 animate__animated animate__fadeIn">
                  <form>
                    <div class="my-2 flex flex-col">
                      <label for="name" class="mb-1.5 text-sm text-slate-400">
                        Username/Email:
                      </label>
                      <input
                        v-model="loginData.name"
                        type="text"
                        name="name"
                        class="rounded p-2 text-xs text-slate-800"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div class="my-2 flex flex-col">
                      <label for="password" class="mb-1.5 text-sm text-slate-400">Password:</label>
                      <input
                        v-model="loginData.password"
                        type="password"
                        name="password"
                        class="rounded p-2 text-xs text-slate-800"
                        placeholder="Password"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div v-if="form.register" class="mt-2 animate__animated animate__fadeIn">
                  <form>
                    <div class="my-2 flex flex-col">
                      <label for="name" class="mb-1.5 text-sm text-slate-400">Username:</label>
                      <input
                        v-model="registerData.name"
                        type="text"
                        name="name"
                        class="rounded p-2 text-xs text-slate-800"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div class="my-2 flex flex-col">
                      <label for="email" class="mb-1.5 text-sm text-slate-400">Email:</label>
                      <input
                        v-model="registerData.email"
                        type="email"
                        name="email"
                        class="rounded p-2 text-xs text-slate-800"
                        placeholder="Email"
                      />
                    </div>
                    <div class="my-2 flex flex-col">
                      <label for="password" class="mb-1.5 text-sm text-slate-400">Password:</label>
                      <input
                        v-model="registerData.password"
                        type="password"
                        name="password"
                        class="rounded p-2 text-xs text-slate-800"
                        placeholder="Password"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div v-if="form.forgot" class="mt-2 animate__animated animate__fadeIn">
                  <form>
                    <div class="my-2 flex flex-col">
                      <label for="name" class="mb-1.5 text-sm text-slate-400">Email:</label>
                      <input
                        v-model="loginData.email"
                        type="email"
                        name="email"
                        class="rounded p-2 text-xs text-slate-800"
                        placeholder="Email"
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <div class="w-full inline-flex justify-around items-center mb-3 text-underline">
                <button
                  v-if="!form.login"
                  class="animate_animated animate_slideInLeft"
                  @click="toggleForm('login')"
                >
                  Login
                </button>
                <button
                  v-if="!form.register"
                  class="animate_animated animate_slideInLeft"
                  @click="toggleForm('register')"
                >
                  Register
                </button>
                <button
                  v-if="!form.forgot"
                  class="animate_animated animate_slideInRight"
                  @click="toggleForm('forgot')"
                >
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white animate__animated animate__slideInBottom hover:bg-indigo-700 focus:outline-none sm:text-sm"
                @click="submit(form.active)"
              >
                <span v-if="form.login">Login</span>
                <span v-if="form.forgot">Recover</span>
                <span v-if="form.register">Register</span>
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { storeToRefs } from "pinia";

import { useModal } from "@/stores/modals";
import { useForm } from "@/stores/forms";

const modals = useModal();
const forms = useForm();
const { updateLogin, updateRegister, submitForm } = forms;
const { loginForm, registerForm } = storeToRefs(forms);
const { setAuthState } = modals;
const { isAuthOpen } = storeToRefs(modals);

const form = reactive({
  login: true,
  forgot: false,
  register: false,
  active: "login",
});
const toggleForm = (f: string) => {
  switch (f) {
    case "register":
      form.login = false;
      form.forgot = false;
      form.register = true;
      form.active = "register";
      break;
    case "login":
      form.login = true;
      form.forgot = false;
      form.register = false;
      form.active = "login";
      break;
    case "forgot":
      form.login = false;
      form.forgot = true;
      form.register = false;
      form.active = "forgot";
      break;
    default:
      form.login = true;
      form.forgot = false;
      form.register = false;
      form.active = "login";
  }
};
const loginData = reactive({
  name: computed({
    get: () => loginForm?.name ?? "",
    set: val => updateLogin({ name: val }),
  }),
  password: computed({
    get: () => loginForm?.password ?? "",
    set: val => updateLogin({ password: val }),
  }),
});
const registerData = reactive({
  name: computed({
    get: () => registerForm?.name ?? "",
    set: val => updateRegister({ name: val }),
  }),
  email: computed({
    get: () => registerForm?.email ?? "",
    set: val => updateRegister({ email: val }),
  }),
  password: computed({
    get: () => registerForm?.password ?? "",
    set: val => updateRegister({ password: val }),
  }),
});
const errors = reactive({
  form: "",
  active: false,
  error: [],
});
const submit = (f: string) => {
  switch (f) {
    case "register":
      errors.form = f;
      if (registerData.name === "") {
        errors.error.push("Name is Required");
        errors.active = true;
      }
      if (registerData.email === "") {
        errors.error.push("Email is Required");
        errors.active = true;
      }
      if (registerData.password === "") {
        errors.error.push("Password is Required");
        errors.active = true;
      }
      submitForm(f, registerData);
      setAuthState(errors.active);
      break;
    case "login":
      errors.form = f;
      if (loginData.name === "") {
        errors.error.push("Name is Required");
        errors.active = true;
      }
      if (loginData.password === "") {
        errors.error.push("Password is Required");
        errors.active = true;
      }
      submitForm(f, loginData);
      setAuthState(errors.active);
      break;
    case "forgot":
      errors.form = f;
      if (loginData.name === "") {
        errors.error.push("Email is Required");
        errors.active = true;
      }
      submitForm(f, loginData);
      setAuthState(errors.active);
      break;
    default:
      setAuthState(false);
  }
};
</script>
