const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        filename: `${page.name}.html`,
      }));
    });
  }

  return webpackConfig;
};
let webpackConfig = {
  devtool: 'source-map',
  entry: {
  },
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath,
    publicPath: '/',
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
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
          { loader: 'style-loader' },
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
  ]
};

module.exports = genPageConfig(webpackConfig, pageConfig);