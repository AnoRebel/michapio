<script setup lang="ts">
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  ExclamationTriangleIcon,
  XMarkIcon,
  PlusCircleIcon,
} from "@heroicons/vue/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/solid";

import { storeToRefs } from "pinia";
import { useModals } from "@/stores/modals";
const titleRef = ref(null);
const open = ref(false);
onMounted(() => {
  const typer = useTyping(titleRef.value, { loop: true, typingSpeed: 150, deletingSpeed: 100 });
  typer
    .typeString("Mipachio", 100)
    .pauseFor(150)
    .deleteChars(6, 50)
    .typeString("chapio")
    .pauseFor(500)
    .deleteChars(8)
    .typeString("Tongue of Slip", 100)
    .pauseFor(150)
    .deleteChars(14, 70)
    .typeString("Slip of Tongue")
    .pauseFor(500)
    .deleteChars(14, 70)
    .start();
});

const { setAuthState } = useModals();
const { isActiveModal } = storeToRefs(useModals());
const { isLoggedIn, logout } = useAuth();

const signOut = async () => {
  const notify = useNotify();
  try {
    await logout();
    open.value = false;
    notify(
      {
        group: "messages",
        type: "info",
        title: "Michapio",
        text: "Signed out.. 😒",
      },
      4000
    );
  } catch (error) {
    notify(
      {
        group: "errors",
        title: "Michapio",
        text: error.message,
      },
      4000
    );
  }
};
</script>

<template>
  <Popover class="relative top-0 z-30 w-full bg-transparent px-2 sm:px-4">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div
        class="flex items-center justify-between border-b-2 border-slate-100 py-4 md:justify-start md:space-x-10"
      >
        <div class="flex flex-1 justify-start lg:w-0">
          <NuxtLink class="cursor-pointer">
            <span class="sr-only">Home</span>
            <span ref="titleRef" class="typing w-auto"></span>
          </NuxtLink>
        </div>
        <div class="-my-2 -mr-2 md:hidden">
          <PopoverButton
            class="inline-flex items-center justify-center rounded-md bg-slate-50 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden space-x-10 md:flex">
          <NuxtLink
            class="cursor-pointer rounded-md px-4 py-1.5 text-base font-medium text-slate-300 hover:text-slate-100"
            :class="{ 'active bg-slate-700 shadow-sm': isActiveModal('add') }"
            @click="setAuthState(true, 'add')"
          >
            Add
          </NuxtLink>
          <NuxtLink
            v-if="isLoggedIn()"
            class="cursor-pointer rounded-md px-4 py-1.5 text-base font-medium text-slate-300 hover:text-slate-100"
            @click="open = true"
          >
            Sign Out
          </NuxtLink>
          <NuxtLink
            v-else
            class="cursor-pointer rounded-md px-4 py-1.5 text-base font-medium text-slate-300 hover:text-slate-100"
            :class="{ 'active bg-slate-700 shadow-sm': isActiveModal('auth') }"
            @click="setAuthState(true, 'login')"
          >
            Sign In
          </NuxtLink>
        </PopoverGroup>
        <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          <NuxtLink
            to="https://github.com/AnoRebel/michapio"
            target="_blank"
            class="ml-8 inline-flex transform items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-slate-900 px-4 py-2 text-base font-medium shadow transition hover:text-slate-100 active:scale-90"
          >
            <span>Github</span> <ArrowTopRightOnSquareIcon class="mx-1 h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel
        focus
        class="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
      >
        <div
          class="divide-y-2 divide-slate-100 rounded-lg bg-slate-50 shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="px-5 pt-5 pb-6">
            <div class="flex items-center justify-between">
              <div>
                <!-- <span class="w-auto">Home</span> -->
                <!-- <span ref="titleRef" class="w-auto"></span> -->
              </div>
              <div class="-mr-2">
                <PopoverButton
                  class="inline-flex items-center justify-center rounded-md bg-slate-50 p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="mt-6">
              <nav class="grid gap-y-8">
                <NuxtLink
                  class="-m-3 flex cursor-pointer items-center rounded-md p-3 hover:bg-slate-50"
                  :class="{ active: isActiveModal('add') }"
                  @click="setAuthState(true, 'add')"
                >
                  <PlusCircleIcon
                    class="h-6 w-6 flex-shrink-0 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span class="ml-3 text-base font-medium text-slate-900">Add</span>
                </NuxtLink>
                <NuxtLink
                  to="https://github.com/AnoRebel/michapio"
                  target="_blank"
                  class="-m-3 flex items-center rounded-md p-3 hover:bg-slate-50"
                >
                  <ArrowTopRightOnSquareIcon
                    class="h-6 w-6 flex-shrink-0 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span class="ml-3 text-base font-medium text-slate-900">Github</span>
                </NuxtLink>
              </nav>
            </div>
          </div>
          <div class="space-y-6 py-6 px-5">
            <div v-if="isLoggedIn()">
              <NuxtLink
                class="flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-slate-50 shadow-sm hover:bg-indigo-700"
                @click="open = true"
              >
                Sign Out
              </NuxtLink>
            </div>
            <div v-else>
              <NuxtLink
                class="flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-slate-50 shadow-sm hover:bg-indigo-700"
                @click="setAuthState(true, 'register')"
              >
                Sign Up
              </NuxtLink>
              <p class="mt-6 text-center text-base font-medium text-slate-500">
                Existing User?
                {{ " " }}
                <NuxtLink
                  class="cursor-pointer text-indigo-600 hover:text-indigo-500"
                  @click="setAuthState(true, 'login')"
                >
                  Sign In
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-slate-800/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="open = false"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900"
                    >Sign Out</DialogTitle
                  >
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to sign out? You can still view the app but you wont be
                      able to like or favourite.
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="signOut"
                >
                  Sign Out
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                  @click="open = false"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="scss">
.typing {
  @apply relative flex whitespace-pre-wrap text-2xl;
  &::after {
    content: "";
    @apply absolute right-[1rem] mr-[-1.2rem] h-full w-px border-r-2 border-slate-100;
    animation: blink 0.5s infinite ease;
  }
}
@keyframes blink {
  0% {
    @apply opacity-0;
  }
  100% {
    @apply opacity-100;
  }
}
</style>
