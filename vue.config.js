module.exports = {
  // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "落絮"
      return args
    })
  },
  pwa: {
    themeColor: "#ffffff",
    msTileColor: "#ffffff",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "white",
  },

}
