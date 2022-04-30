什么是node.js？

- node.js是一个基于V8 JavaScript引擎的JavaScript运行环境

要想读懂那么就得先搞明白一下问题：

- 什么是JavaScript运行环境？
- 为什么JavaScript需要特别的运行环境？
- 什么是JavaScript引擎？
- 什么是V8引擎？

# 浏览器内核

- 不同浏览器由不同的内核组成

- 浏览器内核其实就是浏览器的排版引擎，也被成为浏览器引擎，页面渲染引擎或样板引擎

- 常见的浏览器内核：Gecko、Trident、Webkit、Blink

    下面以Webkit为例：

  <img src="https://s2.loli.net/2021/12/11/PUnZW6oOytq7Qke.png" alt="image-20211211170815423" style="zoom:33%;" />

  - WebCore：负责HTML解析、布局、渲染等等相关的工作
  - JavaScriptCore：解析、执行JavaScript代码

# 渲染引擎的工作过程

![image-20211211165707901](https://s2.loli.net/2021/12/11/ptDdBglTymL3i7A.png)

当HTML解析过程中遇到JavaScript标签时，会停止解析HTML，而去加载和执行JavaScript代码（由JavaScript引擎来执行JavaScript代码）

这是因为JavaScript可以操作DOM，所以浏览器需要将HTML解析的DOM和JavaScript操作之后的DOM放在一起结合生成最终的DOM树，而不是频繁的去生成DOM树

# JavaScript引擎

- 我们编写的JavaScript代码无论是交给浏览器还是node.js执行，最后都需要被CPU执行，而CPU只认识自己的指令集，实际上是机器语言才能被CPU执行，所以我们需要JavaScript引擎来把JavaScript代码翻译成CPU指令来执行
- 常见的JavaScript引擎：SpiderMonkey、Chakra、JavaScriptCore、V8

# V8引擎

用C艹编写的高性能JavaScript和WebAssmbly引擎，可独立运行，也可以嵌入到任何C艹应用程序中

![image-20211211174903834](https://s2.loli.net/2021/12/11/iG3Q8xUFJjXYwlI.png)

# Node.js架构

![image-20211211173643036](https://s2.loli.net/2021/12/11/sYgouqe8f65rFzM.png)

我们编写的JavaScript代码会经过V8引擎，在通过node.js的Bindings，将任务放在Libuvd的事件循环中

node.js框架与浏览器的区别：

![image-20211211173842904](https://s2.loli.net/2021/12/11/FPioXWEDrUSs18d.png)