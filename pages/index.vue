<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import InfiniteLoading from "v3-infinite-loading";

definePageMeta({
  layout: false,
});

// TODO: Add `Favourites`
const tabs = [
  { name: "All", href: "#", current: true },
  { name: "Recent", href: "#", current: false },
  { name: "Most Viewed", href: "#", current: false },
];
const chapios = [
  {
    id: "81614",
    likes: "29",
    replies: "11",
    views: "2.7k",
    author: {
      name: "Dries Vincent",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",
    },
    date: "December 9 at 11:43 AM",
    datetime: "2020-12-09T11:43:00",
    href: "#",
    title: "What would you have done differently if you ran Jurassic Park?",
    body: `
      <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.</p>
    `,
  },
  {
    id: "81614",
    likes: "29",
    replies: "11",
    views: "2.7k",
    author: {
      name: "Dries Vincent",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",
    },
    date: "December 9 at 11:43 AM",
    datetime: "2020-12-09T11:43:00",
    href: "#",
    title: "What would you have done differently if you ran Jurassic Park?",
    body: `
      <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.</p>
    `,
  },
  {
    id: "81614",
    likes: "29",
    replies: "11",
    views: "2.7k",
    author: {
      name: "Dries Vincent",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",
    },
    date: "December 9 at 11:43 AM",
    datetime: "2020-12-09T11:43:00",
    href: "#",
    title: "What would you have done differently if you ran Jurassic Park?",
    body: `
      <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.</p>
    `,
  },
  {
    id: "81614",
    likes: "29",
    replies: "11",
    views: "2.7k",
    author: {
      name: "Dries Vincent",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",
    },
    date: "December 9 at 11:43 AM",
    datetime: "2020-12-09T11:43:00",
    href: "#",
    title: "What would you have done differently if you ran Jurassic Park?",
    body: `
      <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.</p>
    `,
  },
];

const loading = ref(false);
const onRefresh = () => {
  console.log("Refreshing...");
  setTimeout(() => {
    console.log("Refreshed...");
    loading.value = false;
  }, 1000);
};

const load = async $state => {
  console.log("Loading...");
  try {
    $state.loaded();
    $state.complete();
  } catch (error) {
    $state.error();
  }
};

// const { pending, data: users, refresh, error } = useLazyFetch("/api/users", { pick: ['name', 'description'] });
const { pending, data: users, error } = useLazyAsyncData("users", () => $fetch("/api/users"));
// const refresh = () => refreshNuxtData("users");
</script>

<template>
  <div>
    <NuxtLayout name="main">
      <NuxtLoadingIndicator />
      <div class="sticky top-4 px-4 z-10 sm:px-0">
        <div class="sm:hidden">
          <label for="chapio-tabs" class="sr-only">Select a tab</label>
          <select
            id="chapio-tabs"
            class="block w-full rounded-md border-slate-300 text-base font-medium text-slate-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          >
            <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
              {{ tab.name }}
            </option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav
            class="relative z-0 rounded-lg shadow flex divide-x divide-slate-200"
            aria-label="Tabs"
          >
            <NuxtLink
              v-for="(tab, tabIdx) in tabs"
              :key="tab.name"
              :to="tab.href"
              :aria-current="tab.current ? 'page' : undefined"
              :class="[
                tab.current ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-slate-50 py-4 px-6 text-sm font-medium text-center hover:bg-slate-100 focus:z-10',
              ]"
            >
              <span>{{ tab.name }}</span>
              <span
                aria-hidden="true"
                :class="[
                  tab.current ? 'bg-rose-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5',
                ]"
              />
            </NuxtLink>
          </nav>
        </div>
      </div>
      <!-- Start -->
      <div class="w-full max-w-md sticky top-4 z-10 px-4 py-16 sm:px-0">
        <TabGroup>
          <TabList class="w-full flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab v-for="(tab, tabIx) in tabs" as="template" :key="tabIx" v-slot="{ selected }">
              <button
                :class="[
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                ]"
              >
                {{ tab.name }}
              </button>
            </Tab>
          </TabList>

          <TabPanels class="mt-2">
            <TabPanel
              v-for="(chaps, idx) in tabs"
              :key="idx"
              :class="[
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              ]"
            >
              <div class="text-slate-800">
                {{ chaps.name }}
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <!-- End -->
      <div class="mt-4">
        <h1 class="sr-only">Recent Michapio</h1>
        <PullRefresh v-model="loading" @refresh="onRefresh">
          <ul role="list" class="space-y-4">
            <li
              v-for="chapio in chapios"
              :key="chapio.id"
              class="bg-slate-50 px-4 py-6 shadow sm:p-6 sm:rounded-lg"
            >
              <ChapioCard :chapio="chapio" />
            </li>
            <InfiniteLoading class="loader" @infinite="load" />
          </ul>
        </PullRefresh>
      </div>
      <template #aside>
        <SideBar />
      </template>
    </NuxtLayout>
  </div>
</template>
