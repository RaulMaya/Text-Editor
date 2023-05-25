const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./index.html",
    title: "Webpack Plugin",
  });

  const injectManifest = new InjectManifest({
    swSrc: "./src-sw.js",
    swDest: "src-sw.js",
  });

  const webPackPwaManifest = new WebpackPwaManifest({
    fingerprints: false,
    inject: true,
    name: "Just Another Text Editor",
    short_name: "JATE",
    description: "Keep track of important tasks!",
    background_color: "#7eb4e2",
    theme_color: "#7eb4e2",
    start_url: "./",
    publicPath: "./",
    icons: [
      {
        src: path.resolve("src/images/logo.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons"),
      },
    ],
  });

  const cssLoaderRule = {
    test: /\.css$/i,
    use: ["style-loader", "css-loader"],
  };

  const babelLoaderRule = {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: [
          "@babel/plugin-proposal-object-rest-spread",
          "@babel/transform-runtime",
        ],
      },
    },
  };

  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [htmlWebpackPlugin, injectManifest, webPackPwaManifest],
    module: {
      rules: [cssLoaderRule, babelLoaderRule],
    },
  };
};
