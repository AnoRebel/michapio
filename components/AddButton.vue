<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/solid";
import { storeToRefs } from "#pinia";
import { useModal } from "@/stores/user";

const modal = useModal();
const { toggle } = modal;
const { isOpen } = storeToRefs(modal);
const open = ref(false);

const toggle = () => {
  open.value = !open.value;
  console.log("Toggled");
};
</script>

<template>
  <div
    class="absolute z-10 top-[6rem] right-[5rem] animate__animated animate__fadeIn bg-slate-800 shadow-lg rounded-lg transition transform hover:scale-110 active:scale-95"
  >
    <button class="p-3 cursor-pointer" @click="toggle">
      <PlusIcon
        :class="['h-5 w-5 fill-slate-200 transition transform', open ? 'rotate-45 h-6 w-6' : '']"
      />
    </button>
  </div>
</template>
