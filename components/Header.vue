<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from "@headlessui/vue";
import { storeToRefs } from "pinia";

import { useModals } from "@/stores/modals";
const titleRef = ref(null);
const open = ref(false);
const profile = ref(false);
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
const { isLoggedIn } = useAuth();
const user = useSupabaseUser();
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
            <Icon name="heroicons:bars-3" class="h-6 w-6" aria-hidden="true" />
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
          <NuxtLink v-if="isLoggedIn()" class="cursor-pointer" @click="profile = true">
            {{ user.user_metadata.username }}
          </NuxtLink>
          <NuxtLink
            to="https://github.com/AnoRebel/michapio"
            target="_blank"
            class="ml-8 inline-flex transform items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-slate-900 px-4 py-2 text-base font-medium shadow transition hover:text-slate-100 active:scale-90"
          >
            <Icon name="el:github" class="h-5 w-5" />
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
                  <Icon name="heroicons:x-mark" class="h-6 w-6" aria-hidden="true" />
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
                  <Icon
                    name="heroicons:plus-circle"
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
                  <Icon
                    name="el:github"
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
                @click="profile = true"
              >
                {{ user.user_metadata.username }}
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
  <LogoutModal :open="open" @close="open = false" />
  <Profile :open="profile" @close="profile = false" />
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
