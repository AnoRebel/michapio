<template>
  <div class="relative font-sans" n="green6">
    <div class="container mx-auto py-10 px-4">
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
