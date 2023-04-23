const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RawAssetPlugin = require('./webpack-raw-asset-plugin.js');
const HtmlInjectRaw = require('./webpack-html-inject-raw-plugin.js')
const { reassignPaths } = require('./webpack-helpers.js')
module.exports = {
  mode: 'production',
  target: 'browserslist',
  devtool: false,
  entry: { 
    server: {
      import: [
        path.resolve(__dirname, 'src', 'examples', 'examples.js'),
        path.resolve(__dirname, 'src', 'examples', 'examples.css')
      ]
    },
    local: {
      import: [
        path.resolve(__dirname, 'src', 'examples', 'examples.js'),
        path.resolve(__dirname, 'src', 'examples', 'examples.css')
      ]
    }
  },
  plugins: [ 
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/examples', 'index.hbs'),
      title: 'Tval in html on server',
      filename: 'examples/server/index.html', 
      inject: 'head',
      minify: false, 
      scriptLoading: 'defer',
      chunks: ['server'],
      templateParameters: (compilation, assets, assetTags, options) => {
        const reassignOptions = [
          { tagName: 'link', match: 'favicon.png', newPath: './favicon.png' }
        ]
        return reassignPaths(compilation, assets, assetTags, options, reassignOptions)
      }
    }),
    new RawAssetPlugin({
      module: 'server',
      asset: 'example.js',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/examples', 'index.hbs'),
      title: 'Tval with local html file',
      filename: 'examples/local/index.html', 
      inject: 'head',
      minify: false, 
      scriptLoading: 'defer',
      chunks: ['local'],
      templateParameters: (compilation, assets, assetTags, options) => {
        const reassignOptions = [
          { tagName: 'script', match: 'local__example.js', newPath: './local__example.js' },
          { tagName: 'link', match: 'style.css', newPath: 'style.css' }
        ]
        return reassignPaths(compilation, assets, assetTags, options, reassignOptions)
      }
    }),
    new RawAssetPlugin({
      module: 'local',
      asset: 'example.js',
    }),
    new HtmlInjectRaw({ entries: ['local', 'server'], content: '<script defer src="../../tval.js"></script>' }),
    new HtmlInjectRaw({ entries: ['local'], content: '<link rel="icon" href="favicon.png">' }),
    new HtmlInjectRaw({ entries: ['server'], content: '<link rel="icon" href="/examples/server/favicon.png">' }),
    new MiniCssExtractPlugin({
      filename: () => {
        return 'examples/[name]/style.css'
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favicon.png'),
          to: path.resolve(__dirname, 'dist/examples/local')
        },
        {
          from: path.resolve(__dirname, 'src/assets/favicon.png'),
          to: path.resolve(__dirname, 'dist/examples/server')
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: 'handlebars-loader'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: [ '.js' ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: false,
    publicPath: '/',
    filename: () => { 
      return 'examples/[name]/[name]__example.js'
    },
  },
  optimization: {
    minimize: false
  },
  performance: { 
    hints: false
  }
}
