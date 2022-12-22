<script setup lang="ts">
import { Notification, NotificationGroup } from "notiwind";
const { $pinia } = useNuxtApp();

const piniaLogger = ({ store }) => {
  store.$subscribe((mutation, _) => {
    // const mut = `{"store": ${mutation.storeId}, "type": ${mutation.type}, "payload": ${mutation.payload}}`;
    // console.info(JSON.parse(JSON.stringify(mut)));
  });
  store.$onAction(action => {
    // const act = `{"store": ${action.store.$id}, "action": ${action.name}, "payload": ${action.args}}`;
    // console.info(JSON.parse(JSON.stringify(act)));
  });
};

const piniaDebounce = ({ options, store }) => {
  // console.log(options);
  if (options.debounce) {
    // we are overriding the actions with new ones
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      debouncedActions[action] = useDebounce(store[action], options.debounce[action]);
      return debouncedActions;
    }, {});
  }
};

$pinia.use(piniaLogger);
$pinia.use(piniaDebounce);
</script>

<template>
  <div id="app" class="min-w-screen relative min-h-screen">
    <ClientOnly>
      <vue-progress-bar></vue-progress-bar>
    </ClientOnly>
    <ClientOnly>
      <NotificationGroup group="messages" position="top">
        <div class="pointer-events-none fixed inset-0 flex items-start justify-end p-6 px-4 py-6">
          <div class="w-full max-w-sm">
            <Notification
              v-slot="{ notifications, close }"
              enter="transform ease-out duration-300 transition"
              enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
              enter-to="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-500"
              leave-from="opacity-100"
              leave-to="opacity-0"
              move="transition duration-500"
              move-delay="delay-300"
            >
              <div v-for="notification in notifications" :key="notification.id">
                <div
                  v-if="notification.type === 'info'"
                  class="mx-auto mt-4 flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md"
                >
                  <div class="flex w-12 shrink-0 items-center justify-center bg-blue-500">
                    <svg
                      class="h-6 w-6 fill-current text-white"
                      viewBox="0 0 40 40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1 py-3">
                    <div class="mx-3">
                      <span class="font-semibold text-blue-500">{{ notification.title }}</span>
                      <p class="text-sm text-gray-600">{{ notification.text }}</p>
                    </div>
                  </div>
                  <div class="flex shrink-0 p-3">
                    <button
                      class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                      @click="close(notification.id)"
                    >
                      <span class="sr-only">Close</span>
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div
                  v-if="notification.type === 'success'"
                  class="mx-auto mt-4 flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md"
                >
                  <div class="flex w-12 shrink-0 items-center justify-center bg-green-500">
                    <svg
                      class="h-6 w-6 text-slate-50"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1 py-3">
                    <div class="mx-3">
                      <span class="font-semibold text-yellow-500">{{ notification.title }}</span>
                      <p class="text-sm text-gray-600">{{ notification.text }}</p>
                    </div>
                  </div>
                  <div class="flex shrink-0 p-3">
                    <button
                      class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                      @click="close(notification.id)"
                    >
                      <span class="sr-only">Close</span>
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Notification>
          </div>
        </div>
      </NotificationGroup>
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <NotificationGroup group="error" position="bottom">
        <div class="pointer-events-none fixed inset-0 flex items-start justify-end p-6 px-4 py-6">
          <div class="w-full max-w-sm">
            <Notification
              v-slot="{ notifications, close }"
              enter="transform ease-out duration-300 transition"
              enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
              enter-to="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-500"
              leave-from="opacity-100"
              leave-to="opacity-0"
              move="transition duration-500"
              move-delay="delay-300"
            >
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="mx-auto mt-4 flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md"
              >
                <div class="flex w-12 shrink-0 items-center justify-center bg-red-500">
                  <svg
                    class="h-6 w-6 fill-current text-white"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
                    />
                  </svg>
                </div>
                <div class="flex-1 py-3">
                  <div class="mx-3">
                    <span class="font-semibold text-red-500">{{ notification.title }}</span>
                    <p class="text-sm text-gray-600">{{ notification.text }}</p>
                  </div>
                </div>
                <div class="flex shrink-0 p-3">
                  <button
                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    @click="close(notification.id)"
                  >
                    <span class="sr-only">Close</span>
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </Notification>
          </div>
        </div>
      </NotificationGroup>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(136, 136, 136, 0.863);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
/* mode: out-in */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.moveUp-enter-active {
  animation: fadeIn 0.25s ease-in;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.moveUp-leave-active {
  animation: moveUp 0.25s ease-in;
}

@keyframes moveUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-400px);
  }
}

/* mode: out-in */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
