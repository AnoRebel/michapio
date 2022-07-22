<template>
  <div>
    <NuxtLayout name="main">
      <div class="grid gaps-4 grid-cols-1 sm:grid-cols-2">
        <ChapioCard :data="{}" />
        <ChapioCard :data="{}" />
      </div>
      <template #aside>
        <SideBar />
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

// const { pending, data: users, refresh, error } = useLazyFetch("/api/users", { pick: ['name', 'description'] });
const { pending, data: users, error } = useLazyAsyncData("users", () => $fetch("/api/users"));
// const refresh = () => refreshNuxtData("users");
</script>
