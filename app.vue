<script setup lang="ts">
const { $pinia } = useNuxtApp();

const piniaLogger = ({ store }) => {
  store.$subscribe((mutation, state) => {
    const mut = `{"store": ${mutation.storeId}, "type": ${mutation.type}, "payload": ${mutation.payload}}`;

    console.info(JSON.parse(JSON.stringify(mut)));
  });
  store.$onAction(action => {
    const act = `{"store": ${action.store.$id}, "action": ${action.name}, "payload": ${action.args}}`;

    console.info(JSON.parse(JSON.stringify(act)));
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
  <div id="app" class="min-h-screen min-w-screen relative">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
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
