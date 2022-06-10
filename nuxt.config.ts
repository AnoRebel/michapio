import { defineNuxtConfig } from "nuxt";
import fs from "fs";

const locales = fs.readdirSync("locales").map(file => {
  return { code: file.replace(".json", ""), file: file };
});

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: "Michapio",
  },
  vite: {
    optimizeDeps: {
      include: ["@headlessui/vue", "@heroicons/vue/solid", "@heroicons/vue/outline", "vue"],
    },
  },
  modules: [
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/eslint-module",
    [
      "@nuxtjs/i18n",
      {
        locales: locales,
        defaultLocale: "en",
        langDir: "locales", // set the `locales` directory at source directory of your Nuxt application
        vueI18n: {
          locale: process.env.NUXT_PUBLIC_APP_LOCALE || "en",
          fallbackLocale: process.env.NUXT_PUBLIC_APP_FALLBACK_LOCALE || "en",
        },
      },
    ],
    "@vueuse/motion/nuxt",
  ],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    transpile: ["@headlessui/vue", "@heroicons/vue"],
  },
  css: ["@/assets/main.scss"],
  vueuse: {
    ssrHandlers: true,
  },
  colorMode: {
    classSuffix: "",
  },
  // Configure your animations
  motions: {
    directives: {
      "pop-bottom": {
        initial: {
          scale: 0,
          opacity: 0,
          y: 100,
        },
        visible: {
          scale: 1,
          opacity: 1,
          y: 0,
        },
      },
    },
  },
  publicRuntimeconfig: {
    BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
    BASE_API_URL: process.env.NUXT_PUBLIC_BASE_API_URL,
  },
  privateRuntimeConfig: {
    DATABASE_NAME: process.env.NUXT_DATABASE_NAME,
    DATABASE_USER: process.env.NUXT_DATABASE_USER,
    DATABASE_PASS: process.env.NUXT_DATABASE_PASS,
    DATABASE_HOST: process.env.NUXT_DATABASE_HOST,
    DATABASE_PORT: process.env.NUXT_DATABASE_PORT,
    DATABASE_URL: process.env.NUXT_DATABASE_URL,
    JWT_SECRET: process.env.NUXT_JWT_SECRET,
  },
  // runtimeConfig: {},
  typescript: {
    shim: false,
  },
});
