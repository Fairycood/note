[TOC]







JQuery一款优秀的Javascript库
能让我们对HTML文档便利和操作、时间处理、动画以及Ajax变得更加简单

# 如何使用JQuery？

1. 不用下载直接引用：

<script src="https://code.jquery.com/jquery-1.12.4.js" integrity="sha256-Qw82+bXyGq6MydymqBxNPYTaUXXq7c8v3CwiYwLLNXU=" crossorigin="anonymous"></script>

2. 先下载JQuery库到本地目录，然后引用下载的库

------

# jQuery与JavaScript入口函数加载模式对比

1.  原生JS和jQuery入口函数的加载模式不同

   原生JS会等到DOM元素加载完毕,并且图片也加载完毕才会执行

   ```html
   <script>
   window.onload = function (ev) {
      // 1.通过原生的JS入口函数可以拿到DOM元素
       var images = document.getElementsByTagName("images")[0];
       console.log(images);//能显示图片
      // 2.通过原生的JS入口函数可以拿到DOM元素的宽高
       var width = window.getComputedStyle(images).width;
       console.log("onload", width);//能正确显示图片的宽
    }
   </script>
   ```

    jQuery会等到DOM元素加载完毕,但**不会**等到图片也加载完毕就会执行

   ```html
   <script>
   $(document).ready(function () {
      //通过jQuery入口函数可以拿到DOM元素
       var $images = $("images");
       console.log($images);//能显示图片
       //通过jQuery入口函数不可以拿到DOM元素的宽高
       var $width = $images.width();
       console.log("ready",$width);//不能正确显示图片的宽高
   });
   </script>
   ```

2. 覆盖问题

   原生的JavaScript如果编写了多个入口函数，后面编写的会覆盖前面编写的

   ```html
   <script>
           window.onload = function () {
               alert("hello lnj1"); // 不会显示
           }
           window.onload = function () {
               alert("hello lnj2"); // 会显示
           }
   </script>
   ```

   jQuery中编写多个入口函数后面编写的不会覆盖前面编写的

   ```html
   <script>
           $(document).ready(function () {
               alert("hello lnj1"); //会显示
           });
           $(document).ready(function () {
               alert("hello lnj2"); // 会显示
           });
   </script>
   ```

   <!--为什么jQuery不会有覆盖问题？-->
   <!--jQuery框架的本质是一个闭包，每次执行我们都会给ready函数传递一个新的函数,不同函数内部的数据不会相互干扰-->

# 入口函数的写法

1. `$(document).ready(function () {     });`
2. `jQuery(document).ready(function () {     });`
3. `$(function () {     });`（推荐）
4. `jQuery(function () {     });`

# $符号冲突问题

解决方法：

1. 释放$的使用权

   写法：`jQuery.noConflict();`
   注意：释放操作必须在编写其他jQuery代码之前编写
              释放之后就不能再使用$，改用jQuery

2. 自定义一个访问符号
   写法：`var nj = jQuery.noConflict();`
   然后nj就可以类似于$那样用了

# jQuery核心函数

$();代表调用jQuery的核心函数

### 1.jQuery(callback)

当DOM加载完成后执行传入的回调函数

```html
<script>
        $(function () {
            alert("123");
        });
</script>
```

### 2.jQuery([sel,[context]])

接收一个包含CSS选择器的字符串，然后用这个字符串去匹配一组元素，并包装成jQuery对象

```html
<script>
        $(function () {
            // 利用jquery获取所有div,得到的是一个jQuery对象
            var $box = $("div");
            console.log($box);
            
            // 利用js原生语法获取所有div,得到的是一个js对象
            var box = document.getElementsByTagName("div");
            console.log(box);
        });
</script>
```

**原生JS对象和jQuery[对象相互转换]()**

```html
<script>
        $(function () {
            var $box = $("#box");
//            $box.text("新的数据");
//            jQuery对象不能使用原生js对象的方法
//            $box.innerText = "新的数据";
//            将jQuery对象转换为原生js对象
//            注意: 不是eq(0),eq函数返回的是jQuery类型对象,get函数返回的是原生类型对象
//            var box = $box.get(0);
            var box = $box[0];
            box.innerText = "新的数据";

            var box2 = document.getElementById("box");
//            原生js对象不能使用jQuery对象的方法
//            box2.text("新的数据2");
//            原生js对象只能使用原生的js方法
//            box2.innerText = "新的数据2";

//            将原生js对象转换为jQuery对象
            var $box2 = $(box);
           $box2.text("新的数据2");
        });
</script>
```

<!--为了方便开发者之间沟通和阅读,一般情况下所有jQuery操作相关的变量前面加上$-->

### 3.jQuery(html,[ownerDoc])

根据HTML标记字符串，动态创建DOM元素

```html
<script>
        $(function () {
            var $eles = $("<p>我是span</p><u>我是u</u>");
            // 无论是jQuery找到的还是创建的,我们最终拿到的永远都是jQuery对象
            console.log($eles);
            // 将创建好的DOM元素添加到body中
            $("body").append($eles);
        });
</script>
```

<!--jQuery对象的本质是一个伪数组-->

# 静态方法

静态方法对应的是对象方法,对象方法用实例对象调用,而静态方法用类名调用

```html
 <script>
        window.onload = function () {
            function AClass(){}
            AClass.staticMethof = function(){
                alert('静态方法');
            }
            AClass.prototype.instaceMethod = function(){
                alert('实例方法');
            }
            //静态方法用类名直接调用
            AClass.staticMethof(); 

            //实例方法必须用类的实例对象调用
            var instace = new AClass();
            instace.instaceMethod();
        }
</script>
```

### 1.jQuery.holdReady(  )

暂停或恢复jQuery.ready事件
(  )里传入true或false

**注意：**

1. 该方法必须在文档靠前部分被调用，例如，在头部加载完 jQuery 脚本之后，立刻调用该方法。如果在 ready 事件已经被调用后再调用该方法，将不会起作用。
2. 首先调用\$.holdReady(true)[调用后 ready 事件将被锁定]。当准备好执行 ready 事件时，调用$.holdReady(false)。
3. 可以对 ready 事件添加多个锁定，每个锁定对应一次$.holdReady(false)[解锁]调用。ready 事件将在所有的锁定都被解除，并且页面也已经准备好的情况下被触发。

### 2.$.each(arr/obj,[callback])

遍历数组或对象
返回值是被遍历的数组

```html
<script>
        $(function () {
            // 3.1遍历数组
            var arr = [1, 3, 5, 7, 9];
            // 3.1.1通过原生方法遍历数组
            // 第一个回调函数参数是遍历到的元素
            // 第二个回调函数参数是当前遍历的索引
            // 返回值: 没有返回值
            var res = arr.forEach(function (ele, idx) {
                console.log(idx, ele);
            });
            console.log(res);

            // 3.1.2通过jQuery静态方法遍历数组
            // 第一个回调函数参数是当前遍历的索引
            // 第二个回调函数参数是遍历到的元素
            // 返回值: 被遍历的数组
            var $res2 = $.each(arr, function (idx, ele) {
                console.log(idx, ele);
            });
            console.log($res2);

            // 3.2遍历对象
            var obj = {name: "lnj", age:"33", gender:"male"};
            // 3.2.1js对象没有forEach方法,所以通过forin方法遍历对象
            for(var key in obj){
                console.log(key, obj[key]);
            }
            // 3.2.2通过jQuery静态方法遍历对象
            $.each(obj,function (key, value) {
                console.log(key, value);
            });
        });
    </script>
```

### 3.$map(arr/odj,[callback])

也是遍历对象或数组
但是与each不同的是map讲回调函数的返回值组成一个新的数组返回

```javascript
        $(function () {
            // 4.1遍历数组
            var arr = [1, 3, 5, 7, 9];
            // 4.1.1通过原生方法遍历数组
            // 第一个回调函数参数是遍历到的元素
            // 第二个回调函数参数是当前遍历的索引
            // 第三个回调函数参数是当前被遍历的数组
            // 返回值: 将回调函数返回值收集起来组成一个新的数组
            var res = arr.map(function (ele, idx, arr) {
                console.log(idx, ele, arr);
                return ele + idx;
            });
            console.log(res);
            
            // 4.1.2通过jQuery静态方法遍历数组
            // 第一个回调函数参数是遍历到的元素
            // 第二个回调函数参数是当前遍历的索引
            // 返回值: 将回调函数返回值收集起来组成一个新的数组
            var $res2 = $.map(arr, function (ele,idx) {
                console.log(idx, ele);
                return ele + idx;
            });
            console.log($res2);

            // 4.2遍历对象
            var obj = {name: "lnj", age:"33", gender:"male"};
            /*
            obj.map(function (ele, idx, obj) {
                // 报错,原生JS没有map方法
                console.log(idx, ele, obj);
            });
            */
            var $res = $.map(obj, function (value, key) {
                console.log(key, value);
                return key + value;
            });
            console.log($res);
        });
```

### 4.trim(str)

去掉字符串起始和结尾的空格

### 5.isArray(obj)

判断是否是真数组

### 6.isFunction(obj)

判断是否是函数

### 7.isWindow(obj)

判断是否是window对象

# CSS选择器

## 基础选择器

| 选择器              | 名称         | 描述                                   | 示例                                                         |
| ------------------- | ------------ | -------------------------------------- | ------------------------------------------------------------ |
| #id                 | id选择器     | 根据给定的id匹配一个元素               | $("#box");选取id为box元素                                    |
| .class              | 类选择器     | 根据给定的类名匹配元素                 | $(".box");选取所有类名为box元素                              |
| element             | 元素选择器   | 根据给定的元素名称匹配元素             | $("p");选取所有<p>元素                                       |
| *                   | 通配符选择器 | 匹配所有元素                           | $("*");选取所有元素                                          |
| selector1,selector2 | 并集选择器   | 将所有选择器匹配到的元素合并后一起返回 | $("div,p,.box");选取所有<div>元素,所有<p>元素和所有类名为box元素 |

除了id选择器是返回单个元素，其余选择器返回的都是集合元素

## 层次选择器

| 选择器                   | 名称           | 描述                                                         | 示例                                                   |
| ------------------------ | -------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| $("ancestor descendant") | 后代选择器     | 选取ancestor元素的所有descendant后代标签(不光是儿子,包括孙子/重孙子等) | $("div span");选取<div>元素里所有的<span>元素          |
| $("parent > child")      | 子元素选择器   | 找到选取parent 元素中所有直接子元素child(只有儿子,不包括孙子/重孙子等) | $("div>span");选取<div>元素下元素名称是<span>的子元素  |
| $("prev + next")         | 相邻兄弟选择器 | 选取prev元素后面紧跟的那个next元素                           | $(".one+div");选取类名为one的下一个同级的<div>元素     |
| $("prev ~ siblings")     | 通用兄弟选择器 | 选取prev元素后面的所有next元素                               | $("#two~div");选取id名为two元素后面所有同级的<div>元素 |

## 内容过滤选择器

| 选择器          | 描述                             |
| --------------- | -------------------------------- |
| :empty          | 选取不包含子元素或文本为空的元素 |
| :parent         | 选取含有子元素或文本的元素       |
| :contains(text) | 选取含有文本内容为text的元素     |
| :has(selector)  | 选取含有选择器所匹配的元素的元素 |
|                 |                                  |

:has(selector)和:parent区别：:parent只要有子元素就会被找到，:has(selector)不仅要有子元素而且子元素还必须满足我们的条件

## 过滤选择器

- `first()` - 第一个匹配条件的元素
- `last()` - 最后一个匹配条件的元素
- `eq()` - 符合索引号的元素
- `filter()` - 匹配filter里条件的元素
- `not()` - 去掉not里符合条件的元素后的其他元素

## 同胞选择器

- `siblings()` - 被选元素的所有同胞元素
- `next()` - 被选元素的下一个元素
- `nextAll()` - 被选元素的下面所有元素
- `nextUntil()` - 被选元素到后面指定元素中间的所有元素
- `prev()` - 被选元素的前一个元素
- `prevAll()` - 被选元素的前面所有元素
- `prevUntil()` - 被选元素到前面指定元素中间的所有元素

# 操作属性节点

## 原生JS操作属性节点

**获取属性节点**：DOM对象.getAttribute("属性节点名称")
**设置属性节点**：DOM对象.setAttribute("属性节点名称","值")

## jQuery中的attr和prop方法

### attr(name|pro|key,val|fn)方法

用于设置或获取属性节点的值

```html
<script>
        $(function () {
            // 1.获取指定属性节点值
            var $res = $(".span1").attr("nj");
            console.log($res);
            // 2.设置属性节点
            $(".span1").attr("nj", "666");
            $(".span2").attr("id", "box1 box2");

            // 3.注意点:
            // 3.1.获取属性节点时,只会获取找到所有元素中第一个元素的属性节点
            $res = $("span").attr("class");
            console.log($res);
             $("span").attr("class", "lnj");
        });
</script>
```

### removeAttr(name)方法

用于删除指定属性节点

```html
<script>
        $(function () {
            // 1.设置属性节点时,会给所有找到元素设置属性节点
            $("span").attr("test", "jonathan");
            // 2.删除属性节点时,会删除所有找到元素的属性节点
            $("span").removeAttr("test");
        });
</script>
```

### prop(name|pro|key,val|fn)方法

用于设置或获取元素的属性值

```html
<script>
        $(function () {
            // 1.设置属性
            // 1.1.设置属性时,会设置所有找到元素的属性
            $("span").prop("demo", "lnj");
            // 2.获取属性
            // 2.1.获取属性时,只会获取找到第一个元素的属性
            console.log($("span").prop("demo"));
        });
</script>
```

### removeProp(name)方法

用于删除指定属性节点

```html
<script>
        $(function () {
            // 删除所有找到元素的demo属性
            $("span").removeProp("demo");
        });
</script>
```

### attr方法和prop方法区别

既然所有的DOM对象，都有一个attributes属性,而prop可以操作属性,所以也可以操作属性节点

官方推荐在操作属性节点时,具有 true 和 false 两个属性的属性节点，如 checked, selected 或者 disabled 使用prop()，其他的使用 attr()

因为如果具有 true 和 false 两个属性的属性节点,如果没有编写默认attr返回undefined,而prop返回false

```html
<script>
        $(function () {
            // 1.可以通过prop获取属性节点
            console.log($("input").prop("class"));
            // 2.可以通过prop设置属性节点
            $("input").prop("class", "tag");

            // 3.如果没有默认值,那么attr获取返回undefined
//            console.log($("input[type=checkbox]").attr("checked"));
            // 4.如果没有默认值,那么prop获取返回false
            console.log($("input[type=checkbox]").prop("checked"));
            // 5.通过attr设置选中
//            $("input[type=checkbox]").attr("checked", true);
            
            // 6.通过prop设置选中
            $("input[type=checkbox]").prop("checked", true)

        });
</script>
```

## jQuery增删Class

jQuery CSS类相关方法都是用于操作DOM对象的class属性节点的值

### addClass(class|fn)

给元素添加一个或多个类

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>08-jQueryCSS类</title>
    <style>
        .class1{
            width: 200px;
            height: 200px;
            background-color: red;
        }
        .class2{
            border: 5px solid #000;
        }
    </style>
    <script src="代码/js/jquery-1.12.4.js"></script>
    <script>
        $(function () {
           $("button").eq(0).click(function () {
               // 1.添加一个类
//               $("div").addClass("class1");
               // 2.再添加一个类
//               $("div").addClass("class2");
               // 3.一次性添加多个类(用空格隔开)
               $("div").addClass("class1 class2");
           });
        });
    </script>
</head>
<body>
<button>添加</button>
<button>删除</button>
<button>切换</button>
<div></div>
</body>
</html>
```

### removeClass([class|fn])

删除元素的一个或多个类

```html
<script>
        $(function () {
            $("button").eq(1).click(function () {
                // 4.删除一个类
//                $("div").removeClass("class2");
                // 5.再删除一个类
//                $("div").removeClass("class1");
                // 6.一次性删除多个类(用空格隔开)
                $("div").removeClass("class1 class2");

            });
        });
</script>
```

### toggleClass(class|fn,[sw])

添加或删除一个类（存在就删除，不存在就添加）

```html
<script>
        $(function () {
            $("button").eq(2).click(function () {
                // 7.切换一个类
//                $("div").toggleClass("class2");
                // 8.切换多个类
                $("div").toggleClass("class1 class2");
            });
        });
    </script>
```

## jQuery操作文本/值

### html([val|fn])

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>09-jQuery代码文本值</title>
    <script src="代码/js/jquery-1.12.4.js"></script>
    <script>
        $(function () {
            var $btns = $("button");
            var $div = $("div");
            $btns.eq(0).click(function () {
                // 1.添加html, 相当于innerHTML
//                $div.html("<p>我是p标签</p>");
//                $div.html("<p><span>我是span标签</span></p>");
                $div.html("我是文本");
            });
            $btns.eq(1).click(function () {
                // 2.获取html
                console.log($div.html());
            });
        });
    </script>
</head>
<body>
<button>添加html</button>
<button>获取html</button>
<button>添加文本</button>
<button>获取文本</button>
<div></div>
</body>
</html>
```

### text([val|fn])

添加或获取元素中的文本

text方法能做的html方法都能做，所以一般使用html方法即可

```html
<script>
        $(function () {
            $btns.eq(2).click(function () {
                // 3.添加文本, 相当于innerText
                // 如下内容不会被转换为标签
//                $div.text('<p>我是段落</p>');
               $div.text('我是文本');
            });
            $btns.eq(3).click(function () {
                // 4.获取文本
                console.log($div.text());
            });
</script>
```

### val([val|fn])

添加或获取元素value属性的值

```html
<script>
        $(function () {
            $btns.eq(4).click(function () {
                // 4.添加value值
                $("input").val("我是一个输入框");
            });
            $btns.eq(5).click(function () {
                // 4.获取value值
                console.log($("input").val());
            });
        });
</script>
```

# 事件处理

## 事件绑定

jQuery中事件绑定有两种方式

**eventName(function() { })**：绑定对应事件名的监听
例如：$('#div').click(function() { });

**on(eventName,function() { })**：通用的绑定事件监听
例如：$('#div').on('click',function() { });

**优缺点**：eventName编码方便，但有的事件监听不支持；on编码不方便，但更通用（能用enentName就用，不能就用on)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>13-jQuery事件绑定和解绑</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .father{
            width: 200px;
            height: 200px;
            background: red;
            overflow: hidden;
        }
        .son{
            width: 100px;
            height: 100px;
            background: blue;
            margin-top: 50px;
            margin-left: 50px;
        }
    </style>
    <script src="../day01/代码/js/jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*
            // 1.通过eventName绑定事件
            $(".son").click(function () {
                alert("son");
            });
            // 2.通过on绑定事件
           $(".son").on("click", function () {
               alert("son");
           });
             */

            // 2.可以多次添加相同类型的监听,后面添加不会覆盖前面添加
            function test1() {
                alert("son1");
            }
            function test2() {
                alert("son2");
            }
            function test3() {
                alert("son3");
            }
            $(".son").click(test1);
            $(".son").click(test2);
            $(".son").on("mouseleave", test3);
        });
    </script>
</head>
<body>
<div class="father">
    <div class="son"></div>
</div>
</body>
</html>
```

## 事件解绑

jQuery中可以通过==off(eventName,function)==;解绑事件

示例:

```html
<script>
        $(function () {
            function test1() {
                alert("son1");
            }
            function test2() {
                alert("son2");
            }
            function test3() {
                alert("son3");
            }
            $(".son").click(test1);
            $(".son").click(test2);
            $(".son").on("mouseleave", test3);

            // 1.1不传入任何参数,移除所有事件
//            $(".son").off();
            // 1.2传入一个参数,移除指定事件
//            $(".son").off("click");
            // 1.3传入两个参数,移除指定事件中的指定回调
            $(".son").off("click", test1);
        });
</script>
```

## 获取事件的坐标

- 当事件被触发时,系统会将事件对象(event)传递给回调函数,通过event对象我们就能获取时间的坐标
- 获取事件坐标有三种方式
  - event.offsetX, event.offsetY 相对于事件元素左上角
  - event.pageX, event.pageY  相对于页面的左上角
  - event.clientX, event.clientY  相对于视口的左上角
- event.page和event.client区别
  - 网页是可以滚动的,而视口是固定的
  - 所以想获取距离可视区域坐标通过event.client
  - 想获取距离网页左上角的坐标通过event.client
- 示例代码



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>13-jQuery事件绑定和解绑</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .father{
            width: 200px;
            height: 200px;
            background: red;
            overflow: hidden;
        }
        .son{
            width: 100px;
            height: 100px;
            background: blue;
            margin-top: 50px;
            margin-left: 50px;
        }
    </style>
    <script src="../day01/代码/js/jquery-1.12.4.js"></script>
    <script>
        $(function () {
            // 获取事件的坐标
            $(".son").click(function (event) {
                // 获取相对于事件元素左上角坐标
                console.log(event.offsetX, event.offsetY);
                // 获取相对于视口左上角坐标
                console.log(event.clientX, event.clientY);
                // 获取相对于页面左上角坐标
                console.log(event.pageX, event.pageY);
            });
        });
    </script>
</head>
<body>
<div class="father">
    <div class="son"></div>
</div>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
</body>
</html>
```

## 阻止事件冒泡

- 什么是事件冒泡?
  - 事件冒泡是从目标元素逐级向上传播到根节点的过程
  - 小明告诉爸爸他有一个女票,爸爸告诉爷爷孙子有一个女票,一级级向上传递就是事件冒泡
- 如何阻止事件冒泡?
  - 多数情况下，我们希望在触发一个元素的事件处理程序时，不影响它的父元素, 此时便可以使用停止事件冒泡



```html
<script>
        $(function () {
            $(".son").click(function (event) {
                console.log(".son");
                // 在子元素中停止事件冒泡,时间不会继续向上传播,所以父元素click方法不会被触发
                event.stopPropagation();
            });
            $(".father").click(function () {
                console.log(".father");
            });
        });
</script>
```

## 阻止事件默认行为

- 什么是默认行为?
  - 网页中的元素有自己的默认行为,例如单击超链接后会跳转,点击提交表单按钮会提交
- 如何阻止事件默认行为?
  - 可以使用event.preventDefault();方法阻止事件默认行为方法



```xml
<script>
        $(function () {
            $("a").click(function (event) {
                var str = $("a").attr("href");
                // 如果超链接是百度就不跳转
                if(str.indexOf("baidu") > 0){
                    // 阻止默认行为
                    event.preventDefault();
                }
            });
        });
</script>
```



```html
<script>
        $(function () {
            $("form").submit(function () {
                var userName = $("input[type='text']").val().length > 0;
                var password =  $("input[type='password']").val().length > 0;
                if(!userName && !password){
                    event.preventDefault();
                }
            });
        });
</script>
```

## 自动触发事件

- 什么是自动触发事件?
  - 通过代码控制事件, 不用人为点击/移入/移除等事件就能被触发
- 自动触发事件方式
  - $("selector").trigger("eventName");
    - 触发事件的同时会触发事件冒泡
    - 触发事件的同时会触发事件默认行为
  - $("selector").triggerHandler("eventName");
    - 触发事件的同时不会触发事件冒泡
    - 触发事件的同时不会触发事件默认行为

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>13-自动触发事件</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .father{
            width: 200px;
            height: 200px;
            background: red;
        }
        .son{
            width: 100px;
            height: 100px;
            background: blue;
        }
    </style>
    <script src="../day01/代码/js/jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*
            $(".son").click(function () {
                alert("son");
            });
            $(".father").click(function () {
                alert("father");
            });

            // trigger会触发事件冒泡
//            $(".father").trigger("click");
//            $(".son").trigger("click");

            // triggerHandler不会触发事件冒泡
//            $(".father").triggerHandler("click");
//            $(".son").triggerHandler("click");
            */

            $("input[type='submit']").click(function () {
                alert("点击了A标签");
            });
            // trigger会触发系统默认事件
//            $("input[type='submit']").trigger("click");
            // triggerHandler不会触发系统默认事件
            $("input[type='submit']").triggerHandler("click");

        });
    </script>
</head>
<body>
<div class="father">
    <div class="son"></div>
</div>

<form action="http://www.baidu.com">
    <input type="text">
    <input type="password">
    <input type="submit" name="sub" value="提交">
</form>
</body>
</html>
```

## 事件命名空间和自定义事件

- **什么是自定义事件?**
  - 自定义事件就是自己虾XX起一个不存在的事件名称来注册事件, 然后通过这个名称还能触发对应的方法执行, 这就是传说中的自定义事件
- 自定义事件的前提条件
  - 1.事件必须是通过on绑定的
  - 2.事件必须通过trigger来触发
  - 因为trigger方法可以自动触发对应名称的事件,所以只要事件的名称和传递给trigger的名称一致就能执行对应的事件方法

```html
<script>
       $(function () {
           $(".father").on("njClick", function () {
               alert("njClick");
           });
           $(".father").trigger("njClick");
       });
   </script>
```

- **什么是事件命名空间?**
- 众所周知一个元素可以绑定多个相同类型的事件.企业多人协同开发中,如果多人同时给某一个元素绑定了相同类型的事件,但是事件处理的方式不同,就可能引发事件混乱
- 为了解决这个问题jQuery提出了事件命名空间的概念
  - 事件命名空间主要用于区分相同类型的事件,区分不同前提条件下到底应该触发哪个人编写的事件
  - 格式: "eventName.命名空间"
- 添加事件命名空间的前提条件
  - 1.事件是通过on来绑定的
  - 2.通过trigger触发事件
- 注意点(面试题!!!面试题!!!面试题!!!):
  - 不带命名空间事件被trigger调用,会触发带命名空间事件
  - 带命名空间事件被trigger调用,只会触发带命名空间事件
  - 下级不带命名空间事件被trigger调用,会冒泡触发上级不带命名空间和带命名空间事件
  - 下级带命名空间事件被trigger调用,不会触发上级不带命名空间事件
  - 下级带命名空间事件被trigger调用,会触发上级带命名空间事件
- 示例:

```html
<script>
        $(function () {
            // 给父元素添加不带命名空间事件
            $(".father").on("click", function () {
                alert("father");
            });
            // 给父元素添加带命名空间事件
            $(".father").on("click.66", function () {
                alert("66 - father");
            });

            $(".son").on("click.nj", function () {
                alert("nj - 向左走");
            });
            $(".son").on("click.66", function () {
                alert("66 - 向右走");
            });
            // 会同时触发NJ和66编写的click事件
            // 事件会冒泡到不带命名空间上级元素和带相同命名空间的上级元素
//            $(".son").trigger("click");
            // 只会触发NJ编写的click事件
            // 事件不会冒泡到不带命名空间上级元素
//            $(".son").trigger("click.nj");
            // 只会触发66编写的click事件
            // 事件只会冒泡到带相同命名空间的上级元素
            $(".son").trigger("click.66");
        });
</script>
```

## 事件委托

- 什么是事件委托?
  - 例如: 张三在寝室不想去食堂吃饭,那么张三可以"委托"李四帮忙带一份饭
  - 例如: 张三先找房,但是对要找房的地点又不熟悉,那么张三可以"委托"中介帮忙找房
  - 所以得出结论:
    - 事件委托就是请其他人帮忙做我们想做的事
    - 做完之后最终的结果还是会反馈到我们这里
- js中事件委托的好处
  - 减少监听数量
    - 添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，因为需要不断的与dom节点进行交互，访问dom的次数越多，引起浏览器重绘与重排的次数也就越多，就会延长整个页面的交互就绪时间
    - 每个监听的函数都是一个对象，是对象就会占用内存，对象越多，内存占用率就越大，自然性能就越差
    - ... ...
  - 新增元素自动有事件响应处理
    - 默认情况下新增的元素无法响应新增前添加的事件
- jQuery中如何添加事件委托
- 添加前
  - $("li").click隐式迭代给界面上所有li都添加了click事件(监听数量众多)
  - 通过$("ul").append新添加的li无法影响click事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>18-jQuery事件委托</title>
    <script src="../day01/代码/js/jquery-1.12.4.js"></script>
    <script>
        $(function () {
            // 1.监听li点击事件
            $("li").click(function () {
                // 弹出当前点击行内容
                alert($(this).html());
            });

            // 2.监听新增按钮点击
            var count = 0;
            $("button").eq(0).click(function () {
                count++;
                // 新增一行内容
                $("ul").append("<li>我是新增内容"+count+"</li>")
            });
        });
    </script>
</head>
<body>
<ul>
    <li>我是第1行</li>
    <li>我是第2行</li>
    <li>我是第3行</li>
</ul>
<button>新增一行</button>
<button>移除事件委托</button>
</body>
</html>
```

- 添加后
  - 格式:$(parentSelector).delegate(childrenSelector, eventName, callback)
  - $("ul").delegate隐式迭代所有ul添加事件(相比开始迭代li,必然ul的个数会少很多)
  - 当事件被触发时,系统会自动动态查找当前是哪个li触发了事件,所以新增的li也能响应到事件

```html
<script>
        $(function () {
            // 1.委托ul监听li的点击事件
            $("ul").delegate("li","click",function () {
                // 前面我们说过事件委托就是让别人帮忙做事,但最终的结果还是会返回到我们手里,所以这里的this是触发事件的li
                // 这里的this之所以是触发事件的li,本质是因为"事件冒泡", 触发事件的li向上传递到ul,触发了click事件.
//                console.log(this);
                // 弹出当前点击行内容
                alert($(this).html());
            });

            // 2.监听新增按钮点击
            var count = 0;
            $("button").eq(0).click(function () {
                count++;
                // 新增一行内容
                $("ul").append("<li>我是新增内容"+count+"</li>")
            });
        });
</script>
```

## 移入移出事件

- mouseenter和mouseleave
  - 移动到子元素**不会**触发事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>14-jQuery移入移除事件</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        .father{
            width: 200px;
            height: 200px;
            background-color: red;
        }
        .son{
            width: 100px;
            height: 100px;
            background-color: blue;
        }
    </style>
    <script src="../code/js/jquery-1.12.4.js"></script>
    <script>
        $(function () {
            // 移动到子元素不会触发事件
             // 2.1移入事件
             $('.father').mouseenter(function () {
               console.log('mouseenter');
             });
             // 2.2移除事件
             $('.father').mouseleave(function () {
               console.log('mouseleave');
             });
        });
    </script>
</head>
<body>
<div class="father">
    <div class="son"></div>
</div>
</body>
</html>
```

- mouseover和mouseout
  - 移动到子元素==会==触发事件

```html
<script>
        $(function () {
             // 2.1移入事件
             $('.father').mouseover(function () {
               console.log('mouseover') ;
             });
             // 2.2移除事件
             $('.father').mouseout(function () {
               console.log('mouseout') ;
             });
        });
</script>
```

- hover
  - 内容监听移入和移出
  - 内部实现就是调用mouseenter和mouseleave

```html
<script>
        $(function () {
            /*
           // 传入两个回调函数,一个监听移入,一个监听移出
            $(".father").hover(function () {
                console.log("mouseenter");
            }, function () {
                console.log("mouseleave");
            });
            */
            // 如果只传入一个方式,那么这个方式既监听移入也监听移出
            $(".father").hover(function () {
                console.log("移入移除");
            });
        });
</script>
```

