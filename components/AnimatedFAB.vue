<script setup lang="ts">
// const open = ref(false);
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
    @apply flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-xl text-slate-200;
  }
  &-item {
    @apply absolute left-[20%] top-[20%] z-[-1];
    .item {
      @apply absolute flex h-8 w-8 items-center justify-center rounded-full text-lg text-slate-200 opacity-0;
    }
  }
  &.active {
    .fab-content {
      @apply rotate-45 transform transition duration-500 ease-in-out;
    }
  }
  &.active {
    .item {
      &:nth-child(1) {
        @apply translate-y-[70px] transform bg-green-500 opacity-100 transition delay-300 duration-500 ease-in-out;
      }
      &:nth-child(2) {
        @apply translate-x-[-65px] translate-y-[35px] transform bg-yellow-500 opacity-100 transition delay-500 duration-500 ease-in-out;
      }
      &:nth-child(3) {
        @apply translate-x-[-65px] translate-y-[-35px] transform bg-purple-500 opacity-100 transition delay-700 duration-500 ease-in-out;
      }
    }
  }
}
</style>
