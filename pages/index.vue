<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import InfiniteLoading from "v3-infinite-loading";
import { useToast } from "tailvue";
import type { RealtimeChannel } from "@supabase/supabase-js";

definePageMeta({
  layout: false,
});

// TODO: Add `Favourites`
const tabs = [
  { name: "All", href: "#", current: true },
  { name: "Recent", href: "#", current: false },
  { name: "Most Viewed", href: "#", current: false },
];
const chapios = ref([
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
]);

const loading = ref(false);
const client = useSupabaseClient();
let realtimeChannel: RealtimeChannel;
const $toast = useToast();
const { $notify } = useNuxtApp();

const onRefresh = () => {
  console.log("Refreshing...");
  // $toast.show({ message: "Refreshing michapio...", timeout: 2.5 });
  $notify(
    {
      group: "messages",
      type: "info",
      title: "Michapio",
      text: "Refreshing michapio...",
    },
    2500
  );
  try {
    refreshCollaborators();
  } catch (error) {
    $notify(
      {
        group: "errors",
        title: "Refresh Error",
        text: error,
      },
      3500
    );
  }
  $notify(
    {
      group: "messages",
      type: "info",
      title: "Michapio",
      text: "Refreshed michapio...",
    },
    2500
  );
  console.log("Refreshed...");
  loading.value = false;
};

const load = async $state => {
  console.log("Loading...");
  $notify(
    {
      group: "messages",
      type: "info",
      title: "Michapio",
      text: "Loading more michapio...",
    },
    2500
  );
  try {
    $state.loaded();
    $state.complete();
  } catch (error) {
    $state.error();
  }
};

// const { pending, data: users, refresh, error } = useLazyFetch("/api/users", { pick: ['name', 'description'] });
// const { pending, data: users, error } = useLazyAsyncData("users", () => $fetch("/api/users"));
// const refresh = () => refreshNuxtData("users");

// Fetch collaborators and get the refresh method provided by useAsyncData
const { data: michapio, refresh: refreshCollaborators } = await useAsyncData(
  "michapio",
  async () => {
    const { data } = await client.from("michapio").select("*");
    return data;
  }
);

// Once page is mounted, listen to changes on the `collaborators` table and refresh collaborators when receiving event
onMounted(() => {
  // Real time listener for new workouts
  realtimeChannel = client
    .channel("public:michapio")
    .on("postgres_changes", { event: "*", schema: "public", table: "michapio" }, () =>
      refreshCollaborators()
    );
  realtimeChannel.subscribe();
});

// const { list, containerProps, wrapperProps } = useVirtualList(chapios, { itemHeight: 250 });

// Don't forget to unsubscribe when user left the page
onUnmounted(() => {
  client.removeChannel(realtimeChannel);
});
</script>

<template>
  <div>
    <NuxtLayout name="main">
      <NuxtLoadingIndicator />
      <!-- Start -->
      <div class="w-full px-4 sm:px-0">
        <TabGroup>
          <TabList class="sticky top-4 z-10 flex w-full space-x-1 rounded-xl bg-slate-50 p-1">
            <Tab v-for="(tab, tabIx) in tabs" :key="tabIx" v-slot="{ selected }" as="template">
              <button
                :class="[
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'focus:outline-none',
                  selected
                    ? 'bg-slate-800 text-slate-50 shadow'
                    : 'text-slate-900 hover:bg-slate-50/[0.12] hover:text-slate-700',
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
              class="rounded-xl bg-slate-800 p-3 focus:outline-none"
            >
              <div class="mt-4">
                <h1 class="sr-only">{{ chaps.name }}</h1>
                <PullRefresh v-model="loading" @refresh="onRefresh">
                  <ul role="list" class="space-y-4">
                    <li
                      v-for="chapio in chapios"
                      :key="chapio.id"
                      class="bg-slate-50 px-4 py-6 shadow sm:rounded-lg sm:p-6"
                    >
                      <ChapioCard :chapio="chapio" />
                    </li>
                    <InfiniteLoading class="loader" @infinite="load" />
                  </ul>
                </PullRefresh>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <!-- End -->
      <template #aside>
        <SideBar />
      </template>
    </NuxtLayout>
  </div>
</template>
