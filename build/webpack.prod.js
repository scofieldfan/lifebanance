const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const BaseConfig = require('./webpack.base.js');

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

const entrys = glob.sync('./client/pages/**/index.js');
const entryConfig = {};
const htmls = entrys.map(function (item) {
    const paths = item.split('/');
    const name = paths[3] || '';
    entryConfig[name] = item;
    const chunks = ['common', 'loader', name];
    return new HtmlWebpackPlugin({
        filename: './view/hawk/index/' + name + '.html',
        title: 'AI图像安全监控平台',
        template: './view/index.html',
        inject: true,
        chunks: chunks
    });
});

module.exports = merge(BaseConfig, {
    devtool: '#source-map',
    output: {
        filename: 'static/hawk/js/[name]-[chunkHash:5].js',
        path: resolve('dist'),
        publicPath: '/'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        })
    ].concat(htmls)
});
