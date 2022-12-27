import mitt from "mitt";
const emitter = mitt();

export default defineNuxtPlugin(() => {
  return {
    provide: { emitter },
  };
});

declare module "#app" {
  interface NuxtApp {
    $emitter: typeof emitter;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $emitter: typeof emitter;
  }
}
