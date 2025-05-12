const mode = process.env.NODE_ENV || 'development';

const path = require('path')

const devMode = mode === 'development';

const target = devMode ? 'web' : 'browserslist';

const devtool = devMode ? 'source-map' : undefined;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { LoaderOptionsPlugin } = require('webpack');

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        port: 3000,
        open: true,
        hot: true
    },
    entry : ["@babel/polyfill", path.resolve(__dirname, 'src', 'index.js')],
    output : {
        path : path.resolve(__dirname, 'dist'),
        clean : true,
        filename : 'index.[contenthash].js',
        assetModuleFilename: 'assets/[name]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'index.[contenthash].css'
        })

    ],
    module: {
        rules : [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                   devMode ? "style-loader": MiniCssExtractPlugin.loader, 
                   "css-loader",
                   {
                    loader: 'postcss-loader',
                    options : {
                        postcssOptions: {
                            config: path.resolve(__dirname, 'postcss.config.js')
                        }
                    }
                   },
                   'sass-loader'
                ],
            },
            {
                test: /\.woff2/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                }
            },
            {
                test: /\.(jpe?g|png|webp|gif|svg)/i,
                type: 'asset/resource',
            },
            {
                test: /\.(?:js|mjs|cjs)$/i,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    targets: "defaults",
                    presets: [
                      ['@babel/preset-env']
                    ]
                  }
                }
              }
        ]
    }
}