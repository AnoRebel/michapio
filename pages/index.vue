<template>
  <div>
    <NuxtLayout name="main">
      Main Shit
      <button @click="setAuthState(true)">Open Auth Modal</button>
      <template #aside>Sidebar</template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useModal } from "@/stores/modals";

definePageMeta({
  layout: false,
});

const modals = useModal();
const { setAuthState } = modals;

// const { pending, data: users, refresh, error } = useLazyFetch("/api/users", { pick: ['name', 'description'] });
// const { pending, data: users, error } = useLazyAsyncData("users", () => $fetch("/api/users"));
// const refresh = () => refreshNuxtData("users");
</script>
