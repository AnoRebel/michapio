<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { Database } from "@/types/supabase.d";

definePageMeta({
  layout: false,
});

const chapios = reactive({
  data: [
    {
      id: "f42cd306-5d2c-4cfa-9065-010a8881666c",
      chapio: "tets",
      origin: "test",
      views: 0,
      description:
        "Lorem ipsum dolor sit amet, qui labore adipisicing minim sint cillum sint consectetur cupidatat.",
      deleted: false,
      user_id: "0fe3b371-ddf7-4e28-b034-d11e074208e7",
      created_at: "2023-03-02T15:14:31.197276+00:00",
      updated_at: "2023-03-02T15:14:31.197276+00:00",
      fts: null,
      likes: [{ count: 0 }],
      users: {
        // id: "0fe3b371-ddf7-4e28-b034-d11e074208e7",
        username: "AnoRebel",
        email: "hacker4rebel@gmail.com",
        // password: "$2a$10$UuBccsbg0XDnwYAaP7SISuadTd9LM7X9CWSyFlTUbptz3ajBXFwhy",
        // deleted: false,
        // created_at: "2023-03-02T15:12:00.886528+00:00",
        // updated_at: "2023-03-02T15:12:00.886528+00:00",
      },
    },
  ],
  from: 0,
  to: 10,
  loading: false,
  refresh: async () => {},
  error: {},
});

const route = useRoute();
const loading = ref(false);
const client = useSupabaseClient<Database>();
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
    chapios.from = 0;
    chapios.to = 10;
    chapios.refresh();
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

const load = async ($state: { complete: () => void; loaded: () => void; error: () => void }) => {
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
    chapios.from = chapios.to;
    chapios.to = chapios.to + 10;
    if (chapios.data.length < 4) $state.complete();
    else {
      const data = await loadData();
      chapios.data.push(...data.value);
      $state.loaded();
    }
  } catch (error) {
    $state.error();
  }
};

const loadData = async () => {
  // Fetch michapio and get the refresh method provided by useAsyncData
  const { pending, data, refresh, error } = await useAsyncData("michapio", async () => {
    const { data } = await client
      .from("michapio")
      .select("*,likes(count),users!michapio_user_id_foreign(username, email)")
      .range(chapios.from, chapios.to);
    return data;
  });
  chapios.loading = pending;
  // chapios.data.push(...data.value);
  chapios.refresh = refresh;
  chapios.error = error;
  return data;
};

onBeforeMount(async () => {
  // Fetch michapio and get the refresh method provided by useAsyncData
  chapios.data = [];
  const data = await loadData();
  chapios.data.push(...data.value);
});

// Once page is mounted, listen to changes on the `collaborators` table and refresh collaborators when receiving event
onMounted(() => {
  // Real time listener for new michapio
  realtimeChannel = client
    .channel("public:michapio")
    .on("postgres_changes", { event: "*", schema: "public", table: "michapio" }, () =>
      chapios.refresh()
    );
  realtimeChannel.subscribe();
  console.info(chapios.data);
});

const selected = reactive({
  chapio: {},
  show: false,
});
watch(
  route,
  () => {
    if (route.hash !== "") {
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
  <div class="h-full">
    <NuxtLayout name="main">
      <NuxtLoadingIndicator />
      <!-- Start -->
      <div class="h-full w-full px-4 sm:px-0">
        <div class="rounded-xl bg-slate-800 px-3 focus:outline-none">
          <PullRefresh v-model="loading" @refresh="onRefresh">
            <ul v-auto-animate role="list" class="space-y-4">
              <li
                v-for="chapio in chapios.data"
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
        {{ chapios.data }}
        <SideBar />
      </template>
    </NuxtLayout>
    <ChapioModal :open="selected.show" :chapio="selected.chapio" @close="selected.show = false" />
  </div>
</template>

<style lang="scss">
.loader {
  height: 1px;
}
</style>
