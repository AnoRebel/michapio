<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";
import type { RealtimeChannel } from "@supabase/supabase-js";

definePageMeta({
  layout: false,
});

const chapios = ref([
  {
    id: "f42cd306-5d2c-4cfa-9065-010a8881666c",
    chapio: "tets",
    origin: "test",
    views: 0,
    description: null,
    deleted: false,
    user_id: "0fe3b371-ddf7-4e28-b034-d11e074208e7",
    created_at: "2023-03-02T15:14:31.197276+00:00",
    updated_at: "2023-03-02T15:14:31.197276+00:00",
    fts: null,
    users: {
      id: "0fe3b371-ddf7-4e28-b034-d11e074208e7",
      username: "AnoRebel",
      email: "hacker4rebel@gmail.com",
      password: "$2a$10$UuBccsbg0XDnwYAaP7SISuadTd9LM7X9CWSyFlTUbptz3ajBXFwhy",
      deleted: false,
      created_at: "2023-03-02T15:12:00.886528+00:00",
      updated_at: "2023-03-02T15:12:00.886528+00:00",
    },
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
