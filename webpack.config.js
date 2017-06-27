var path = require("path");
module.exports = {
  entry: './src/viewability.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'viewability.dist.js'
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",

        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "src"),
        ],
        // Options to configure babel with
        query: {
          presets: ['es2015'],
        }
      },
    ]
  }
}