<template>
  <!-- TODO: Filter NSFW content -->
  <div class="w-full">
    <div class="my-3 flex h-[4rem] min-h-[5rem] w-96 flex-row rounded-md bg-purple-900">
      <div class="group h-full w-1/5 pr-1 transition duration-300 ease-in-out hover:p-0.5">
        <div class="h-full w-full rounded-l-md bg-black/70 group-hover:rounded-full"></div>
      </div>
      <div
        class="flex h-full w-3/5 flex-grow flex-col text-sm hover:cursor-pointer"
        @click="showModal"
      >
        <div>Chapio</div>
        <div>Original</div>
      </div>
      <div class="group h-full w-1/5 transition duration-300 ease-in-out hover:scale-100">
        <button
          class="h-1/2 w-full rounded-tr-md bg-gradient-to-r from-transparent via-red-500 to-red-600 hover:bg-red-600 active:scale-90 group-hover:shadow-sm"
        >
          X
        </button>
        <button
          class="h-1/2 w-full rounded-br-md bg-gradient-to-r from-transparent via-green-600 to-green-600 hover:bg-green-600 active:scale-90 group-hover:shadow-sm"
        >
          T
        </button>
      </div>
    </div>
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="person in people"
        :key="person.email"
        class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
      >
        <div class="w-full flex items-center justify-between p-6 space-x-6">
          <div class="flex-1 truncate">
            <div class="flex items-center space-x-3">
              <h3 class="text-gray-900 text-sm font-medium truncate">{{ person.name }}</h3>
              <span
                class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full"
                >{{ person.role }}</span
              >
            </div>
            <p class="mt-1 text-gray-500 text-sm truncate">{{ person.title }}</p>
          </div>
          <img
            class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
            :src="person.imageUrl"
            alt=""
          />
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200">
            <div class="w-0 flex-1 flex">
              <a
                :href="`mailto:${person.email}`"
                class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
              >
                <MailIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span class="ml-3">Email</span>
              </a>
            </div>
            <div class="-ml-px w-0 flex-1 flex">
              <a
                :href="`tel:${person.telephone}`"
                class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
              >
                <PhoneIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span class="ml-3">Call</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { MailIcon, PhoneIcon } from "@heroicons/vue/solid";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

const showModal = () => {
  console.log(props);
};
</script>
