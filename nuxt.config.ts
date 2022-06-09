import { defineNuxtConfig } from "nuxt";
import eslintPlugin from "vite-plugin-eslint";
import fs from "fs";

const locales = fs.readdirSync("locales").map(file => {
  return { code: file.replace(".json", ""), file: file };
});

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [eslintPlugin()],
    optimizeDeps: {
      include: ["@headlessui/vue", "@heroicons/vue/solid", "@heroicons/vue/outline", "vue"],
    },
  },
  modules: ["@nuxtjs/color-mode", "@pinia/nuxt", "@vueuse/nuxt", "@nuxtjs/eslint-module", [
      "@nuxtjs/i18n",
      {
        locales: locales,
        defaultLocale: "en",
        langDir: "locales", // set the `locales` directory at source directory of your Nuxt application
        vueI18n: {
          locale: process.env.VUE_APP_I18N_LOCALE || "en",
          fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
        },
      },
    ], "@vueuse/motion/nuxt"],
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
      'pop-bottom': {
        initial: {
          scale: 0,
          opacity: 0,
          y: 100
        },
        visible: {
          scale: 1,
          opacity: 1,
          y: 0
        },
      }
    }
  },
  publicRuntimeconfig: {},
  privteRuntimeConfig: {},
  typescript: {
    shim: false,
  },
});
