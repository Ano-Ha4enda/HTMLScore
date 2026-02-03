module.exports = {
    publicPath: "./",
    assetsDir: "",
    outputDir: "docs",
    configureWebpack: {
        resolve: {
            alias: {
                vue: '@vue/compat'
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias.set('vue', '@vue/compat')
    }
};