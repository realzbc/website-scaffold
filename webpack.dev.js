const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  devtool: 'source-map',
  entry: {
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
    ]
  },
  plugins: [
  ]
};

module.exports = genPageConfig(webpackConfig, pageConfig);