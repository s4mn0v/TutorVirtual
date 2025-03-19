// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Versiones de compatibilidad con el nuxt 3
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  // CSS Global
  css: ["~/assets/css/main.css"],
  // Modulos de funciones anadidas
  modules: ["@nuxt/ui", "@nuxtjs/supabase"],
  // Preferencia de color del sistema
  colorMode: {
    preference: "system",
  },
  // Importacion de componentes globales
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  supabase: {
    url: process.env.NUXT_SUPABASE_URL,
    key: process.env.NUXT_SUPABASE_KEY,
    redirect: false,
  },
});
