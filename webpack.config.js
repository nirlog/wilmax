const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    entry: {
      index: './src/pages/index.js',
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash].js',
          publicPath: ''
    },

    mode: 'development',
    
    devServer: {
        static: {
        directory: path.resolve(__dirname, './dist'),
        },
        compress: true,
        port: 8081,
        open: true
    },

    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                filename: 'fonts/[name][ext]',
            }
            },
            {
                test: /\.css$/,
                generator: {
                    filename: 'css/[name].[hash][ext]',
                },

                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },
        ]
    },

    plugins: [
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        // }),
        new HtmlWebpackPlugin({
          inject: true,
          minify: false,
          template: './src/index.html',
          filename: 'index.html',
          chunks: ["index"],
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ]
}