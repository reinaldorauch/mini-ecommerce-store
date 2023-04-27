// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3000",
    },
  },
});
