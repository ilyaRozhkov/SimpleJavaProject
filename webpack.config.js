var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './src/main/webapp/js/App.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    watch: true,
    output: {
        path: __dirname,
        filename: './src/main/webapp/js/build/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties",
                                  "babel-plugin-react-css-modules"]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: ['src/main/webapp/html/*', 'src/main/webapp/css/*', 'src/main/webapp/js/*'],
            proxy: 'http://localhost:8090'
        },
        {
            reload: false
        })
    ]
};