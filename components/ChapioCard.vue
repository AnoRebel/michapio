<template>
  <!-- TODO: Filter NSFW content -->
  <article :aria-labelledby="'chapio-title-' + chapio.id">
    <div>
      <div class="flex space-x-3">
        <div class="flex-shrink-0">
          <img class="h-10 w-10 rounded-full" :src="chapio.author.imageUrl" alt="" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-gray-900">
            <NuxtLink :to="chapio.author.href" class="hover:underline">
              {{ chapio.author.name }}
            </NuxtLink>
          </p>
          <p class="text-sm text-gray-500">
            <NuxtLink :to="chapio.href" class="hover:underline">
              <time :datetime="chapio.datetime">{{ chapio.date }}</time>
            </NuxtLink>
          </p>
        </div>
        <div class="flex-shrink-0 self-center flex">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600"
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
                class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <NuxtLink
                      to="#"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'flex px-4 py-2 text-sm',
                      ]"
                    >
                      <StarIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span>Add to favorites</span>
                    </NuxtLink>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <h2 :id="'chapio-title-' + chapio.id" class="mt-4 text-base font-medium text-gray-900">
        {{ chapio.title }}
      </h2>
    </div>
    <div class="mt-2 text-sm text-gray-700 space-y-4" v-html="chapio.body" />
    <div class="mt-6 flex justify-between space-x-8">
      <div class="flex space-x-6">
        <span class="inline-flex items-center text-sm">
          <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
            <HandThumbUpIcon class="h-5 w-5" aria-hidden="true" />
            <span class="font-medium text-gray-900">{{ chapio.likes }}</span>
            <span class="sr-only">likes</span>
          </button>
        </span>
      </div>
      <div class="flex text-sm">
        <span class="inline-flex items-center text-sm">
          <button
            type="button"
            class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            @click="toggleLike"
          >
            <ShareIcon class="h-5 w-5" aria-hidden="true" />
            <span class="font-medium text-gray-900">Share</span>
          </button>
          <button
            type="button"
            class="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            @click="toggleFavourite"
          >
            <StarIcon class="h-5 w-5" aria-hidden="true" />
            <span class="font-medium text-gray-900">Add to favorites</span>
          </button>
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  EllipsisVerticalIcon,
  ShareIcon,
  StarIcon,
  HandThumbUpIcon,
} from "@heroicons/vue/24/solid";

defineProps({
  chapio: {
    type: Object,
    required: true,
  },
});

const toggleFavourite = event => {
  event.target.querySelector(".favourite_icon").classList.toggle("animate-favourite");
};

const toggleLike = event => {
  event.target.querySelector(".like_icon").classList.toggle("animate-like");
};
</script>

<style lang="scss">
.animate-like {
  /* 
    background-position: 0 0;
    transition: background-position 1s steps(28);
    transition-duration: 0s;
  */
  transition-duration: 1s;
  background-position: -2800px 0;
}
@keyframes favouriteAnimation {
  0% {
    transform: scale(30);
  }
  100% {
    transform: scale(1);
  }
}
.animate-favourite {
  animation-name: favouriteAnimation;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-duration: 0.65s;
}
</style>
