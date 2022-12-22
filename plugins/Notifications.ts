import Notifications, { notify } from "notiwind";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Notifications);
  return {
    provide: { notify },
  };
});
