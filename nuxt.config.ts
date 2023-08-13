// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "The Eras Tour Guide",
      meta: [
        { name: "description", content: "The Eras Tour Guide is a fan made site for other swifties to share information relating to Taylor Swift's The Eras Tour" },
        { name: 'keywords', content: "Taylor Swift, The Eras Tour, Eras Tour, Swiftie, Chants, Eras Tour Chants, Eras Tour Dates, Eras Tour Set List, Eras Tour Bracelets, Taylor's Version, Fan made, Eras Tour USA, Eras Tour Canada, Eras Tour Australia, Eras Tour International Dates, Eras Tour US Dates, Eras Tour France, Eras Tour Mexico, Eras Tour Argentina, Eras Tour Brazil, Eras Tour Japan, Eras Tour Singapore, Eras Tour Sweden, Eras Tour Portugual, Eras Tour Spain, Eras Tour Scotland, Eras Tour Wales, Eras Tour UK, Eras Tour Europe, Eras Tour England, Eras Tour Ireland, Eras Tour Netherlands, Eras Tour Switzerland, Eras Tour Germany, Eras Tour Italy, Eras Tour Poland, Eras Tour Asia" },
        { name: 'author', content: 'Elise'},
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
