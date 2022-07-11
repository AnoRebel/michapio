<template>
  <header class="sticky top-0 z-30 w-full px-2 py-4 bg-transparent sm:px-4 shadow-lg">
    <div class="flex items-center justify-between mx-auto max-w-7xl">
      <a href="#">
        <span class="text-2xl font-extrabold text-blue-600">Logo</span>
      </a>
      <div class="flex items-center space-x-1">
        <ul class="hidden space-x-2 md:inline-flex">
          <li>
            <button class="font-semibold text-gray-600 rounded mx-2" @click="setAddState(true)">
              Add
            </button>
          </li>
          <li>
            <button class="font-semibold text-gray-600 rounded" @click="setAuthState(true)">
              Login
            </button>
          </li>
          <li>
            <a
              href="https://github.com/AnoRebel/michapio"
              target="_blank"
              class="inline-flex items-center px-2 font-semibold text-gray-600 rounded"
            >
              Github <ExternalLinkIcon class="h-4 w-4 mx-1" />
            </a>
          </li>
        </ul>
        <div class="inline-flex md:hidden">
          <button class="flex-none px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 8h16M4 16h16"
              />
            </svg>
            <span class="sr-only">Open Menu</span>
          </button>
          <!-- put list item -->
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ExternalLinkIcon } from "@heroicons/vue/solid";

import { useModals } from "@/stores/modals";

const modals = useModals();
const { setAddState, setAuthState } = modals;
</script>
