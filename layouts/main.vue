<script setup lang="ts"></script>

<template>
  <div class="relative flex min-h-screen w-full flex-col items-center bg-slate-800 text-slate-50">
    <Header />
    <AddModal />
    <AuthModal />
    <!-- <ChapioModal /> -->
    <div
      class="animate__animated animate__fadeInDown mt-12 flex h-1/6 w-full flex-col items-center justify-center text-center"
    >
      <p class="fw-bold text-2xl">Language can be quite misleading???</p>
    </div>
    <div class="mt-3 h-5/6 py-10">
      <div
        class="mx-auto h-full max-w-3xl sm:px-6 md:grid md:max-w-7xl md:grid-cols-12 md:gap-8 md:px-8"
      >
        <main class="h-full md:col-span-full lg:col-span-7">
          <slot />
        </main>
        <aside class="hidden h-full lg:col-span-5 lg:block">
          <slot name="aside" />
        </aside>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
