<template>
  <div>
    <NuxtLayout name="main">
      <ChapioCard :data="{}" />
      <template #aside>
        <div class="h-full w-full flex flex-col">
          <div class="h-1/2 w-full flex">
            <div class="w-full text-underline">Recent Michapio</div>
            <div class="w-full flex flex-col">
              <ul class="w-full">
                <li class="w-full">
                  <div class="w-full rounded-md shadow-md h-20 m-2 bg-slate-500">1</div>
                </li>
                <li class="w-full">
                  <div class="w-full rounded-md shadow-md h-20 m-2 bg-slate-500">2</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="h-1/2 w-full flex"><div class="text-underline">Most Viewed</div></div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

// const { pending, data: users, refresh, error } = useLazyFetch("/api/users", { pick: ['name', 'description'] });
const { pending, data: users, error } = useLazyAsyncData("users", () => $fetch("/api/users"));
// const refresh = () => refreshNuxtData("users");
</script>
