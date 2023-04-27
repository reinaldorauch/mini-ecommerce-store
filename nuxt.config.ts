// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@element-plus/nuxt",
  ],
  css: ["element-plus/dist/index.css"],
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3000",
    },
  },
});
