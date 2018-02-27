var path = require('path');
const webpack = require('webpack');
const glob = require('glob');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const autoprefixer = require('autoprefixer');
// const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
console.log(process.env.NODE_ENV);
console.log('============================start===============================');

function resolve(dir) {
    return path.resolve(__dirname, dir);
}
console.log('__dirname', __dirname);
console.log('current pwd', resolve('..'));
console.log('dist', resolve('../dist'));
module.exports = {
    context: resolve('..'),
    entry: {
        common: ['vue', 'vue-router', 'vuex', 'vue-resource'],
        app: './src/main.js'
    },
    output: {
        path: resolve('../dist'),
        filename: 'static/js/[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        contentBase: resolve('../dist'),
        port: '8080',
        openPage: 'index.html',
        open: true,
        proxy: {
            '/v1': {
                target: 'http://dev-ksp.qyvideo.net/',
                changeOrigin: true
            }
        }
    },

    module: {
        rules: [
            // {
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     exclude: [new RegExp(`node_modules\\${path.sep}(?!pcadmin-.*)`)],
            //     // include: '/client/',
            //     options: {
            //         formatter: require('eslint-friendly-formatter')
            //     }
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(swf|png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 100,
                            outputPath: 'static/assets/'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: true,
                            gifsicle: {
                                interlaced: false
                            },
                            mozjpeg: {
                                progressive: true,
                                arithmetic: false
                            },
                            optipng: false,
                            pngquant: {
                                floyd: 0.5,
                                speed: 2
                            },
                            svgo: {
                                plugins: [
                                    { removeTitle: true },
                                    { convertPathData: false }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: 'static/assets/'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: 'static/assets/'
                }
            },
            {
                test: /\.md$/,
                use: [{
                        loader: 'html-loader'
                    },
                    {
                        loader: 'markdown-loader'
                    }
                ]
            },
            {
                test: /\.code$/,
                use: [{
                    loader: 'html-loader'
                }]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '../')
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            chunks: ['common', 'app']
        }),
        new ExtractTextPlugin({
            filename: 'static/css/[name].[hash:5].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common']
        }),
        new FriendlyErrorsPlugin()
    ]
};