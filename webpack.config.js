const path = require('path');
const webpack = require('webpack');
// https://webpack.docschina.org/guides/output-management/#setting-up-htmlwebpackplugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    devtool: 'source-map',
    resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/dist/',
        filename: '[name].js',
        clean: true,
    },
    // https://webpack.docschina.org/guides/development/#using-webpack-dev-server
    devServer: {
        devMiddleware: {
            // https://github.com/webpack/webpack-dev-middleware#publicpath
            publicPath: '/'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: ['babel-loader', 'ts-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /[\\/]node_modules[\\/]/,
                loader: 'babel-loader',
            },
            // https://webpack.docschina.org/loaders/sass-loader/
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            publicPath: './',
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        })
    ],
    optimization: {
        minimize: false,
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    chunks: 'all',
                    priority: -20,
                    test: /[\\/]node_modules[\\/]/,
                    name(module, chunks) {
                        const moduleFileName = module
                            .identifier()
                            .split('/')
                            .reduceRight((item) => item)
                            .replace(/\.js$/, '');
                        const allChunksNames = chunks.map((item) => item.name).join('~');
                        return `vendors~${moduleFileName}`;
                    },
                    filename: '[name].js'
                },
            },
        },
    },
};
