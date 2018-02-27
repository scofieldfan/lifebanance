const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const BaseConfig = require('./webpack.base.js');
module.exports = merge(BaseConfig, {
    devtool: '#source-map'
});