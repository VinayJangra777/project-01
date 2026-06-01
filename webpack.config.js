const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // 1. Where the app starts
  entry: './src/index.js',

  // 2. Where the bundled code goes
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Cleans the dist folder before every build
  },

  // 3. Rules for processing different files
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Uses the .babelrc we just made
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 3. Injects styles into DOM
          'css-loader',   // 2. Translates CSS into CommonJS
          'sass-loader'   // 1. Compiles Sass to CSS
        ],
      },
    ],
  },

  // 4. Plugins to simplify development
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns:[
        {
          from:'public/products',
          to:'products',
        }
      ]
    })
  ],

  // 5. Development Server settings
  devServer: {
    port: 3000,
    hot: true, // Enables Hot Module Replacement
    historyApiFallback: true, // Important for React Router
  },

  resolve: {
    extensions: ['.js', '.jsx'], // Lets you import without typing .js or .jsx
  },
};