<script setup lang="ts">
// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { Database } from "@/types/supabase.d";
import { useModals } from "@/stores/modals";

const props = defineProps({
  chapio: {
    type: Object,
    required: true,
  },
});

let realtimeChannel: RealtimeChannel;
const route = useRoute();
const router = useRouter();
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
const { isLoggedIn } = useAuth();
const { setAuthState } = useModals();
const notify = useNotify();
const sbar = reactive({
  user_id: 0,
  open: false,
});
const faved = ref(false);
const likes = reactive({
  count: 0,
  state: "initial",
  active: false,
});

// Fetch likes and get the refresh method provided by useAsyncData
const { data: _likes, refresh: refreshLikes } = await useAsyncData("likes", async () => {
  const { count } = await client
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("chapio_id", props.chapio.id)
    .eq("status", true);
  return count;
});

onMounted(() => {
  // Real time listener for new likes
  realtimeChannel = client
    .channel("public:likes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "likes", filter: `chapio_id=eq.${props.chapio.id}` },
      () => refreshLikes()
    );
  realtimeChannel.subscribe();
  likes.count = parseInt(_likes.value || props.chapio?.likes[0]?.count || 0);
});

const toggleFavourite = async (event: Event, id: string) => {
  if (isLoggedIn()) {
    if (faved.value) {
      try {
        await client
          .from("favourites")
          .upsert({ user_id: user.value.id, chapio_id: id, status: false });
      } catch (error) {
        return;
      }
    } else {
      try {
        await client
          .from("favourites")
          .upsert({ user_id: user.value.id, chapio_id: id, status: true });
      } catch (error) {
        return;
      }
    }
    if (event.target?.classList?.contains("favourite_icon")) {
      event.target.classList.toggle("animate-favourite");
    }
    if (event.target.nextSibling?.classList?.contains("favourite_icon")) {
      event.target.nextSibling.classList.toggle("animate-favourite");
    }
    if (event.target.previousSibling?.classList?.contains("favourite_icon")) {
      event.target.previousSibling.classList.toggle("animate-favourite");
    }
    if (event.target.querySelector(".favourite_icon")?.classList?.contains("favourite_icon")) {
      event.target.querySelector(".favourite_icon").classList.toggle("animate-favourite");
    }
    if (event.target.parentElement?.classList?.contains("favourite_icon")) {
      event.target.parentElement.classList.toggle("animate-favourite");
    }
    faved.value = !faved.value;
  } else {
    setAuthState(true, "login");
  }
};

const toggleLike = async (id: string) => {
  if (isLoggedIn()) {
    if (likes.active) {
      try {
        await client.from("likes").upsert({ user_id: user.value.id, chapio_id: id, status: false });
      } catch (error) {
        return;
      }
    } else {
      try {
        await client.from("likes").upsert({ user_id: user.value.id, chapio_id: id, status: true });
      } catch (error) {
        return;
      }
    }
    // 1. Old number goes up
    setTimeout(() => (likes.state = likes.active ? "waitDown" : "goUp"), 0);
    // 2. Incrementing the counter
    setTimeout(() => (likes.count = _likes.value), 100);
    // 3. New number waits down
    setTimeout(() => (likes.state = likes.active ? "goUp" : "waitDown"), 100);
    // 4. New number stays in the middle
    setTimeout(() => (likes.state = "initial"), 200);
    likes.active = !likes.active;
  } else {
    setAuthState(true, "login");
  }
};

const share = async (data: { title: string; text: string; url: string }) => {
  if (navigator.canShare && navigator.canShare(data)) {
    navigator
      .share(data)
      .then(() =>
        notify(
          {
            group: "messages",
            type: "success",
            title: "Michapio",
            text: "Shared successfully...😏",
          },
          3500
        )
      )
      .catch(_ =>
        notify(
          {
            group: "errors",
            title: "Michapio",
            text: "Shared failed...😥",
          },
          3500
        )
      );
  } else if (navigator.clipboard) {
    // navigator.permissions.query({ name: "clipboard-write" }).then(result => {
    //   if (result.state === "granted" || result.state === "prompt") {
    //     /* write to the clipboard now */
    //   }
    // });
    try {
      await navigator.clipboard.writeText(data.url);
      notify(
        {
          group: "messages",
          type: "success",
          title: "Michapio",
          text: "Link copied to clipboard...😏",
        },
        3500
      );
    } catch (_) {
      notify(
        {
          group: "errors",
          title: "Michapio",
          text: "Shared failed...😥",
        },
        3500
      );
    }
  } else {
    notify(
      {
        group: "errors",
        title: "Michapio",
        text: "Sharing not supported...😥",
      },
      3500
    );
  }
};

const modal = hash => router.replace({ hash: `#${hash}` });
const profile = (id: number) => {
  sbar.user_id = id;
  sbar.open = true;
};

// Don't forget to unsubscribe when user left the page
onUnmounted(() => {
  client.removeChannel(realtimeChannel);
});
</script>

<template>
  <!-- TODO: Filter NSFW content -->
  <article :aria-labelledby="`chapio-${chapio.id}`">
    <div class="px-4 py-2">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center">
          <nuxt-img
            provider="dicebear"
            class="h-10 w-10 cursor-pointer rounded-full"
            :src="`${chapio.users.username}.svg`"
            :alt="chapio.users.username"
            :title="chapio.users.username"
            crossorigin="anonymous"
            loading="lazy"
            @click="profile(chapio.user_id)"
          />
          <div class="pl-4">
            <h2 class="text-lg font-semibold text-gray-800">{{ chapio.users.username }}</h2>
            <p class="text-sm text-gray-600">12th July, 2021 at 8:30 AM</p>
          </div>
        </div>
        <button
          type="button"
          class="group inline-flex space-x-2 text-slate-400 hover:text-slate-500"
          title="Share"
          @click="
            share({
              title: chapio.title,
              text: chapio.body,
              url: route.fullPath + '#' + chapio.id,
            })
          "
        >
          <Icon
            name="heroicons:share-solid"
            class="h-5 w-5 text-slate-400 group-hover:text-slate-800"
            aria-hidden="true"
          />
          <span class="sr-only">Share</span>
        </button>
      </div>
      <div class="space-y-6 rounded-lg bg-gray-100 py-2 px-6 shadow-md">
        <div class="flex items-center">
          <div>
            <span class="mb-1 font-semibold text-gray-800">They said: &nbsp;</span>
            <span class="text-sm text-gray-700">{{ chapio.chapio }}</span>
          </div>
        </div>
        <div class="flex items-center">
          <div>
            <span class="mb-1 font-semibold text-gray-800">But meant: &nbsp;</span>
            <span class="text-sm text-gray-700">{{ chapio.origin }}</span>
          </div>
        </div>
      </div>
      <div class="mt-4 flex flex-col justify-between text-center">
        <p class="text-sm font-semibold text-slate-800">It was like:</p>
        <p class="rounded-lg bg-gray-100 p-2 text-sm text-gray-600 hover:shadow-md">
          {{ chapio.description }}
        </p>
        <div class="flex w-full items-center justify-between">
          <button
            class="group mr-2 inline-flex justify-center rounded-full p-2"
            :title="`${likes.count} likes`"
            @click.self="toggleLike(chapio.id)"
          >
            <span
              class="pr-1 font-medium text-slate-800"
              :class="likes.state"
              @click="toggleLike(chapio.id)"
            >
              {{ likes.count }}
            </span>
            <Icon
              name="heroicons:hand-thumb-up-solid"
              class="like_icon h-5 w-5 text-slate-400 group-hover:text-slate-800"
              :class="{ 'text-cyan-800': likes.active }"
              aria-hidden="true"
              @click="toggleLike(chapio.id)"
            />
            <span class="sr-only">{{ likes.count }} likes</span>
          </button>
          <button
            v-if="isLoggedIn()"
            class="group rounded-full p-2"
            title="Favourite"
            @click="toggleFavourite($event, chapio.id)"
          >
            <Icon
              name="heroicons:star-solid"
              class="favourite_icon h-5 w-5 text-slate-400 group-hover:text-slate-800"
              aria-hidden="true"
              @click="toggleFavourite($event, chapio.id)"
            />
            <!-- <span class="font-medium text-slate-900" @click="toggleFavourite">Favorite</span> -->
            <span class="sr-only">favourite</span>
          </button>
        </div>
      </div>
    </div>
  </article>
  <Profile :user-id="chapio.user_id" :open="sbar.open" @close="sbar.open = false" />
</template>

<style lang="scss">
.shadow-neumorphic {
  box-shadow: 10px 10px 15px #d9d9d9, -10px -10px 15px #ffffff;
}

.animate-like {
  animation-name: favouriteAnimation;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-duration: 0.65s;
  @apply text-cyan-800;
}

.animate-favourite {
  animation-name: favouriteAnimation;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-duration: 0.65s;
  @apply text-cyan-800;
}

@keyframes favouriteAnimation {
  0% {
    transform: scale(10);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes topBubbles {
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%,
      70% 90%;
  }
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%,
      90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%,
      90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}

@keyframes bottomBubbles {
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
  }
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}

.goUp {
  display: inline-flex;
  opacity: 0;
  transform: translate3d(0, -20px, 0);
  transition: 0.1s ease-in-out;
}
.waitDown {
  display: inline-flex;
  opacity: 0;
  transform: translate3d(0, 20px, 0);
}
.initial {
  display: inline-flex;
  opacity: 1;
  transform: translate3d(0, 0px, 0);
  transition: 0.1s ease-in-out;
}
</style>
