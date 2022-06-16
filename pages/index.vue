<template>
  <div>
    <NuxtLayout name="main">
      Main Shit {{ users }}
      <template #aside>Sidebar</template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
// const { pending, data: users, refresh, error } = useLazyFetch("/api/users", { pick: ['name', 'description'] });
const { pending, data: users, error } = useLazyAsyncData("users", () => $fetch("/api/users"));
const refresh = () => refreshNuxtData("users");
</script>
