const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const buildPath = path.resolve(__dirname, 'dist');

const pageConfig = require('./page.config.js');

const genPageConfig = (webpackConfig = {}, pageConfig) => {
  if (pageConfig && Array.isArray(pageConfig)) {
    pageConfig.map(page => {
      webpackConfig.entry[page.name] = `./src/pages/${page.js}`;
      webpackConfig.plugins.push(new HtmlWebpackPlugin({
        template: `./src/pages/${page.html}`,
        inject: true,
        chunks: [page.name],
        filename: `${page.name}.html`
      }));
    });
  }

  return webpackConfig;
};
let webpackConfig = {
  entry: {
  },
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
};

module.exports = genPageConfig(webpackConfig, pageConfig);