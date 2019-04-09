const GasPlugin = require("gas-webpack-plugin");
module.exports = {
  context: __dirname,
  entry: "./main.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  output: {
    path: __dirname + '/build',
    filename: 'Code.gs'
  },
  plugins: [
    new GasPlugin()
  ]
}
