# vscode自定义Tab填充提高代码编写效率

相信各位在编写代码的时候肯定少不了Tab键，他的自动填充代码的功能大大提高了我们编写代码的效率

本人在自学前端，在写 HTML、CSS 代码过程中，多亏于一个名为Emmet的插件，提供了一种非常简练的语法规则，能立刻生成对应的HTML结构和CSS代码（此段可忽略）

但是在开发的过程中有一些代码片段和代码块也是频繁会用到的，比如我在写js要引入jQuery的时候，就经常要敲一下的代码：

```html
<script src=\"js/jquery-1.12.4.js\"></script>
  <script>
  $(function () {
  })
  </script>
```

以及在写CSS代码的时候，开头经常会少不了这样的一段代码：

```css
*{
    margin: 0;
    padding: 0;
}
```

相信不止于前端，在敲其他语言的小伙伴肯定也会有一些代码片段是要频繁用到的，那么有没有什么方法可以提高我们这方面的代码编写效率呢？

其实vscode给我们提供了自定义Tab填充的功能，操作步骤如下：

### 一.打开设置，然后点击“用户代码片段”

![image](https://pic.imgdb.cn/item/609e2d15d1a9ae528fd9beee.png)

### 二.打开对应想要自定义的语言的json文件

![image](https://pic.imgdb.cn/item/609e2d20d1a9ae528fda2e03.png)

### 三.自定义

这是给出来的示范：

![image](https://pic.imgdb.cn/item/609e2d1fd1a9ae528fda2d08.png)

这是我定义的引入jQuery的填充代码：

```json
"jQuery induct": {
	"prefix": "jq",  //jq是要输入的快捷命令
	"body": [
	"<script src=\"js/jquery-1.12.4.js\"></script>",
	"<script>",
	"$(function () {",
	"  $1",      //$1是按下Tab键之后光标的位置
	 "});",
	 "</script>"
	],    //body里填写要输入命令之后要填充的代码，如果是代码块的话要用[]框住，然后各行代码放在""内
},
```

这是css.json里对应前面代码写的：

```json
"css*easy": {
		"prefix": "*",
		"body": [
			"*{",
			"    margin: 0;",
			"    padding: 0;$1",
			"}$2"
	]
}
```

### 四.保存好之后，在对应的文件里输入对应的命令就会出现提示，然后按下Tab键就能出现对应的代码块了：

![image](https://pic.imgdb.cn/item/609e2d1fd1a9ae528fda2d8a.png)

![image](https://pic.imgdb.cn/item/609e2d26d1a9ae528fda7664.png)

至于其他语言或者编辑器相应的功能就大家慢慢去摸索吧