const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader','css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ['css-loader', 'sass-loader'],
    publicPath: './'
});
var cssConfig = isProd ? cssProd :cssDev;

const config = {
    cache: true,
    // entry: './src/app.js',
    entry: {
       bundle: './src/app.js',
       vendor: [
           './node_modules/jquery/dist/jquery.min.js',
           './node_modules/gsap/src/minified/TweenMax.min.js',
           './node_modules/fullpage.js/dist/jquery.fullpage.min.js'
        //    './node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
        //    './node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
        //    './node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'

        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js'
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    "file-loader?name=images/[name].[ext]",
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    }
                ]
            },
            // {
            //     test: /\.(ttf|eot|woff|woff2)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: 'fonts/[name].[ext]',
            //     },
            // },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'imports-loader?define=>false'},
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // minify:{
            //     collapseWhitespace : true
            // },
            hash: false,
            template: './src/index.html',
        }),
        new ExtractTextPlugin({
            filename: "styles.css",
            disable: !isProd,
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}
if (isProd) {
    config.plugins.push(
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
        new UglifyJSPlugin()
    );
} else {
    config.devServer = {
        contentBase: path.join(__dirname,"dist"),
        // compress: true,
        hot: true,
        stats: "errors-only",
        open: true,
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    )
}

module.exports = config;