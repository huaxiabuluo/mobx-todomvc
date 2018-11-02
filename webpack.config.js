const path = require('path');
const CleanWebpackPlugin   = require('clean-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevEnv = !process.env.BUILD_DEST;

module.exports = {
    entry: {
        index: ['./src/boot-loader.js'],
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, './build')
    },
    mode: isDevEnv ? 'development' : 'production',
    resolve: {
        alias: {
            '@lib': path.resolve(__dirname, './src/lib'),
            '@module': path.resolve(__dirname, './src/module'),
            '@view': path.resolve(__dirname, './src/view'),
            '@components': path.resolve(__dirname, './src/components'),
        },
        extensions: ['.js', '.es6', '.json', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    isDevEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.less\.module$/,
                exclude: /node_modules/,
                use: [
                    isDevEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]___[hash:base64:5]',
                        },
                    },
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDevEnv ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDevEnv ? '[id].css' : '[id].[hash].css',
        }),
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './template.html'
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './html'),
        publicPath : '/static/',
        stats: { colors: true },
        historyApiFallback: true,
        disableHostCheck  : true,
        hot    : true,
        inline : true,
        port   : 8089,
    },
};
