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
        favicon: './src/assets/images/favicon.ico',
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
    path: buildPath,
    publicPath: '/',
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
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: ['file-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]'],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }
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