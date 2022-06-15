<template>
  <div class="flex h-screen w-full flex-col items-center justify-center bg-gray-800 text-gray-50">
    <div
      class="animate__animated animate__fadeInDown h-1/6 w-full flex flex-col justify-center items-center text-center"
    >
      <div ref="headerRef" class="whitespace-pre-wrap text-2xl"></div>
      <p class="">Language can be quite misleading???</p>
    </div>
    <div class="flex h-5/6 w-full flex-row space-x-3 px-3">
      <main class="animate__animated animate__fadeInLeft w-4/6 rounded shadow p-4">
        <slot />
      </main>
      <aside class="animate__animated animate__fadeInRight w-2/6 rounded shadow p-3">
        <slot name="aside" />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
const headerRef = ref(null);
onMounted(() => {
  const typer = useTyping(headerRef.value, { loop: true, typingSpeed: 100, deletingSpeed: 100 });
  typer
    .typeString(" Mipachio")
    .pauseFor(250)
    .deleteChars(6)
    .typeString("chapio")
    .pauseFor(400)
    .deleteChars(8)
    .typeString(" Tongue of Slip")
    .pauseFor(500)
    .deleteChars(14)
    .typeString(" Slip of Tongue")
    .deleteAll(70)
    .start();
});
</script>
