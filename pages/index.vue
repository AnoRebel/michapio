<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";
import type { RealtimeChannel } from "@supabase/supabase-js";

definePageMeta({
  layout: false,
});

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

const route = useRoute();
const loading = ref(false);
const client = useSupabaseClient();
let realtimeChannel: RealtimeChannel;
const notify = useNotify();

const onRefresh = () => {
  notify(
    {
      group: "messages",
      type: "info",
      title: "Michapio",
      text: "Refreshing michapio...",
    },
    2500
  );
  try {
    refreshMichapio();
  } catch (error) {
    notify(
      {
        group: "errors",
        title: "Refresh Error",
        text: error,
      },
      3500
    );
  }
  notify(
    {
      group: "messages",
      type: "success",
      title: "Michapio",
      text: "Refreshed michapio...",
    },
    2500
  );
  loading.value = false;
};

const load = async $state => {
  notify(
    {
      group: "messages",
      type: "info",
      title: "Michapio",
      text: "Loading more michapio...",
    },
    4000
  );
  try {
    $state.loaded();
    $state.complete();
  } catch (error) {
    $state.error();
  }
};

// Fetch michapio and get the refresh method provided by useAsyncData
const {
  pending,
  data: michapio,
  refresh: refreshMichapio,
  error,
} = await useAsyncData(
  "michapio",
  async () => {
    const { data } = await client.from("michapio").select("*,users!michapio_user_id_foreign(*)");
    return data;
  }
  // { pick: ['title', 'description'] },
);

// Once page is mounted, listen to changes on the `collaborators` table and refresh collaborators when receiving event
onMounted(() => {
  // Real time listener for new workouts
  realtimeChannel = client
    .channel("public:michapio")
    .on("postgres_changes", { event: "*", schema: "public", table: "michapio" }, () =>
      refreshMichapio()
    );
  realtimeChannel.subscribe();
});

const selected = reactive({
  chapio: {},
  show: false,
});
watch(
  route,
  () => {
    if (route.hash != "") {
      selected.chapio = route.hash;
      selected.show = true;
    }
  },
  { immediate: true }
);

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
        <div class="rounded-xl bg-slate-800 px-3 focus:outline-none">
          <PullRefresh v-model="loading" @refresh="onRefresh">
            <ul v-auto-animate role="list" class="space-y-4">
              <li
                v-for="chapio in chapios"
                :key="chapio.id"
                class="rounded-lg bg-slate-50 px-4 py-6 shadow sm:p-6"
              >
                <ChapioCard :chapio="chapio" />
              </li>
              <InfiniteLoading class="loader" @infinite="load" />
            </ul>
          </PullRefresh>
        </div>
      </div>
      <!-- End -->
      <template #aside>
        {{ michapio }}
        <SideBar />
      </template>
    </NuxtLayout>
    <ChapioModal :open="selected.show" :chapio="selected.chapio" @close="selected.show = false" />
  </div>
</template>
