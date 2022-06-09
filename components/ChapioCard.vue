<template>
  <!-- TODO: Filter NSFW content -->
  <div class="my-3 flex h-[4rem] min-h-[5rem] w-96 flex-row rounded-md bg-purple-900">
    <div class="group h-full w-1/5 pr-1 transition duration-300 ease-in-out hover:p-0.5">
      <div class="h-full w-full rounded-l-md bg-black/70 group-hover:rounded-full"></div>
    </div>
    <div
      class="flex h-full w-3/5 flex-grow flex-col text-sm hover:cursor-pointer"
      @click="showModal"
    >
      <div>Chapio</div>
      <div>Original</div>
    </div>
    <div class="group h-full w-1/5 transition duration-300 ease-in-out hover:scale-100">
      <button
        class="h-1/2 w-full rounded-tr-md bg-gradient-to-r from-transparent via-red-500 to-red-600 hover:bg-red-600 active:scale-90 group-hover:shadow-sm"
      >
        X
      </button>
      <button
        class="h-1/2 w-full rounded-br-md bg-gradient-to-r from-transparent via-green-600 to-green-600 hover:bg-green-600 active:scale-90 group-hover:shadow-sm"
      >
        T
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const showModal = () => {};
</script>
