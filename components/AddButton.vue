<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/solid";
import { storeToRefs } from "pinia";
import { useModal } from "@/stores/modals";

const modal = useModal();
const isOpen = ref(false);
const toggle = () => {
  // open.value = !open.value;
  console.log("Toggled");
};
</script>

<template>
  <div
    class="absolute z-10 top-[4rem] right-[5rem] animate__animated animate__fadeIn bg-slate-700 shadow-lg rounded-lg transition transform hover:scale-110 active:scale-95"
  >
    <button class="p-3 cursor-pointer" @click="toggle">
      <PlusIcon
        :class="['h-5 w-5 fill-slate-200 transition transform', isOpen ? 'rotate-45 h-6 w-6' : '']"
      />
    </button>
  </div>
</template>
