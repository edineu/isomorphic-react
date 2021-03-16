import webpack from "webpack";
import path from "path";

/** 1rs define you entry points */
export default {
  /** list of file thta will be uploaded outomatic -- hot-reload */
  entry: [
    "webpack-hot-middleware/client?reload=true",
    "babel-regenerator-runtime",
    path.resolve(__dirname, "src/"),
  ],
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    /** update in real time */
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: "development",
        WEBPACK: true,
      },
    }),
  ],
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".sass"],
  },
  /** Get more info https://webpack.js.org/concepts/loaders/ */
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: [{ loader: "babel-loader" }],
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: "style-loader" },
          // [css-loader](/loaders/css-loader)
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: "sass-loader" },
        ],
      },
    ],
  },
};
