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
                  as="div"
                  class="text-2xl leading-6 font-medium text-slate-900 my-3 animate__animated animate__slideInTop"
                >
                  <span v-if="isActiveForm('login')">Login / Sign Up</span>
                  <span v-if="isActiveForm('forgot')">Forgot Passord?</span>
                  <span v-if="isActiveForm('register')">Register</span>
                </DialogTitle>
                <div
                  v-if="isActiveForm('login')"
                  class="my-5 animate__animated animate__fadeIn animate__faster"
                >
                  <Login />
                </div>
                <div
                  v-if="isActiveForm('register')"
                  class="mt-2 animate__animated animate__fadeIn animate__faster"
                >
                  <Register />
                </div>
                <div
                  v-if="isActiveForm('forgot')"
                  class="mt-2 animate__animated animate__fadeIn animate__faster"
                >
                  <Forgot />
                </div>
              </div>
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

import { useModals } from "@/stores/modals";
import { useForms } from "@/stores/forms";

const modals = useModals();
const { setAuthState } = modals;
const { isAuthOpen } = storeToRefs(modals);
const { isActiveForm } = storeToRefs(useForms());
</script>
