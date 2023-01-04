<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  EllipsisVerticalIcon,
  ShareIcon,
  StarIcon,
  HandThumbUpIcon,
} from "@heroicons/vue/24/solid";
import { useModals } from "@/stores/modals";

const props = defineProps({
  chapio: {
    type: Object,
    required: true,
  },
});

const { isLoggedIn } = useAuth();
const { setAuthState } = useModals();
const likeState = ref("initial");
const likes = ref(parseInt(props.chapio.likes || 0));

const checkAndAdd = () => {
  if (isLoggedIn()) {
    // Add to favourites
  } else {
    setAuthState(true, "register");
  }
};

const toggleFavourite = event => {
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
};

const liked = ref(false);
const toggleLike = () => {
  // 1. Old number goes up
  setTimeout(() => (likeState.value = liked.value ? "waitDown" : "goUp"), 0);
  // setTimeout(() => (likeState.value = "goUp"), 0);
  // 2. Incrementing the counter
  setTimeout(
    () => (liked.value ? (likes.value = likes.value + 1) : (likes.value = likes.value - 1)),
    100
  );
  // 3. New number waits down
  // setTimeout(() => (likeState.value = "waitDown"), 100);
  setTimeout(() => (likeState.value = liked.value ? "goUp" : "waitDown"), 100);
  // 4. New number stays in the middle
  setTimeout(() => (likeState.value = "initial"), 200);
  liked.value = !liked.value;
};
</script>

<template>
  <!-- TODO: Filter NSFW content -->
  <article :aria-labelledby="'chapio-title-' + chapio.id">
    <div>
      <div class="flex space-x-3">
        <div class="flex-shrink-0">
          <nuxt-img
            provider="dicebear"
            class="h-10 w-10 rounded-full"
            src="ano.svg"
            :alt="chapio.author.name"
            crossorigin="anonymous"
            loading="lazy"
          />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-slate-900">
            <NuxtLink :to="chapio.author.href" class="hover:underline">
              {{ chapio.author.name }}
            </NuxtLink>
          </p>
          <p class="text-sm text-slate-500">
            <NuxtLink :to="chapio.href" class="hover:underline">
              <time :datetime="chapio.datetime">{{ chapio.date }}</time>
            </NuxtLink>
          </p>
        </div>
        <!-- TODO: Remove this.. -->
        <div class="flex flex-shrink-0 self-center">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="-m-2 flex items-center rounded-full p-2 text-slate-400 hover:text-slate-600"
              >
                <span class="sr-only">Open options</span>
                <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-slate-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <NuxtLink
                      to="#"
                      :class="[
                        active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
                        'flex px-4 py-2 text-sm',
                      ]"
                      @click="checkAndAdd"
                    >
                      <StarIcon class="mr-3 h-5 w-5 text-slate-400" aria-hidden="true" />
                      <span>Add to favorites</span>
                    </NuxtLink>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <h2 :id="'chapio-title-' + chapio.id" class="mt-4 text-base font-medium text-slate-900">
        {{ chapio.title }}
      </h2>
    </div>
    <div class="mt-2 space-y-4 text-sm text-slate-700" v-html="chapio.body" />
    <div class="mt-6 flex justify-between space-x-8">
      <div class="flex space-x-6">
        <span class="inline-flex items-center text-sm">
          <button
            type="button"
            class="inline-flex space-x-2 text-slate-400 hover:text-slate-500"
            @click.self="toggleLike"
          >
            <HandThumbUpIcon
              class="like_icon h-5 w-5"
              :class="{ 'text-cyan-800': liked }"
              aria-hidden="true"
              @click="toggleLike"
            />
            <span class="font-medium text-slate-900" :class="likeState" @click="toggleLike">
              {{ likes }}
            </span>
            <span class="sr-only">likes</span>
          </button>
        </span>
      </div>
      <div class="flex text-sm">
        <span class="inline-flex items-center space-x-5 text-sm">
          <button type="button" class="inline-flex space-x-2 text-slate-400 hover:text-slate-500">
            <ShareIcon class="h-5 w-5" aria-hidden="true" />
            <span class="font-medium text-slate-900">Share</span>
          </button>
          <button
            v-if="isLoggedIn()"
            type="button"
            class="inline-flex space-x-2 text-slate-400 hover:text-slate-500"
            @click.self="toggleFavourite"
          >
            <StarIcon class="favourite_icon h-5 w-5" aria-hidden="true" @click="toggleFavourite" />
            <span class="font-medium text-slate-900" @click="toggleFavourite">Favorite</span>
          </button>
        </span>
      </div>
    </div>
  </article>
</template>

<style lang="scss">
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
