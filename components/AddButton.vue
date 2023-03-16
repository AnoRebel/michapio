<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { useModals } from "@/stores/modals";

const modal = useModals();
const isOpen = ref(false);
const toggle = () => {
  // open.value = !open.value;
  console.log("Toggled");
};
</script>

<template>
  <div
    class="animate__animated animate__fadeIn absolute top-[4rem] right-[5rem] z-10 transform rounded-lg bg-slate-700 shadow-lg transition hover:scale-110 active:scale-95"
  >
    <button class="cursor-pointer p-3" @click="toggle">
      <PlusIcon
        :class="['h-5 w-5 transform fill-slate-200 transition', isOpen ? 'h-6 w-6 rotate-45' : '']"
      />
    </button>
  </div>
</template>
