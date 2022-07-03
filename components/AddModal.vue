<template>
  <TransitionRoot as="template" :show="isAddOpen">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="setAddState(false)">
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
              <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                Register
                <div class="h-14 rounded-t bg-gray-700 sm:h-28"></div>
              </DialogTitle>
              <form class="flex flex-col" @submit.prevent="addMchapio">
                <div class="my-2 flex flex-col">
                  <label for="name" class="mb-1.5 text-sm text-gray-400">Who:</label>
                  <input
                    type="text"
                    name="name"
                    class="rounded p-2 text-xs text-gray-800"
                    value="Anonymous"
                    placeholder="Who said it..."
                  />
                </div>
                <div class="my-2 flex flex-col">
                  <label for="chapio" class="mb-1.5 text-sm text-gray-400">Said:</label>
                  <input
                    type="text"
                    name="chapio"
                    class="rounded p-2 text-xs text-gray-800"
                    placeholder="What was said..."
                  />
                </div>
                <div class="my-2 flex flex-col">
                  <label for="original" class="mb-1.5 text-sm text-gray-400">Instead Of:</label>
                  <input
                    type="text"
                    name="original"
                    class="rounded p-2 text-xs text-gray-800"
                    placeholder="What was to be said..."
                  />
                </div>
                <div class="my-2 flex flex-col">
                  <label for="description" class="mb-1.5 text-sm text-gray-400">Due to:</label>
                  <textarea
                    name="description"
                    cols="3"
                    rows="3"
                    class="rounded p-2 text-xs text-gray-800"
                    placeholder="What lead to this one..."
                  ></textarea>
                </div>
                <div class="my-2">
                  <button
                    type="submit"
                    class="inline-flex items-center float-right rounded bg-indigo-800 py-1 px-3 shadow active:scale-90"
                    @click="setAddState(false)"
                  >
                    <svg
                      class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                    Share
                  </button>
                </div>
              </form>
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

const modals = useModal();
const { setAddState } = modals;
const { isAddOpen } = storeToRefs(modals);
const addMchapio = () => {
  console.log("Added Mchapio");
};
</script>
