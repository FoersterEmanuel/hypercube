const path = require( 'path' );
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        historyApiFallback:true
    },
    entry: path.join( __dirname, 'src', 'index.tsx' ),
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: path.join( __dirname, 'src', 'index.html' ),
                filename: 'index.html'
            }
        )
    ],
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'bundle.js'
    }
};