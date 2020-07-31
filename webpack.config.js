// It is pure client code , so babel would not work here.
// Therefore , we need to write old js 
const path= require("path")
const ExtractCSS=require("extract-text-webpack-plugin")
const autoprefixer=require("autoprefixer")
const ENTRY_FILE=path.resolve(__dirname,"assets","js","main.js");
const OUTPUT_DIR=path.join(__dirname,"static")
var MODE;
if(process.env.WEBPACK_ENV==='development')
  MODE='development'
else
MODE='production'

const config = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    // mode means that when we build our code in production => compressed code
    //                 but in development it is not compressed becoz we want to see
    //                 and solve errors that occurs as 'compressed code' is not easy 
    //                 to comprehend. 
    mode: MODE,
    module: {
      rules: [
        {
          test: /\.(js)$/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        },
        {
          test: /\.(scss)$/,
          use: ExtractCSS.extract([
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                plugins() {
                  return [autoprefixer({ overrideBrowserslist: "cover 99.5%" })];
                }
              }
            },
            {
              loader: "sass-loader"
            }
          ])
        }
      ]
    },
    output: {
      path: OUTPUT_DIR,
      filename: "[name].js"
    },
    plugins: [
      new ExtractCSS("styles.css")
    //   ,new SplitByPathPlugin(
    //   [{ name: 'vendor', path: __dirname + '/node_modules' }],
    //   { ignore: [__dirname + '/node_modules/css-loader'] }
    // ),
    
  ]
  };
  
// due to absence of babel , not written 'export default config'
module.exports=config