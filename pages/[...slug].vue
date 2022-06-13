<template>
  <div class="h-screen w-screen bg-slate-800">
    <div class="h-full w-full flex flex-col justify-around items-center">
      <div class="text-center my-5 px-4">
        <img
          src="/images/404.svg"
          class="animate__animated animate__fadeInDown object-cover rounded h-full w-full my-7"
        />
        <p class="animate__animated animate__fadeInUp mt-6 mb-10 text-white">
          It seems
          <code class="rounded font-bold border-1px p-0.5 bg-slate-300 text-slate-900">{{
            slugs($route.params.slug)
          }}</code>
          doesn't exist; <i class="italic">yet?</i>
        </p>
        <NuxtLink
          to="/"
          class="animate__animated animate__fadeIn m-6 px-4 py-2 rounded bg-cyan-600 text-slate-100 my-5 transition transform hover:scale-110 active:scale-95"
        >
          Home
        </NuxtLink>
      </div>
      <div class="text-center text-slate-100 my-5">
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
