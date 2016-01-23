module.exports = {
  entry: "./app-client.jsx",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|app-server.js)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
};
