const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development"; // Dev Env

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index", //startup file for app
  output: {
    //webpack does not output code in dev mode, it merly puts it in memory
    path: path.resolve(__dirname, "build"), // it not going to write a file to build, but in memory it will be serving from this dir
    publicPath: "/", // specifies the public url of the output dir when it's  referenced in the browser
    filename: "bundle.js", //also physical file would not be generated but required for webpack for html to reference the bundle that's being served from memory
  },
  devServer: {
    stats: "minimal", //minimises the info/noise written to the cmd
    overlay: true, //overlays errors in browser
    historyApiFallback: true, //requestes will be directed to index.html => can load deep links to all be handled by react-router
    //following 3 lined to fix a webpack bug with latest version of chrome: check whether webpack bug is resolved later to remove this
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html", //where to find the plugin
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    //tell webpack which files to handle
    rules: [
      {
        test: /\.(js|jsx)$/, // handle all files ending .js and .jsx
        exclude: /node_modules/, //files to ignore
        use: ["babel-loader"], // run babel on all specified files above to compile before bundling them
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
