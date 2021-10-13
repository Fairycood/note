# 服务器基本概念

#### 什么是服务器?

服务器也是电脑，只不过是一台24小时不断电，不关机的电脑，根据提供的服务功能不同: 文件服务器、邮件服务器、Web 服务器等等；简而言之: 服务器其实就是一台"提供了某种服务功能"的超级电脑

#### 如何让电脑能够提供某种服务?

如何让电脑可以聊天?听歌?浏览网页?想让电脑提供聊天服务,可以安装相应的聊天软件, 例如:QQ/旺旺...想让电脑可以提供听歌服务,可以安装相应音乐软件, 例如:酷我/酷狗...想让电脑可以提供浏览网页服务,可以安装相应浏览网页软件, 例如:谷歌/欧朋..

#### 如何让电脑提供管理网站的服务?

安装Web服务相关软件, 例如: Apache、IIS、Tomcat、Nginx、NodeJS等；安装了Web服务软件的电脑, 我们称之为"Web服务器"Web服务器软件：Apache、IIS、Tomcat、Nginx、NodeJS等；

### Web服务器搭建

#### 什么是WAMPServer软件?

W: Windows操作系统

A: Apache 世界排名第一的服务器软件,特点是简单,速度快,性能稳定

M: MySQL 开源免费的数据库软件，特点是体积小、速度快、使用成本低

P: PHP 超文本预处理器,直接将代码嵌入HTML文档中执行, 特点是简单易学,容易上手

#### 测试访问

打开浏览器输入127.0.0.1查看显示的内容

#### 如何修改默认端口号?

在httpd.conf文件中搜索Listen , 改为你想要的数字，然后重启WAMP

# PHP

## PHP基础语法

**代码**：PHP的代码要书写在`<?php         ?>`之内

**定义变量**：`$num = 10;`

**打印内容**：`echo $num;`

**定义数组和打印**：`$arr = arry(1,3,5);   print_r($arr);`
（引用数据类型的打印用print_r，其他数据类型的打印用echo）

**定义对象和打印**：`$dict = arry("name"=>"hzh","age"=>"21"); print_r($dict);`
（定义对象还是一样用arry，然后键与值之间的符号用“=>”）

**分支循环语句**：if / swich / 三目 / for / while

## get请求处理与post请求处理

- 可以通过form标签的method属性指定发送请求的类型

- 如果是get请求会将提交的数据拼接到URL后面

- 如果是post请求会将提交的数据放到请求头中

- GET请求和POST请求的异同

  相同点:都是将数据提交到远程服务器

  不同点:
  提交数据存储的位置不同：GET请求会将数据放到URL后面；POST请求会将数据放到请求头中
  提交数据大小限制不同：GET请求对数据有大小限制；POST请求对数据没有大小限制

- GET/POST请求应用场景：GET请求用于提交非敏感数据和小数据；POST请求用于提交敏感数据和大数据

## post上传文件

先创建一个文件上传表单

```html
<form action="03-post-file.php" method="post" enctype="multipart/form-data">
  <input type="file" name="upFile"><br>
  <input type="submit" value="上传"><br>
</form>
```

（上传文件一般使用post提交且==上传文件必须设置enctype="mutipart/from-data"==）

获取上传文件对应的字典：`$fileInfo = $_FILES["upFile"];`（用到PHP中$_FILES的全局变量）

获取上传文件的名称：`$fileName = $_FILES["name"];`

获取上传文件保存的临时路径：`$filePath = $_FILES["tmp_name"];`

移动文件：`move_uploaded_file($filePath,"./source/".$fileName);`
(第一个参数是规定要移动的文件，第二个参数是规定文件要移动的位置，注意PHP中字符串拼接用的符号是“ . ”!)

#### 大文件上传

默认情况下服务器对上传文件的大小是有限制的，如果想修改上传文件的限制可以修改php.ini文件：

```php
file_uploads = on;             //是否允许上传文件 On/Off默认是On
upload_max_filesize = 2048M;   //上传文件的最大限制
post_max_size = 2048M;         //通过Post提交的最多数据
max_execution_time = 30000;    //脚本最长的执行时间 单位为秒
max_input_time = 30000;        //接受提交的数据的时间限制 单位为秒
memory_limit = 2048M;          //最大的内存消耗
```

# AJAX-get

**什么是Ajax？**
AJAX是在不重新加载整个页面的情况下与服务器交换数据并更新部分网页的艺术

**如何使用AJAX？**

1.创建一个异步对象（new XMLHttpRequest( )）
2.设置请求方式和请求地址（open( , , )）
3.发送请求（send()）
4.监听状态的变化（onreadystatechange）
5.处理返回的结果

```javascript
window.onload = function (ev) {
    var oBtn = document.querySelector("button");
    oBtn.onclick = function (ev1) {
        // 1.创建一个异步对象（用new XMLHttpRequest()）
        var xmlhttp=new XMLHttpRequest();
        // 2.设置请求方式和请求地址
        /*
        使用到open方法，需要传三个参数，分别为
        method：请求的类型；GET 或 POST
        url：文件在服务器上的位置
        async：true（异步）或 false（同步）
        */
        xmlhttp.open("GET", "04-ajax-get.php", true);
        // 3.发送请求
        xmlhttp.send();
        // 4.监听状态的变化
        xmlhttp.onreadystatechange = function (ev2) {
            /*
            readyState有一下几种可能的值：
            0: 请求未初始化
            1: 服务器连接已建立
            2: 请求已接收
            3: 请求处理中
            4: 请求已完成，且响应已就绪
            */
            if(xmlhttp.readyState === 4){
                // 判断是否请求成功(status是服务器返回的状态码)
                if(xmlhttp.status >= 200 && xmlhttp.status < 300 ||
                   xmlhttp.status === 304){
                    // 5.处理返回的结果
                    console.log("接收到服务器返回的数据");
                }else{
                    console.log("没有接收到服务器返回的数据");
                }
            }
        }
    }
}
```

#### Ajax在ie中的兼容

创建异步对象时用以下代码：

```javascript
if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
    xhr=new XMLHttpRequest();
}
else
{// code for IE6, IE5
    xhr=new ActiveXObject("Microsoft.XMLHTTP");
}
```

此外，在IE浏览器中, 如果通过Ajax发送GET请求, 那么IE浏览器认为同一个URL只有一个结果，所以要兼容ie

解决方案：在设置请求地址时要在请求地址（open（）方法的第二个参数）后加上一个随机参数以此来刷新URL（以下例子是加了当前时间毫秒数来作为随机参数）：

```JavaScript
xhr.open("GET","05-ajax-get.txt?t="+(new Date().getTime()),true);
```

#### 封装AJAX—get

直接封装使用AJAX的五步代码，提高代码的编写效率

#### jQuery里的ajax方法

```javascript
$,ajax({
    url:"路径"，
    type:"get"/"post",
    data:"key=val",
    success:function(msg){},
    error:function(xhr){}
});
```



# AJAX-xml

执行结果中有中文, 必须在php文件顶部设置`header("content-type:texsont/html; charset=utf-8");`

如果PHP中需要返回XML数据, 也必须在PHP文件顶部设置`header("content-type:text/xml; charset=utf-8");`

# AJAX-json

JSON.parse通常用于与服务端交换数据`JSON.parse(text[,reviver])`

# cookie

`document.cookie = "key=val;path=    ;domain=      ";`

**cookie**: 会话跟踪技术 客户端

**session**:  会话跟踪技术  服务端

**cookie作用**:将网页中的数据保存到浏览器中

**cookie生命周期:**默认情况下生命周期是一次会话(浏览器被关闭)；如果通过expires=设置了过期时间, 并且过期时间没有过期, 那么下次打开浏览器还是存在；如果通过expires=设置了过期时间, 并且过期时间已经过期了,那么会立即删除保存的数据

**cookie注意点**:

1. cookie默认不会保存任何的数据
2. cookie不能一次性保存多条数据, 要想保存多条数据,只能一条一条的设置
3. cookie有大小和个数的限制
4. 个数限制: 20~50
5. 大小限制: 4KB左右

**cookie作用范围:**同一个浏览器的同一个路径下访问；如果在同一个浏览器中, 默认情况下下一级路径就可以访问；如果在同一个浏览器中, 想让上一级目录也能访问保存的cookie, 那么需要添加一个path属性才可以 `document.cookie = "name=zs;path=/;";`

​      例如:

​      保存到了www.it666.com/jQuery/Ajax/路径下,我们想在 www.it666.com/jQuery/Ajax/13-weibo/,和 www.it666.com/jQuery/ 路径下也能访问

​      例如:

​      我们在www.it666.com下面保存了一个cookie, 那么我们在edu.it666.com中是无法访问的；如果想在edu.it666.com中也能访问, 那么我们需要再添加一个domain属性才可以：`document.cookie = "name=zs;path=/;domain=it666.com;";`

#### 封装cookie

**添加cookie**

```javascript
function addCookie(key, value, day, path, domain) {
// 1.处理默认保存的路径
var index = window.location.pathname.lastIndexOf("/")
var currentPath = window.location.pathname.slice(0, index);
path = path || currentPath;
// 2.处理默认保存的domain
domain = domain || document.domain;
// 3.处理默认的过期时间
if(!day){
    document.cookie = key+"="+value+";path="+path+";domain="+domain+";";
}else{
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = key+"="+value+";expires="+date.toGMTString()+";path="+path+";domain="+domain+";";
}
```

**获取cookie**

```javascript
function getCookie(key) {
    var res = document.cookie.split(";");
    for(var i = 0; i < res.length; i++){
        var temp = res[i].split("=");
        if(temp[0].trim() === key){
            return temp[1];
        }
    }
}
```

**删除cookie**

```javascript
function delCookie(key, path) {
    addCookie(key, getCookie(key), -1, path);
}
```

# hash

种hash：`window.location.hash = `

获取hash：`window.location.hash.substring(val)`(substring(1)用于去掉hash里的'#')
