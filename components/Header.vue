<template>
  <Popover class="relative top-0 z-30 w-full px-2 bg-transparent sm:px-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div
        class="flex justify-between items-center border-b-2 border-slate-100 py-4 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 flex-1">
          <NuxtLink class="cursor-pointer">
            <span class="sr-only">Home</span>
            <span ref="titleRef" class="w-auto typing"></span>
          </NuxtLink>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <PopoverButton
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open menu</span>
            <MenuIcon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden md:flex space-x-10">
          <NuxtLink
            class="text-base font-medium text-slate-300 cursor-pointer rounded-md hover:text-slate-100"
            :class="{ 'active bg-slate-700 px-4 py-1.5 shadow-sm': isActiveModal('add') }"
            @click="setAuthState(true, 'add')"
          >
            Add
          </NuxtLink>
          <NuxtLink
            class="text-base font-medium text-slate-300 cursor-pointer rounded-md hover:text-slate-100"
            :class="{ 'active bg-slate-700 px-4 py-1.5 shadow-sm': isActiveModal('auth') }"
            @click="setAuthState(true, 'login')"
          >
            Sign In
          </NuxtLink>
        </PopoverGroup>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <NuxtLink
            to="https://github.com/AnoRebel/michapio"
            target="_blank"
            class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 transition transform active:scale-90 hover:bg-indigo-700"
          >
            <span>Github</span> <ExternalLinkIcon class="h-5 w-5 mx-1" />
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
        class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <div
          class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-slate-50"
        >
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <!-- <span class="w-auto">Home</span> -->
                <!-- <span ref="titleRef" class="w-auto"></span> -->
              </div>
              <div class="-mr-2">
                <PopoverButton
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="mt-6">
              <nav class="grid gap-y-8">
                <NuxtLink
                  class="-m-3 p-3 flex items-center rounded-md cursor-pointer hover:bg-slate-50"
                  :class="{ active: isActiveModal('add') }"
                  @click="setAuthState(true, 'add')"
                >
                  <PlusCircleIcon
                    class="flex-shrink-0 h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span class="ml-3 text-base font-medium text-slate-900">Add</span>
                </NuxtLink>
                <NuxtLink
                  to="https://github.com/AnoRebel/michapio"
                  target="_blank"
                  class="-m-3 p-3 flex items-center rounded-md hover:bg-slate-50"
                >
                  <ExternalLinkIcon
                    class="flex-shrink-0 h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span class="ml-3 text-base font-medium text-slate-900">Github</span>
                </NuxtLink>
              </nav>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6">
            <div>
              <NuxtLink
                class="w-full flex items-center justify-center cursor-pointer px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                @click="setAuthState(true, 'register')"
              >
                Sign Up
              </NuxtLink>
              <p class="mt-6 text-center text-base font-medium text-slate-500">
                Existing User?
                {{ " " }}
                <NuxtLink
                  class="text-indigo-600 cursor-pointer hover:text-indigo-500"
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
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from "@headlessui/vue";
import { MenuIcon, XIcon, PlusCircleIcon } from "@heroicons/vue/outline";
import { ExternalLinkIcon } from "@heroicons/vue/solid";

import { storeToRefs } from "pinia";
import { useModals } from "@/stores/modals";
const titleRef = ref(null);
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
</script>

<style lang="scss">
.typing {
  @apply relative flex whitespace-pre-wrap text-2xl;
  &::after {
    content: "";
    @apply absolute right-[1rem] w-px mr-[-1.2rem] h-full border-r-2 border-slate-100;
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
