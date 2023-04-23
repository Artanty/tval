const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlInjectRaw = require('./webpack-html-inject-raw-plugin.js')
 
var config = {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@lib': path.resolve(__dirname, 'src/lib/')
    }
  },
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
      },
      {
        test: /\.ts?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ESLintPlugin(
      { extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'] }
    ),
  ]
};

var exampleConfig = Object.assign({}, config, {
  entry: [
    path.resolve(__dirname, 'src', 'examples', 'examples.js'),
    path.resolve(__dirname, 'src', 'examples', 'examples.css')
  ],
  output: {
    path: path.resolve(__dirname, 'dev'),
    clean: true,
    publicPath: '/',
    filename: () => { 
      return '[name].[contenthash].js'
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: () => {
        return '[name].[contenthash].css'
      }
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/assets/favicon.png'),
      publicPath: '/',
      outputPath: path.resolve(__dirname, 'dev'),
      prefix: './',
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/examples', 'index.hbs'),
      title: 'Tval example',
      filename: 'index.html', 
      inject: true,
      minify: false,
      scriptLoading: 'defer',
    }),
    new HtmlInjectRaw({ content: '<script defer src="../tval.js"></script>' }),
  ],
  devServer: {
    port: 7841,
    historyApiFallback: { index: '/index.html' },
    watchFiles: ['src/**/*']
  }
});

var libConfig = Object.assign({}, config,{
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    publicPath: '',
    filename: 'tval.js',
    library: 'tval',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self === \'undefined\' ? this : self'
  }
})

module.exports = [
  exampleConfig, libConfig,       
];