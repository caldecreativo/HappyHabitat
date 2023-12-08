const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    manifestPath: 'app.webmanifest',
    iconPath: {
      favicon16: null, 
      favicon32: 'logoIcon.png',
      appleTouchIcon: 'logoIcon.png',
      maskIcon: 'logoIcon.png',
      msTileImage: null,
    },
    manifestOptions: {
      name: "Happy Habitat",
      short_name: "Happy Habitat",
      display: "standalone",
      theme_color: "#0C1D3B",
      background_color: "#3A4D82",
      start_url: ".",
      scope: "./",
      orientation: "portrait",
      description: "Din personlige assistent til at skabe sunde vaner sammen!",
      icons: [
        {
        src: 'logoIcon.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'maskable_icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
      ],
      screenshots: [
        {
        src: 'screenshot.png',
        sizes: '320x568',
        type: 'image/png',
        form_factor: 'wide'
      }
      ]
    }
  }
})

