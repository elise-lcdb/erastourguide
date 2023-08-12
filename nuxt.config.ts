// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "The Eras Tour Guide",
      meta: [
        { name: "description", content: "The Eras Tour Guide is a fan made site for other swifties to share information relating to Taylor Swift's The Eras Tour" },
        {
          hid: "og:title",
          name: "title",
          property: "og:title",
          content: "The Eras Tour Guide",
        },
        {
          hid: "og:description",
          name: "description",
          property: "og:description",
          content: "The Eras Tour Guide",
        },
        {
          hid: "og:image",
          name: "image",
          property: "og:image",
          content: "/logo.png",
        }],
      link: [{ rel: "icon", type: "image/png", href: "/logo.png" }, { rel: "apple-touch-icon", type: "image/png", href: "/logo.png" }],
    },
  },
  ssr: false,
  devtools: { enabled: false },
  build: {
    loaders: {
      sass: {
        implementation: require("sass"),
      },
      scss: {
        implementation: require("sass"),
      },
    },
  },
  css: ["@/assets/main.scss"],
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    strategy: "prefix_except_default",
    langDir: 'locales',
    locales: [{
      code: 'en-US',
      iso: 'en-US',
      name: 'English (US)',
      file: 'en-US.json'
    },
      {
      code: 'fr-Fr',
      iso: 'fr-FR',
      name: 'Français',
      file: 'fr-FR.json'

    },
    {
      code: 'es-ES',
      iso: 'es-ES',
      name: 'Español',
      file: 'es-ES.json'

    }],
    defaultLocale: "en-US",
    // detectBrowserLanguage: {
    //   useCookie: false
    // },
  },
  
})
