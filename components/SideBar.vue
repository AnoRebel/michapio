<script setup lang="ts">
import { ChatBubbleLeftEllipsisIcon, PlusSmallIcon } from "@heroicons/vue/24/solid";
const whoToFollow = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
const trendingPosts = [
  {
    id: 1,
    user: {
      name: "Floyd Miles",
      imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    body: "What books do you have on your bookshelf just to look smarter than you actually are?",
    comments: 291,
  },
];
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="sticky top-4 space-y-6">
      <section class="h-1/2" aria-labelledby="trending-heading">
        <div class="bg-slate-50 rounded-lg shadow">
          <div class="p-6">
            <h2 id="trending-heading" class="text-base font-medium text-slate-900">Trending</h2>
            <div class="mt-6 flow-root">
              <ul role="list" class="-my-4 divide-y divide-slate-200">
                <li v-for="post in trendingPosts" :key="post.id" class="flex py-4 space-x-3">
                  <div class="flex-shrink-0">
                    <img
                      class="h-8 w-8 rounded-full"
                      :src="post.user.imageUrl"
                      :alt="post.user.name"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm text-slate-800">{{ post.body }}</p>
                    <div class="mt-2 flex">
                      <span class="inline-flex items-center text-sm">
                        <button
                          type="button"
                          class="inline-flex space-x-2 text-slate-400 hover:text-slate-500"
                        >
                          <ChatBubbleLeftEllipsisIcon class="h-5 w-5" aria-hidden="true" />
                          <span class="font-medium text-slate-900">{{ post.comments }}</span>
                        </button>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="mt-6">
              <a
                href="#"
                class="w-full block text-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-slate-50 hover:bg-slate-100"
              >
                View all
              </a>
            </div>
          </div>
        </div>
      </section>
      <section class="h-1/2" aria-labelledby="who-to-follow-heading">
        <div class="bg-slate-50 rounded-lg shadow">
          <div class="p-6">
            <h2 id="who-to-follow-heading" class="text-base font-medium text-slate-900">
              Who to follow
            </h2>
            <div class="mt-6 flow-root">
              <ul role="list" class="-my-4 divide-y divide-slate-200">
                <li
                  v-for="user in whoToFollow"
                  :key="user.handle"
                  class="flex items-center py-4 space-x-3"
                >
                  <div class="flex-shrink-0">
                    <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-slate-900">
                      <a :href="user.href">{{ user.name }}</a>
                    </p>
                    <p class="text-sm text-slate-500">
                      <a :href="user.href">{{ "@" + user.handle }}</a>
                    </p>
                  </div>
                  <div class="flex-shrink-0">
                    <button
                      type="button"
                      class="inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100"
                    >
                      <PlusSmallIcon
                        class="-ml-1 mr-0.5 h-5 w-5 text-rose-400"
                        aria-hidden="true"
                      />
                      <span> Follow </span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            <div class="mt-6">
              <a
                href="#"
                class="w-full block text-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-slate-50 hover:bg-slate-100"
              >
                View all
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- <div class="h-1/2 w-full flex flex-col"> -->
    <!--   <div class="w-full text-underline">Recent Michapio</div> -->
    <!--   <div class="w-full flex"> -->
    <!--     <transition-group tag="ul" name="side-list" class="w-full"> -->
    <!--       <li class="w-full"> -->
    <!--         <div class="w-full rounded-md shadow-md h-20 m-2 bg-slate-500 cursor-pointer">1</div> -->
    <!--       </li> -->
    <!--       <li class="w-full"> -->
    <!--         <div class="w-full rounded-md shadow-md h-20 m-2 bg-slate-500 cursor-pointer">2</div> -->
    <!--       </li> -->
    <!--     </transition-group> -->
    <!--   </div> -->
    <!-- </div> -->
    <!-- <div class="h-1/2 w-full flex flex-col"> -->
    <!--   <div class="w-full text-underline">Most Viewed</div> -->
    <!--   <div class="w-full flex"> -->
    <!--     <transition-group tag="ul" name="side-list" class="w-full"> -->
    <!--       <li class="w-full"> -->
    <!--         <div class="w-full rounded-md shadow-md h-20 m-2 bg-slate-500 cursor-pointer">1</div> -->
    <!--       </li> -->
    <!--       <li class="w-full"> -->
    <!--         <div class="w-full rounded-md shadow-md h-20 m-2 bg-slate-500 cursor-pointer">2</div> -->
    <!--       </li> -->
    <!--     </transition-group> -->
    <!--   </div> -->
    <!-- </div> -->
  </div>
</template>

<style scoped lang="scss">
.side-list-enter-active,
.side-list-leave-active {
  transition: all 1s ease;
}

.side-list-enter-from,
.side-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
