<script setup lang="ts"></script>

<template>
  <div
    class="relative flex h-full w-full flex-col items-center justify-center bg-slate-800 text-slate-50"
  >
    <Header />
    <AddModal />
    <AuthModal />
    <!-- <ChapioModal /> -->
    <div
      class="h-1/6 w-full flex flex-col justify-center items-center text-center mt-12 animate__animated animate__fadeInDown"
    >
      <p class="text-2xl fw-bold">Language can be quite misleading???</p>
    </div>
    <div class="h-5/6 mt-3 py-10">
      <div
        class="h-full max-w-3xl mx-auto sm:px-6 md:max-w-7xl md:px-8 md:grid md:grid-cols-12 md:gap-8"
      >
        <main class="h-full md:col-span-full lg:col-span-7">
          <slot />
        </main>
        <aside class="h-full hidden lg:block lg:col-span-5">
          <slot name="aside" />
        </aside>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
