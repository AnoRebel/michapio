<template>
  <Popover class="relative top-0 z-30 w-full px-2 bg-transparent sm:px-4 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div
        class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <span class="sr-only">Home</span>
            <!-- <img -->
            <!--   class="h-8 w-auto sm:h-10" -->
            <!--   src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" -->
            <!--   alt="" -->
            <!-- /> -->
            <span class="w-auto">Home</span>
          </a>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <PopoverButton
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open menu</span>
            <MenuIcon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden md:flex space-x-10">
          <a
            href="#"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
            @click="setAuthState(true)"
          >
            Add
          </a>
          <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900" @click="">
            Sign In
          </a>
        </PopoverGroup>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <router-link
            to="https://github.com/AnoRebel/michapio"
            target="_blank"
            class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <span>Github</span> <ExternalLinkIcon class="h-5 w-5 mx-1" />
          </router-link>
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
          class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
        >
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div>
              <div class="-mr-2">
                <PopoverButton
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="mt-6">
              <nav class="grid gap-y-8">
                <a href="#" class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                  <PlusCircleIcon
                    class="flex-shrink-0 h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span class="ml-3 text-base font-medium text-gray-900">Add</span>
                </a>
                <router-link
                  to="https://github.com/AnoRebel/michapio"
                  target="_blank"
                  class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                >
                  <ExternalLinkIcon
                    class="flex-shrink-0 h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span class="ml-3 text-base font-medium text-gray-900">Github</span>
                </router-link>
              </nav>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6">
            <div>
              <a
                href="#"
                class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign Up
              </a>
              <p class="mt-6 text-center text-base font-medium text-gray-500">
                Existing User?
                {{ " " }}
                <a href="#" class="text-indigo-600 hover:text-indigo-500"> Sign In </a>
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

import { useModals } from "@/stores/modals";

const modals = useModals();
const { setAuthState } = modals;
</script>
