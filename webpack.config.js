const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/scripts/index.js',
  target: 'es5',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              "options": {
                "exclude": [
                  /node_modules[/]core-js/,
                  /node_modules[/]webpack[/]buildin/,
                ],
                "presets": [
                  "@babel/preset-env"
                ]
              }
            }
          },
      {
        test: /\.css$/i,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                },
              },
            "postcss-loader"
        ],
      },{
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
                esModule: false
            }
          },
        ],
      },
    ],
  },
  plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin()
    ],
};