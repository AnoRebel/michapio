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
      include: ["@headlessui/vue", "vue"],
    },
  },
  modules: [
    "nuxt-typed-router",
    "@nuxtjs/robots",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-headlessui",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxt/image-edge",
    "nuxt-lodash",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "nuxt-turnstile",
    "@nuxtjs/eslint-module",
    "@nuxtjs/supabase",
    "nuxt-security",
  ],
  build: {
    extractCSS: true,
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    transpile: ["@heroicons/vue"],
  },
  css: ["animate.css/animate.min.css", "v3-infinite-loading/lib/style.css", "@/assets/main.scss"],
  telemetry: false,
  // image: {
  //   dir: "assets/images", // "static" // default
  // },
  i18n: {
    lazy: true,
    locales,
    defaultLocale: "en",
    langDir: "locales", // set the `locales` directory at source directory of your Nuxt application
    vueI18n: {
      locale: process.env.NUXT_PUBLIC_APP_LOCALE || "en",
      fallbackLocale: process.env.NUXT_PUBLIC_APP_FALLBACK_LOCALE || "en",
    },
  },
  tailwindcss: {
    cssPath: "~/assets/main.scss",
  },
  vueuse: {
    ssrHandlers: true,
  },
  image: {
    domains: ["dicebear.com", "avatar.dicebear.com"],
    providers: {
      dicebear: {
        name: "dicebear", // optional value to overrider provider name
        provider: "~/providers/dicebear", // Path to custom provider
        options: {
          // ... provider options
        },
      },
    },
  },
  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || "",
  },
  lodash: {
    prefix: "_",
  },
  colorMode: {
    classSuffix: "",
    preference: "system", // default value of $colorMode.preference
    fallback: "dark",
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
      BASE_API_URL: process.env.NUXT_PUBLIC_BASE_API_URL,
    },
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || "",
    },
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
  experimental: {
    componentIslands: true,
  },
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
