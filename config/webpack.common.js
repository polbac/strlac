const path = require('path');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 


 module.exports = {
   entry: {
     app: './src/index.js',
   },
   module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        loader: 'less-loader', // compiles Less to CSS
      },
      { 
        test: /\.hbs$/, 
        loader: "handlebars-loader", 
        options: {
          
          precompileOptions: {
            knownHelpersOnly: false,
          },
        }, 
      }
    ]
  },
   plugins: [
    
     // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: 'STRLAC',
       template:'./src/template.html',
       inject: false,
       templateParameters: {
        'bundle_path': '../dist',
        root_path: process.env.NODE_ENV === 'production' ? '/new/': '/',
        timestamp:  new Date().getTime() 
      },
     }),
     
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };