const webpack = require('webpack');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');

const BaseConfig = require('./webpack.base.js');

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
        template: './view/test.html',
        inject: true,
        chunks: chunks
    });
});

module.exports = merge(BaseConfig, {

    devtool: '#source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('test')
            },
            passport: '"http://test.passport.qyvideo.net/"',
            MerchantId: '"GgRTo5iVjKm532Ro"',
            AppId: '"u3Xau6WRZRDum6T3"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        })
    ].concat(htmls)
});
