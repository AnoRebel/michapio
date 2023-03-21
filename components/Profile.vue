<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import InfiniteLoading from "v3-infinite-loading";
import { Database } from "@/types/supabase.d";
import { useModals } from "@/stores/modals";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String || Number,
    required: true,
  },
});
defineEmits(["close"]);

const client = useSupabaseClient<Database>();
const { setAuthState } = useModals();
const { isLoggedIn } = useAuth();
const notify = useNotify();
const res = reactive({
  user: {},
  error: {},
  loading: false,
});

onBeforeMount(async () => {
  // Get user from key from prop
  const { pending, data, error } = await useAsyncData("user", async () => {
    const { data } = await client.from("users").select("*").eq("id", props.userId);
    return data;
  });
  res.user = data;
  res.error = error;
  res.loading = pending;
});

const loading = ref(false);
const logged = ref(false);
const tabs = computed(() => [
  { name: "Michapio", href: "#", current: true, show: true },
  { name: "Likes", href: "#", current: false, show: isLoggedIn() },
  { name: "Favourites", href: "#", current: false, show: isLoggedIn() },
]);
const tabClass = computed(() =>
  tabs.value.filter(tabC => tabC.show === true).length === 1 ? "w-full" : `w-1/${tabs.value.length}`
);
const team = [
  {
    name: "Leslie Alexander",
    handle: "lesliealexander",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "online",
  },
  // More people...
];

// Fetch michapio and get the refresh method provided by useAsyncData
const {
  pending,
  data: michapio,
  refresh: refreshMichapio,
  error,
} = await useAsyncData(
  "michapio",
  async () => {
    const { data } = await client.from("michapio").select("*").eq("id", props.userId);
    return data;
  }
  // { pick: ['title', 'description'] },
);

// Fetch favourites and get the refresh method provided by useAsyncData
// const { pending: pendingFavs, data: favourites, refresh: refreshFavourites, error: favError } = await useAsyncData(
//   "favourites",
//   async () => {
//     const { data } = await client.from("favourites").select("*").eq("id", props.user.id);
//     return data;
//   },
//  // { pick: ['title', 'description'] },
// );

// Fetch likes and get the refresh method provided by useAsyncData
// const { pending: pendingLikes, data: likes, refresh: refreshLikes, error: likesError } = await useAsyncData(
//   "likes",
//   async () => {
//     const { data } = await client.from("likes").select("*").eq("id", props.user.id);
//     return data;
//   },
//  // { pick: ['title', 'description'] },
// );

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
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-[60]" @close="$emit('close')">
      <div class="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <h2 id="slide-over-heading" class="text-lg font-medium text-gray-900">
                        Profile
                      </h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                          @click="$emit('close')"
                        >
                          <span class="sr-only">Close panel</span>
                          <Icon name="heroicons:x-mark" class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- Main -->
                  <div>
                    <div class="pb-1 sm:pb-6">
                      <div>
                        <div class="relative h-40 sm:h-56">
                          <nuxt-img
                            provider="dicebear"
                            class="absolute h-full w-full rounded-full object-contain"
                            :src="`${res.user.user_metadata.username}.svg`"
                            :alt="res.user.user_metadata.username"
                            crossorigin="anonymous"
                            loading="lazy"
                          />
                        </div>
                        <div class="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                          <div class="sm:flex-1">
                            <div>
                              <div class="flex items-center">
                                <h3 class="text-xl font-bold text-gray-900 sm:text-2xl">
                                  {{ res.user.user_metadata.username }}
                                </h3>
                                <span
                                  class="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400"
                                >
                                  <span class="sr-only">Online</span>
                                </span>
                              </div>
                              <p class="text-sm text-gray-500">count</p>
                            </div>
                            <div class="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                              <button
                                type="button"
                                class="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:flex-1"
                                @click="setAuthState(true, 'add')"
                              >
                                Add
                              </button>
                              <button
                                type="button"
                                class="inline-flex w-full flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                @click="logged = true"
                              >
                                Sign Out
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                      <div class="border-b border-gray-200">
                        <div class="px-6">
                          <nav class="-mb-px flex space-x-6" x-descriptions="Tab component">
                            <NuxtLink
                              v-for="tab in tabs"
                              :key="tab.name"
                              :to="tab.href"
                              :class="[
                                tab.current
                                  ? 'border-indigo-500 text-indigo-600'
                                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                `whitespace-nowrap border-b-2 px-1 pb-4 text-center text-sm font-medium ${tabClass}`,
                              ]"
                            >
                              {{ tab.name }}
                            </NuxtLink>
                          </nav>
                        </div>
                      </div>
                      <PullRefresh v-model="loading" @refresh="onRefresh">
                        <ul role="list" class="flex-1 divide-y divide-gray-200 overflow-y-auto">
                          <li v-for="person in team" :key="person.handle">
                            <div class="group relative flex items-center py-6 px-5">
                              <a :href="person.href" class="-m-1 block flex-1 p-1">
                                <div
                                  class="absolute inset-0 group-hover:bg-gray-50"
                                  aria-hidden="true"
                                />
                                <div class="relative flex min-w-0 flex-1 items-center">
                                  <span class="relative inline-block flex-shrink-0">
                                    <img
                                      class="h-10 w-10 rounded-full"
                                      :src="person.imageUrl"
                                      alt=""
                                    />
                                    <span
                                      :class="[
                                        person.status === 'online' ? 'bg-green-400' : 'bg-gray-300',
                                        'absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white',
                                      ]"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  <div class="ml-4 truncate">
                                    <p class="truncate text-sm font-medium text-gray-900">
                                      {{ person.name }}
                                    </p>
                                    <p class="truncate text-sm text-gray-500">
                                      {{ "@" + person.handle }}
                                    </p>
                                  </div>
                                </div>
                              </a>
                              <Menu
                                as="div"
                                class="relative ml-2 inline-block flex-shrink-0 text-left"
                              >
                                <MenuButton
                                  class="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                  <span class="sr-only">Open options menu</span>
                                  <span
                                    class="flex h-full w-full items-center justify-center rounded-full"
                                  >
                                    <Icon
                                      name="heroicons:ellipsis-vertical-solid"
                                      class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </MenuButton>
                                <transition
                                  enter-active-class="transition ease-out duration-100"
                                  enter-from-class="transform opacity-0 scale-95"
                                  enter-to-class="transform opacity-100 scale-100"
                                  leave-active-class="transition ease-in duration-75"
                                  leave-from-class="transform opacity-100 scale-100"
                                  leave-to-class="transform opacity-0 scale-95"
                                >
                                  <MenuItems
                                    class="absolute top-0 right-9 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                  >
                                    <div class="py-1">
                                      <MenuItem v-slot="{ active }">
                                        <a
                                          href="#"
                                          :class="[
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                          ]"
                                          >View profile</a
                                        >
                                      </MenuItem>
                                      <MenuItem v-slot="{ active }">
                                        <a
                                          href="#"
                                          :class="[
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                          ]"
                                          >Send message</a
                                        >
                                      </MenuItem>
                                    </div>
                                  </MenuItems>
                                </transition>
                              </Menu>
                            </div>
                          </li>
                          <InfiniteLoading class="loader" @infinite="load" />
                        </ul>
                      </PullRefresh>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <LogoutModal :open="logged" @close="logged = false" />
</template>
