<template>
  <Teleport to="#app">
    <div v-if="open">Auth Modal</div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);
</script>
