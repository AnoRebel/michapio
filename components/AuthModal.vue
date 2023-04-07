<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { storeToRefs } from "pinia";

import { useForms } from "@/stores/forms";
import { useModals } from "@/stores/modals";

const modals = useModals();
const { setAuthState } = modals;
const { isActiveModal, isOpen } = storeToRefs(modals);
const { isActiveForm } = storeToRefs(useForms());
</script>

<template>
  <TransitionRoot as="template" :show="isOpen && isActiveModal('auth')">
    <Dialog as="div" class="fixed inset-0 z-[70] overflow-y-auto" @close="setAuthState(false)">
      <div
        class="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0"
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
        <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
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
            class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle"
          >
            <div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="div"
                  class="animate__animated animate__slideInTop my-3 text-2xl font-medium leading-6 text-slate-900"
                >
                  <span v-if="isActiveForm('login')">Login / Sign Up</span>
                  <span v-if="isActiveForm('forgot')">Forgot Passord?</span>
                  <span v-if="isActiveForm('register')">Register</span>
                </DialogTitle>
                <div
                  v-if="isActiveForm('login')"
                  class="animate__animated animate__fadeIn animate__faster my-5"
                >
                  <Login />
                </div>
                <div
                  v-if="isActiveForm('register')"
                  class="animate__animated animate__fadeIn animate__faster mt-2"
                >
                  <Register />
                </div>
                <div
                  v-if="isActiveForm('forgot')"
                  class="animate__animated animate__fadeIn animate__faster mt-2"
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
