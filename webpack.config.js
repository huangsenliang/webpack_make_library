const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    // another: './src/another-module.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',//将你的 library 暴露为所有的模块定义下都可运行的方式
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    }),  // 生产dist中的html文件，自动更新jsz文件的引入
    //   new webpack.optimize.RuntimeChunkPlugin({
    //     name: "common"
    // }),
    // 清空dist打包文件夹(wacth观察者模式下有冲突)
    new CleanWebpackPlugin(),
  ],

  mode: "production",   // 压缩输出
  // bug调试工具
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {  // 资源管理
    rules: [  // 匹配规则
      /**********************加载css*********/
      // 命令：npm install --save-dev style-loader css-loader
      /*过程：
        webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader
        在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。
        这使你可以在依赖于此样式的文件中 import './style.css'。
        现在，当该模块运行时，含有 CSS 字符串的 <style> 标签，将被插入到 html 文件的 <head> 中。
      */
      {   // 处理css文件
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      /****************图片和字体处理***********/
      // 命令：npm install --save-dev file-loader
      /*过程：
        当你 import MyImage from './my-image.png'，
        该图像将被处理并添加到 output 目录，_并且_ MyImage 变量将包含该图像在处理后的最终 url。
        当使用 css-loader 时，如上所示，你的 CSS 中的 url('./my-image.png') 会使用类似的过程去处理。
        loader 会识别这是一个本地文件，并将 './my-image.png' 路径，
        替换为输出目录中图像的最终路径。html-loader 以相同的方式处理 <img src="./my-image.png" />
      */
      {  // 处理图片引入
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          "file-loader"
        ]
      },
      {   // 处理字体文件
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          "file-loader"
        ]
      },
      /****************数据加载处理***********/
      // 此外，可以加载的有用资源还有数据，
      // 如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内
      // 置的，也就是说 import Data from './data.json' 默认将正常运行。要导入 CSV、TSV 和 XML，
      // 你可以使用 csv-loader 和 xml-loader。让我们处理这三类文件
      // npm install --save-dev csv-loader xml-loader
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  },
};