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
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                  Login / Sign Up
                </DialogTitle>
                <div class="mt-2">
                  <form>
                    <div class="my-2 flex flex-col">
                      <label for="name" class="mb-1.5 text-sm text-slate-400"
                        >Username/Email:</label
                      >
                      <input
                        v-model="data.name"
                        type="text"
                        name="name"
                        class="rounded p-2 text-xs text-gray-800"
                        placeholder="Username"
                      />
                    </div>
                    <div class="my-2 flex flex-col">
                      <label for="password" class="mb-1.5 text-sm text-slate-400">Password:</label>
                      <input
                        v-model="data.password"
                        type="password"
                        name="password"
                        class="rounded p-2 text-xs text-gray-800"
                        placeholder="Password"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                @click="setAuthState(false)"
              >
                Go back to dashboard
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
const { updateLogin, updateRegister } = forms;
const { loginForm, registerForm } = storeToRefs(forms);
const { setAuthState } = modals;
const { isAuthOpen } = storeToRefs(modals);

const data = reactive({
  name: computed({
    get: () => loginForm?.name ?? "",
    set: val => updateLogin({ name: val }),
  }),
  password: computed({
    get: () => loginForm?.password ?? "",
    set: val => updateLogin({ password: val }),
  }),
});
</script>
