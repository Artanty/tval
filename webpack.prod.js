const path = require('path')

module.exports = {
  mode: 'production',
  target: 'browserslist',
  devtool: false,
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', {
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        }]
      },
      {
        test: /\.ts?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@lib': path.resolve(__dirname, 'src/lib/')
    }
  },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: false,
    publicPath: '',
    filename: 'tval.js',
    library: 'tval',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self === \'undefined\' ? this : self'
  },
  optimization: {
    minimize: true,
  },
  performance: { 
    hints: false
  }
}
