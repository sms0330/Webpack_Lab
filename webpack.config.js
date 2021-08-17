const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  // This is an array of entry points
  //   entry: ["./src/index.js", "./src/users.js"],

  //   This is single entry point
  entry: {
    // Create a bundle "./dist/client.js" (named after the key)
    client: './src/client.js',
    // Create a bundle "./dist/defaults.js" (named after the key)
    defaults: './src/defaults.js',
    server: './src/defaults.js',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack Demo",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
};

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  if (isProduction) config.module.rules[0].options.name = "[contenthash].[ext]";

  console.log("is production", isProduction);

  config.devtool = isProduction ? "eval" : "source-map";
  return config;
};
