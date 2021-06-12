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

# 操作属性结点

