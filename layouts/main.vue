<script setup lang="ts">
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from "@heroicons/vue/solid";

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
    <!-- <AddButton /> -->
    <AddModal />
    <AuthModal />
    <!-- <ChapioModal /> -->
    <div
      class="h-1/6 w-full flex flex-col justify-center items-center text-center animate__animated animate__fadeInDown"
    >
      <div ref="headerRef" class="typing"></div>
      <p class="">Language can be quite misleading???</p>
    </div>
    <div class="flex h-5/6 w-full flex-row space-x-3 px-3">
      <main
        class="flex flex-col w-4/6 rounded shadow p-4 animate__animated animate__fadeInLeft animate__faster"
      >
        <div class="flex-grow"><slot /></div>
        <nav
          class="flex-shrink border-t border-gray-200 px-4 flex items-center justify-between sm:px-0"
        >
          <div class="-mt-px w-0 flex-1 flex">
            <a
              href="#"
              class="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              <ArrowNarrowLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Previous
            </a>
          </div>
          <div class="hidden md:-mt-px md:flex">
            <a
              href="#"
              class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            >
              1
            </a>
            <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
            <a
              href="#"
              class="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
              aria-current="page"
            >
              2
            </a>
            <a
              href="#"
              class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            >
              3
            </a>
            <span
              class="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            >
              ...
            </span>
            <a
              href="#"
              class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            >
              8
            </a>
            <a
              href="#"
              class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            >
              9
            </a>
            <a
              href="#"
              class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            >
              10
            </a>
          </div>
          <div class="-mt-px w-0 flex-1 flex justify-end">
            <a
              href="#"
              class="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Next
              <ArrowNarrowRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </main>
      <aside
        class="w-2/6 rounded shadow p-3 animate__animated animate__fadeInRight animate__faster"
      >
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
