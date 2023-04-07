<template>
  <div class="h-screen w-screen bg-slate-800">
    <div class="flex h-full w-full flex-col items-center justify-around">
      <div class="my-5 px-4 text-center">
        <img
          src="/images/404.svg"
          class="animate__animated animate__fadeInDown my-7 h-full w-full rounded object-cover"
        />
        <p class="animate__animated animate__fadeInUp mb-10 mt-6 text-white">
          It seems
          <code class="border-1px rounded bg-slate-300 p-0.5 font-bold text-slate-900">{{
            slugs($route.params.slug)
          }}</code>
          doesn't exist; <i class="italic">yet?</i>
        </p>
        <NuxtLink
          to="/"
          class="animate__animated animate__fadeIn m-6 my-5 transform rounded bg-cyan-600 px-4 py-2 text-slate-100 transition hover:scale-110 active:scale-95"
        >
          Home
        </NuxtLink>
      </div>
      <div class="my-5 text-center text-slate-100">
        <p>
          <small>&copy; Reserverd Rights</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "user",
  title: "Not Found",
  // pageTransition: "moveUp",
  // layoutTransition: "moveUp",
});
const slugs = slugs => {
  let str = "/";
  slugs.forEach(slug => (str = str == "/" ? `${str}${slug}` : `${str}/${slug}`));
  return str;
};
</script>
