const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        //bootstrap: 'bootstrap-loader?configFilePath=./.bootstraprc',
        client: './index.js'
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "bundle-[name].js"
    },

    context: __dirname + "/source",
    resolve: {
        modules: [
            path.resolve(__dirname, "source/blocks"),
            'node_modules',
            path.resolve(__dirname, "source/images")
        ]
    },

    module: {
        rules : [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader : "css-loader",
                            options : {
                                minimize: true
                            }
                        },
                        {
                            loader : "postcss-loader",
                            options : {
                                sourceMap: false
                            }
                        },
                        {
                            loader : "less-loader",
                            options : {
                                paths : [
                                    path.resolve(__dirname, "source/blocks"),
                                    path.resolve(__dirname, "source/less")
                                ],
                                sourceMap: false
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?minimize=true"
                })
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader : 'babel-loader',
                    options : {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(png|jpeg|jpg|svg)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]

    },

    plugins: [
        new ExtractTextPlugin({
            filename: "bundle-[name].css"
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject : false
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery":"jquery"
        }),
        new  webpack.optimize.UglifyJsPlugin()
        
       /* new CopyWebpackPlugin([
            {
                from : "file-loader?name=images/[name].[ext]!./images",
                to : path.join(__dirname, '/build/images')
            }
        ])*/
    ],

    devServer: {
        contentBase: path.join(__dirname, "./source"),
        compress: true,
        port: 3333,
    }
};

