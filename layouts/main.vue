<template>
  <div class="flex h-screen w-full flex-col items-center justify-center bg-gray-800 text-gray-50">
    <div class="w-full text-center">
      <h3 class="">Michapio</h3>
      <p class="">Language can be quite misleading???</p>
    </div>
    <div class="flex h-full w-full flex-row space-x-3 px-3">
      <main class="w-4/6 p-4">
        <slot />
      </main>
      <aside class="w-2/6 p-3">
        <slot name="aside" />
      </aside>
    </div>
  </div>
</template>
