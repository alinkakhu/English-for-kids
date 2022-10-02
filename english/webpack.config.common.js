const path = require('path');
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: '[name].[contenthash].js',
    },
    devServer: {
      static: './dist',
    },
    module: {
      rules: [
        // {
        //   test: /\.css$/,
        //   use: ['style-loader','css-loader']
        // },
        {
          test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'webfonts',
              publicPath: '../webfonts',
            },
          }
        }
      ],
    },
    resolve: {
      roots: [path.resolve(__dirname, "src/")],
    },
    plugins: [
      new ESLintPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve("./src/index.html"),
      }),
    ],
  }