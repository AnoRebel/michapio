<template>
  <div>
    <NuxtLayout name="main">
      Main Shit
      <template #aside>Sidebar</template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
