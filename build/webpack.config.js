const config = {
  entry: ['babel-polyfill', './src/index.tsx'],
  output: {
    filename: 'app.bundle.js',
    path: '/public',
    publicPath: '/assets'
  },
  devtool: 'source-map',
  watch: true,
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'babel-loader!ts-loader'
      }, {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      }, {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'tslint-loader'
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      }
    ]
  }
}

module.exports = config
