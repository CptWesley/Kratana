const appName = 'Kratana';
const appVersion = require('./package.json').version;

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getArgument = (arg) => {
    const argument = process.argv.find(a => a.startsWith(`--${arg}=`));
    if (argument !== undefined) {
        return argument.split('=', 2)[1];
    }
    return undefined;
}

const isProduction = getArgument('mode') == 'production';

const cssLoaderConfig = {
    minimize: true,
    modules: true,
    camelCase: 'only',
    localIdentName: isProduction ? '[hash:base64:10]' : '[name]--[local]--[hash:base64:5]',
}

/** @type {HtmlWebpackPlugin.Options} */
const htmlWebpackPluginConfig = {
    template: 'src/index.ejs',
    templateParameters: {
        KRATANA_NAME: appName,
        KRATANA_VERSION: appVersion,
    },
};

module.exports = {
    entry: './src/kratana.ts',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProduction ? 'kratana.[chunkhash].js' : 'kratana.js',
        publicPath: '/',
    },

    devtool: isProduction ? undefined : 'source-map',
    devServer: {
        historyApiFallback: true,
        port: 3000,
    },
    performance: isProduction ? {
        maxEntrypointSize: 10E6, // 1 MB
    } : false,

    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
        ],
        alias: {
            "@": path.resolve(__dirname, 'src/frontend'),
        },
    },

    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
            },
            {
                test: /\.(s?css|sass)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: cssLoaderConfig,
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.svg$|\.png$|\.jpe?g$|\.gif$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name]-[hash:base64:5].[ext]',
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin(htmlWebpackPluginConfig),
    ],
}
