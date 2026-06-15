import tailwindcss from "@tailwindcss/vite";
import data from "./data/data.json";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxtjs/sitemap", "@nuxtjs/robots"],

  site: {
    url: "http://localhost:3000",
    name: "SEO Tools",
  },

  nitro: {
    prerender: {
      routes: ["/", ...data.map((item: any) => `/tools/${item.slug}`)],
    },
  },

  sitemap: {
    urls: data.map((item: any) => ({
      loc: `/tools/${item.slug}`,
    })),
  },

  robots: {
    allow: "/",
    sitemap: "http://localhost:3000/sitemap.xml",
  },
});