import dayjs, { extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  extend(relativeTime);
  return { provide: { dayjs } };
});

declare module "#app" {
  interface NuxtApp {
    $dayjs: typeof dayjs;
  }
}
