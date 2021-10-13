# 原生AJAX

## AJAX简介

AJAX全称Asynchronous JavaScript And XML（异步的js和XML），是一种将现有的标准组合在一起使用的新方式

## XML简介

- 可扩展标记语言
- 被设计用来传输和存储数据（而HTML是用来呈现数据的）【但是现在已经被Json代替了】
- 和HTML类似，不同的是HTML中都是预定义标签，而XML中没有预定义标签，全是自定义标签，用来表示一些数据

##  AJAX的特点

- **优点**：可以无需刷新页面而与服务器端进行通信；允许你根据用户事件来更新页面内容
- **缺点**：没有浏览历史，不能回退；存在跨域问题（同源）；SEO（搜索引擎优化）不友好

## HTTP协议

HTTP协议详细规定了浏览器和万维网服务器之间互相通信的规则

**请求报文**（格式）：

```
行	POST /s?ie=utf-8 HTTP/1.1        请求类型/url/HTTP版本
头	Host:athuihu.com
 	 Cookie:name=guigu
 	 Content-type:application/x-www-form-urlencoded
空行
体 	Username=admin&password=admin
```

**响应报文**（格式）：

```
行	HTTP/1.1 200 OK
头	Content-Type:text/html;charset-8
	 Content-length:2048
	 Content-encoding:gzip
空行
体	<html>
		<head>
		</head>
		<body>
			<h1>sjdalanl<h1>
		</body>
	</>
```

