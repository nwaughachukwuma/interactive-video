// vue.config.js

export const VueConfig = {
    publicPath: process.env.BASE_URL || '/',
    configureWebpack: {
        performance: {
            hints: 'warning',
            maxAssetSize: 2048576,
            maxEntrypointSize: 2048576
        }
    },
    chainWebpack: config => {
        // your config
        config.module
            .rule('vtt')
            .use('file-loader')
            .loader('file-loader')
            .tap(options => {
            options['transformAssetUrls'] = {
                'track': 'src'
            }
            return options
            })
        // adjusting the media rule to include vtt files
        config.module
            .rule('media')
            .test(/\.(vtt|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    },
}