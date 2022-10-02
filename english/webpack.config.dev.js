const merge = require('webpack-merge')
const commonConfig = require('./webpack.config.common')

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
  ]
})

// module.exports = {
//     mode: "development",
//     entry: './src/index.js',
//     output: {
//         path: path.resolve(__dirname, 'build'),
//         filename: 'my-bundle.js',
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: ['style-loader','css-loader']
//             },
//              {
//         test: /\.m?js$/,
//         exclude: /node_modules/,
//         use: ['babel-loader']
//         },
//               {
//             test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//             include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
//             use: {
//                 loader: 'file-loader',
//                 options: {
//                     name: '[name].[ext]',
//                     outputPath: 'webfonts',
//                     publicPath: '../webfonts',
//                 },
//             }
//         },
//         {
//             test: /\.(jpe?g|png|gif|svg)$/i,
//             use: [
//               'url-loader?limit=10000',
//               'img-loader'
//             ]
//           }
//         ],
//     },
//     plugins: [
//         new ESLintPlugin(),
//     new HtmlWebpackPlugin({
//       inject: true,
//       template: path.resolve("./src/index.html"),
//     }),
//   ],
// }
