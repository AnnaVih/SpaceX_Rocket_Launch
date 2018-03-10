const path = require('path');
const webpack = require('webpack');

 //Extract the style sheets into a dedicated file in production 
 const ExtractTextPlugin = require("extract-text-webpack-plugin");

 const extractSass = new ExtractTextPlugin({
  filename: "css/style.css",
  disable: process.env.NODE_ENV === "development"
 });

//Module  exports
module.exports = {
    performance: { 
        hints: false 
    },

    entry: {
        polyfills: './src/polyfills.js',
        index: './src/index.js'
      },

      plugins: [
        extractSass,
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ],


      module: {

        rules: [
          //Babel loader
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },

          //Sass Loaders
          {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["./src/scss/style.scss"]
                    }
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
          }
         ]
     },


      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
      }
 }