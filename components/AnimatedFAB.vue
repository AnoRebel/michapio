<script setup lang="ts">
const open = ref(false);
</script>

<template>
  <div>
    <div class="fab">
      <div class="fab-content"><span>0</span></div>
      <div class="fab-item">
        <div class="item"><span>1</span></div>
        <div class="item"><span>2</span></div>
        <div class="item"><span>3</span></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.fab {
  @apply relative;
  &-content {
    @apply flex items-center justify-center w-10 h-10 text-xl rounded-full bg-slate-700 text-slate-200;
  }
  &-item {
    @apply absolute top-[20%] left-[20%] z-[-1];
    .item {
      @apply absolute flex items-center justify-center text-lg w-8 h-8 opacity-0 rounded-full text-slate-200;
    }
  }
  &.active {
    .fab-content {
      @apply transition transform duration-500 ease-in-out rotate-45;
    }
  }
  &.active {
    .item {
      &:nth-child(1) {
        @apply transform transition duration-500 ease-in-out delay-300 translate-y-[70px] bg-green-500 opacity-100;
      }
      &:nth-child(2) {
        @apply transform transition duration-500 ease-in-out delay-500 translate-x-[-65px] bg-yellow-500 translate-y-[35px] opacity-100;
      }
      &:nth-child(3) {
        @apply transform transition duration-500 ease-in-out delay-700 translate-x-[-65px] bg-purple-500 translate-y-[-35px] opacity-100;
      }
    }
  }
}
</style>
