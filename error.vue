<template>
  <div
    class="min-w-screen relative flex min-h-screen items-center justify-center bg-slate-900 font-sans"
  >
    <div class="animate__animated animate__zoomIn container mx-auto px-4 py-10">
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
