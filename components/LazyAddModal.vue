<template>
  <Teleport to="#app">
    <div v-if="open">
      <form class="flex flex-col" @submit.prevent="addMchapio">
        <div class="h-14 rounded-t bg-gray-700 sm:h-28"></div>
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
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);
const addMchapio = () => {
  console.log("Added Mchapio");
};
</script>
