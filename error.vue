<template>
  <div
    class="relative min-h-screen min-w-screen flex justify-center items-center bg-slate-900 font-sans"
  >
    <div class="animate__animated animate__zoomIn container mx-auto py-10 px-4">
      <h1>{{ error.message }}</h1>
      There was an error 😱

      <br />
      <button @click="handleError">Clear error and Navigate home</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: Object;
}>();

const handleError = () => clearError({ redirect: "/" });
</script>
