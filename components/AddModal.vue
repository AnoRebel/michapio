<template>
  <TransitionRoot as="template" :show="isOpen && isActiveModal('add')">
    <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" @close="setAuthState(false)">
      <div
        class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
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
            class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle"
          >
            <div>
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-slate-900">
                Add
                <div class="mb-4 h-14 rounded-t bg-slate-700 sm:h-28"></div>
              </DialogTitle>
              <form class="flex flex-col space-y-6" @submit="submit">
                <label name="username" class="relative w-full">
                  <span class="sr-only">Who said it...</span>
                  <UserIcon class="absolute inset-y-2.5 h-5 w-5 items-center text-slate-800" />
                  <input
                    v-model="username"
                    type="text"
                    name="username"
                    class="block w-full border-0 border-b-2 border-slate-800/70 bg-transparent py-2 pl-9 text-slate-800 placeholder:text-sm placeholder:italic placeholder:text-slate-500 focus:border-slate-300 focus:ring-0"
                    :class="{
                      'border-green-500/70': nameMeta.dirty && nameMeta.valid,
                      'border-red-500/70': nameMeta.dirty && !nameMeta.valid,
                    }"
                    placeholder="Who said it..."
                  />
                  <span class="my-0.5 text-xs capitalize text-red-600">{{ nameError }}</span>
                </label>
                <label name="chapio" class="relative w-full">
                  <span class="sr-only">Said:</span>
                  <HashtagIcon class="absolute inset-y-2.5 h-5 w-5 items-center text-slate-800" />
                  <input
                    v-model="chapio"
                    type="text"
                    name="chapio"
                    class="block w-full border-0 border-b-2 border-slate-800/70 bg-transparent py-2 pl-9 text-slate-800 placeholder:text-sm placeholder:italic placeholder:text-slate-500 focus:border-slate-300 focus:ring-0"
                    :class="{
                      'border-green-500/70': chapioMeta.dirty && chapioMeta.valid,
                      'border-red-500/70': chapioMeta.dirty && !chapioMeta.valid,
                    }"
                    placeholder="What was said..."
                    required
                  />
                  <span class="my-0.5 text-xs capitalize text-red-600">{{ chapioError }}</span>
                </label>
                <label name="original" class="relative w-full">
                  <span class="sr-only">Instead Of:</span>
                  <ChatBubbleBottomCenterTextIcon
                    class="absolute inset-y-2.5 h-5 w-5 items-center text-slate-800"
                  />
                  <input
                    v-model="original"
                    type="text"
                    name="original"
                    class="block w-full border-0 border-b-2 border-slate-800/70 bg-transparent py-2 pl-9 text-slate-800 placeholder:text-sm placeholder:italic placeholder:text-slate-500 focus:border-slate-300 focus:ring-0"
                    :class="{
                      'border-green-500/70': origMeta.dirty && origMeta.valid,
                      'border-red-500/70': origMeta.dirty && !origMeta.valid,
                    }"
                    placeholder="What was to be said..."
                    required
                  />
                  <span class="my-0.5 text-xs capitalize text-red-600">
                    {{ origError }}
                  </span>
                </label>
                <label name="description" class="relative w-full">
                  <span class="sr-only">Due To:</span>
                  <textarea
                    v-model="description"
                    name="description"
                    cols="3"
                    rows="3"
                    class="block w-full border-0 border-b-2 border-slate-800/70 bg-transparent p-2 text-slate-800 placeholder:text-sm placeholder:italic placeholder:text-slate-500 focus:border-slate-300 focus:ring-0"
                    :class="{
                      'border-green-500/70': descMeta.dirty && descMeta.valid,
                      'border-red-500/70': descMeta.dirty && !descMeta.valid,
                    }"
                    placeholder="What lead to this one..."
                  ></textarea>
                  <span class="my-0.5 text-xs capitalize text-red-600">{{ descError }}</span>
                </label>
                <div class="my-2">
                  <button
                    type="submit"
                    class="float-right inline-flex items-center rounded bg-indigo-800 py-2 px-5 text-slate-100 shadow hover:bg-indigo-700 active:scale-90"
                    :disabled="isSubmitting"
                  >
                    <svg
                      v-if="isSubmitting"
                      class="-ml-1 mr-3 h-4 w-4 animate-spin text-white"
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
import { UserIcon, HashtagIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/vue/24/outline";
import { useField, useForm } from "vee-validate";
import { string } from "yup";
import { storeToRefs } from "pinia";

import { useForms } from "@/stores/forms";
import { useModals } from "@/stores/modals";

const forms = useForms();
const modals = useModals();
const { submitForm } = forms;
const { setAuthState } = modals;
const { isActiveModal, isOpen } = storeToRefs(modals);

const { handleSubmit, isSubmitting } = useForm({
  initialValues: {
    username: "Anonymous",
    chapio: "",
    original: "",
    description: "",
  },
});
const { value: username, meta: nameMeta, errorMessage: nameError } = useField("username", string());
const {
  value: chapio,
  meta: chapioMeta,
  errorMessage: chapioError,
} = useField("chapio", string().required());
const {
  value: original,
  meta: origMeta,
  errorMessage: origError,
} = useField("original", string().required());
const {
  value: description,
  meta: descMeta,
  errorMessage: descError,
} = useField("description", string());

const onInvalid = ({ values, errors, results }) => {
  console.log("Invalid Values: ", values); // current form values
  console.log("Invalid Errors: ", errors); // a map of field names and their first error message
  console.log("Invalid Results: ", results); // a detailed map of field names and their validation results
};
const submit = handleSubmit((values, { resetForm }) => {
  submitForm("add", values);
  resetForm();
}, onInvalid);
</script>
