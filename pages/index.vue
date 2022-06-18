<template>
  <div>
    <NuxtLayout name="main">
      Main Shit
      <button @click="setState('auth', true)">Open Auth Modal</button>
      <template #aside>Sidebar {{ isOpen("auth") }} </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useModal } from "@/stores/modals";

definePageMeta({
  layout: false,
});

const modals = useModal();
const { toggle, setState } = modals;
const { isOpen } = storeToRefs(modals);

// const { pending, data: users, refresh, error } = useLazyFetch("/api/users", { pick: ['name', 'description'] });
// const { pending, data: users, error } = useLazyAsyncData("users", () => $fetch("/api/users"));
// const refresh = () => refreshNuxtData("users");
</script>
