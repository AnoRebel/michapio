import fs from "fs";
import { fileURLToPath } from "url";

const locales = fs.readdirSync("locales").map(file => {
  return { code: file.replace(".json", ""), file };
});

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Michapio",
      titleTemplate: "%s - Michapio",
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  router: {
    options: {
      linkActiveClass: "active",
    },
  },
  vite: {
    optimizeDeps: {
      include: ["@headlessui/vue", "@heroicons/vue/solid", "@heroicons/vue/outline", "vue"],
    },
  },
  buildModules: ["@pinia/nuxt"],
  modules: [
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxt/image-edge",
    "nuxt-lodash",
    [
      "@nuxtjs/i18n",
      {
        locales,
        defaultLocale: "en",
        langDir: "locales", // set the `locales` directory at source directory of your Nuxt application
        vueI18n: {
          locale: process.env.NUXT_PUBLIC_APP_LOCALE || "en",
          fallbackLocale: process.env.NUXT_PUBLIC_APP_FALLBACK_LOCALE || "en",
        },
      },
    ],
    "@vueuse/nuxt",
    "@nuxtjs/eslint-module",
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
  css: ["animate.css/animate.min.css", "v3-infinite-loading/lib/style.css", "@/assets/main.scss"],
  // image: {
  //   dir: "assets/images", // "static" // default
  // },
  vueuse: {
    ssrHandlers: true,
  },
  colorMode: {
    classSuffix: "",
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
  alias: {
    server: fileURLToPath(new URL("./server", import.meta.url)),
    models: fileURLToPath(new URL("./server/models", import.meta.url)),
  },
  // runtimeConfig: {},
  typescript: {
    shim: false,
    strict: false,
    tsConfig: {
      compilerOptions: {
        types: ["@vueuse/nuxt", "@nuxtjs/i18n", "@pinia/nuxt", "@intlify/nuxt3"],
      },
      include: ["server/**/*.{ts,js}", "src/**/*.{ts,js}", "src/**/*.d.ts", "src/**/*.vue"],
    },
  },
});
