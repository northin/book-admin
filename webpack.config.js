const webpack = require('webpack');
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// OccurenceOrderPlugin :为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
// UglifyJsPlugin：压缩JS代码；
// ExtractTextPlugin：分离CSS和JS文件
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	devtool: "cheap-module-eval-source-map",
	// null  生产环境
// source-map	在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；
// cheap-module-source-map	在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；
// eval-source-map	使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；
// cheap-module-eval-source-map	这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示
	mode: 'development',
	optimization: {
		minimize: true, //压缩jscss文件
		splitChunks: {
			chunks: 'all', //如果我们需要配置初始加载的代码也加入到代码分割中
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
			  vendors: {
				test: /[\\/]node_modules[\\/]/,
				priority: -10
			  },
			  default: {
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true
			  }
			}
		}
	},
	entry: {
		path:__dirname + "/app/app.js",
		// reactAll:['react','react-router','immutable',"echarts","react-draft-wysiwyg","redux","react-router-dom"]
		vendor:['react']
	},
	output: {
		publicPath:"/",
		path: __dirname + "/public",
		filename: "[name]-[hash].js",   //会导致改变文件内容后重新打包时，文件名不同而内容越来越多
		chunkFilename: '[name].[chunkhash:5].chunk.js'
	},
	externals: {
		// jquery: 'jQuery'   //外部依赖模块
	  },
	resolve:{
		alias:{         // import bar from "bar"
			// "bar":path.resolve(__dirname,"app/bar.js")
			"@view":path.resolve(__dirname,"app/view"),
			"@comp":path.resolve(__dirname,"app/componments"),
			"@redux":path.resolve(__dirname,"app/redux"),
			"@less":path.resolve(__dirname,"app/assets/less"),
			"@picture":path.resolve(__dirname,"app/assets/picture"),
			"@util":path.resolve(__dirname,"app/utils"),
			"@config":path.resolve(__dirname,"app/config.js"),
		}
	},
	module: {
		rules: [
			{
				test:/(\.jsx|\.js)$/,
				use:{
					loader:'babel-loader?cacheDirectory=true',
					// options: {
                    //     presets: [
                    //         "env", "react", 'stage-1','stage-2'
					// 	],
					// 	"plugins": [
					// 		// 	[
					// 		//   "import",
					// 		//   {
					// 		// 	"libraryName": "antd",
					// 		// 	"libraryDirectory": "es",
					// 		// 	"style": "css" 
					// 		//   }],

					// 		//babel-plugin-import-fix
					// 		//主要功能是修改import，缩小import的范围，减少bundle文件大小，提升性能
					// 		["import-fix", [
					// 			{
					// 			  'libraryName': 'antd',
					// 			  'libraryPath': 'antd/lib/${name}/index.js',
					// 			  'namePolicy': 'dash',
					// 			//   'cssPath': 'antd/lib/${name}/style/index.css'
					// 			}
					// 		  ]],
					// 		  [
					// 		  "transform-runtime",
					// 			{
					// 			"helpers": false,
					// 			"polyfill": false,
					// 			"regenerator": true,
					// 			"moduleName": "babel-runtime"
					// 			}
					// 		]
					// 	],
					// 	"sourceMaps": true
                    // }
				},
				exclude: /node_modules/
			},
			{
                test: /\.css$/,
                loader: 'style-loader!css-loader?importLoaders=1',
            },
			{
				test: /\.less$/,
				use:ExtractTextPlugin.extract({
					use:[{
						loader:'css-loader'
					},{
							loader:'less-loader',
							options: {
								modules: true, // 指定启用css modules
								localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
							}
						}],
					fallback:'style-loader'
				}) 
			},
			{
	　　　　　　test: /\.(png|jpg)$/,
	　　　　　　loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
	　　　　}
		]
	},
	devServer: {
	    contentBase: "./public",//本地服务器所加载的页面所在的目录
	    // colors: true,//终端中输出结果为彩色
	    historyApiFallback: true,//不跳转
	    inline: true//实时刷新
	},
	plugins: [
		new webpack.BannerPlugin('版权所有，翻版必究'),   //打包后js开头的注释
		new HtmlWebpackPlugin({
            template: "index.html"//new 一个这个插件的实例，并传入相关的参数
		}),
		new ExtractTextPlugin("[name]-[hash].css"),
		// // new webpack.optimize.UglifyJsPlugin(),
		// new CleanWebpackPlugin('build/*.*', {
		// 	root: __dirname,
		// 	verbose: true,
		// 	dry: false
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor',
		// 	chunks: ['common'],
		// 	filename: 'vendor.bundle.js',
		// 	minChunks: Infinity,
		//   }),
		new BundleAnalyzerPlugin(),
		new webpack.HotModuleReplacementPlugin(),//热加载插件
		//这个插件是重点，用于打包上面entry里配置的包
        // new webpack.DllPlugin({
        //     path:path.join(__dirname,"/public",'[name]-manifest.json'),
        //     name:'[name]',
        // }),

    ],
}





















