# js文件的打包

当前文件夹：![image-20211029152933141](C:/Users/13pro/AppData/Roaming/Typora/typora-user-images/image-20211029152933141.png)

（main.js是是项目的入口文件且引用了mathUtils.js文件）

在终端使用webpack指令打包：`webpack src/main.js dist/bundle.js`

打包完后再dist文件夹下会自动生成bundle.js文件

# webpack配置

## 配置入口和出口

创建一个webpack.config.js文件：

```js
const path = require('path')
moudule.exports = {
	//	入口：可以是字符串/数组/对象
	entry: './src/main.js',
	//	出口：通常是一个对象，里面至少包含两个重要属性，path和filename
	output: {
		path: path.resolve(_dirname, 'dist'),//注意：path通常是一个绝对；路径
		filename: 'bundle.js'
	}
}
```

配置好入口和出口后，我们只需要在终端中敲入`webpack`指令就可以直接进行打包，而不再需要敲入路径

然后，可以在package.json的script中定义自己的执行脚本

<img src="C:/Users/13pro/AppData/Roaming/Typora/typora-user-images/image-20211029154418852.png" alt="image-20211029154418852" style="zoom:50%;" />

这样我们在终端中执行指令`npm run build`时就会先寻找本地的node_modules/.bin路径中对应的命令，如果没找到就会去全局寻找命令

==注意==：在终端中执行`npm run build`指令与`webpack`指令并不完全相同，前者是优先使用局部的webpack工具下进行打包，如果局部没有在去找全局的，而后者是直接使用全局的webpack工具进行打包（一般开发的时候推荐使用`npm run build`指令）

# loader

使用过程：

步骤一：通过npm安装需要使用的loader

步骤二：在webpack.config.js中的modules关键字下进行配置