<script setup lang="ts">
const headerRef = ref(null);
onMounted(() => {
  const typer = useTyping(headerRef.value, { loop: true, typingSpeed: 150, deletingSpeed: 100 });
  typer
    .typeString("Mipachio", 100)
    .pauseFor(150)
    .deleteChars(6, 50)
    .typeString("chapio")
    .pauseFor(500)
    .deleteChars(8)
    .typeString("Tongue of Slip", 100)
    .pauseFor(150)
    .deleteChars(14, 70)
    .typeString("Slip of Tongue")
    .pauseFor(500)
    .deleteChars(14, 70)
    .start();
});
</script>

<template>
  <div
    class="relative flex h-screen w-full flex-col items-center justify-center bg-slate-800 text-slate-50"
  >
    <Header />
    <AddButton />
    <AddModal />
    <AuthModal />
    <!-- <ChapioModal /> -->
    <div
      class="animate__animated animate__fadeInDown h-1/6 w-full flex flex-col justify-center items-center text-center"
    >
      <div ref="headerRef" class="typing"></div>
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

<style lang="scss">
.typing {
  @apply relative flex whitespace-pre-wrap text-2xl;
  &::after {
    content: "";
    @apply absolute right-[1rem] w-px mr-[-1.2rem] h-full border-r-2 border-slate-100;
    animation: blink 0.5s infinite ease;
  }
}
@keyframes blink {
  0% {
    @apply opacity-0;
  }
  100% {
    @apply opacity-100;
  }
}
</style>
