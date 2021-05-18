[TOC]

## 了解JavaScript

**浏览器组成：**

1.shell 部分——用户能操作部分(壳)
2.内核部分——用户看不到的部分
1)渲染引擎（语法规则和渲染）
2)js 引擎
3)其他模块（如异步）

**JavaScript的特色：**

js 是解释性语言：(不需要编译成文件）跨平台
java 先通过javac，编译成.class 文件，通过jvm（Java 虚拟机）进行解释执行
.java→javac→编译→.class→jvm→解释执行（java 可以跨平台）（java 是oak 语言）
<link rel = “">是异步加载
单线程：同一时间只能做一件事——js 引擎是单线程
（同一时间做很多事叫多线程）

![image-20210513201158306](C:\Users\13pro\AppData\Roaming\Typora\typora-user-images\image-20210513201158306.png)

**JavaScript执行队列：**

![image-20210513201319339](C:\Users\13pro\AppData\Roaming\Typora\typora-user-images\image-20210513201319339.png)

**如何引入JavaScript：**

1、页面内嵌<script></script>标签,写head 里面也行,写body 里面也行

```html
<body>
<script type="text/javascript"> //告诉浏览器我们是js
</script>
</body>
```

2、外部js 文件，引入`<script src="location"></script>`
例如：以lesson.js 保存文件，再引入到html 中
为符合web 标准（w3c 标准中的一项）结构（html）、行为（js）、样式（css）
相分离，通常会采用==外部引入==。
一个文件中可以包括多个css，js——不混用
特殊写页面，大部分写在外部——不混用
如果同时写了内部的js 和外部的js，那么是外部的js 文件显示出来

## JavaScript基础语法：

### 1.变量(variable)

变量声明

命名规则（用接近的英文单词）——起变量名必须要以英文语义化

### 2.基本语法

#### 值类型（数据类型）：

**1）==不可改变的==原始值（栈数据）：**

**Number** 数字,例var a = 123;
**String** 字符串,语言放双引号里，例var a=”语言”，““是空串
**Boolean** 布尔数字,就两个值，false，true
**undefined** 是没有定义的，表示还没赋值,仅一个值underfined
**null** 代表空，占位用，用空值来覆盖

<u>注：已经放进去的值不可改变，只会改房间编号为null（硬盘原理）</u>，例：

```JavaScript
var a =10;
var b = a;
a = 20;
document.write(b);  //输出结果还是10
```

**2）引用值（堆数据）大致放在heap里面：**

array 数组, Object, function ... data,RegExp 正则

<u>注：引用值是把第一个值放到第二个值里面，改第一个值，第二个值也改变</u>，例：

```JavaScript
var arr = [1];
var arr1 = arr;
arr.push(2);
document.write(arr,arr1);    //arr和arrl的输出结果都是[1,2]
```

JavaScript 由值决定类型。原始值和引用值唯一的不同是赋值形式不同

![image-20210513204506383](C:\Users\13pro\AppData\Roaming\Typora\typora-user-images\image-20210513204506383.png)

var a = 10;var b =a；是a 先取出10，copy 一份放到b 里面，改变a 的值，b 的值是不
变的，再把a=20;时b 的值还是10，不发生改变

#### JavaScript语句基本规则

1、语句后面要用分号结束“；”但function test(){}，for(){}，if(){}后面都不用加分号
2、js 语法错误会引发后续代码终止，但不会影响其它js 代码块
错误分为两种
3、书写格式要规范，“= + / -”两边都应该有空格

## JavaScript运算符

### 1.运算操作符

 **+：**   1).“+”作用：数学运算、字符串链接
          2).任何数据类型加字符串都等于字符串

**%：**   模，取余数
其余：“-”，“*”，“/“，“%”，”=“，“( )”，“++”，“--”，“+=”，“-=”，“/=”,“\*=”,“%=”

### 2.比较运算符

“>”，”<”，”==”，“>=”，“<=”，”!=”比较结果为boolean 值（字符串的比较，比的是ASCLL码）
其余：“\==”,“>=,<=”,“\=\==”

### 3.逻辑运算符

“&&”，“||”，“!“

## 条件语句

### 1.if语句

if、if else

**if与&&的相互转换**

### 2.switch case条件判断语句

switch(条件){
case 写条件：里面判是否相符：
如果相符合就执行case 后面的语句比如console.log(‘a’)
}
switch 不负责任，如果判断了a 是符合条件的，也会把后面的连带打印出来
要加个break才可以终止语句

## 循环语句

### 1.常见循环

for、while、do while

### 2.break，continue

## 类型转换

### 1.typeof操作符

typeof 能返回的六种数据类型（区分数字类型）
number、string、boolean、undefined、object、function

typeof(a)返回的六种类型的值（number、string、boolean、undefined、
object、function）都是字符串

### 2.显示类型转换

**Number(mix)**：把括号里的东西转换成数字

**parseInt(string,radix)**：转换成整数，第一个参数是要转换的字符串，第二个参数是结果要显示的进制数

**parseFloat(string)**：转换成浮点数（parseFloat 从数字类开始看，看到除了第一个点以外的非数字类为截止，返回前面的
数）

**toString**：把谁转换成字符串，就写成谁.toString（undefined和null不能用toString）

**String(mix)**：无论mix是啥都转换成字符串

**Boolean( )**：转换成布尔值false或true

### 3.隐式类型转换

隐式类型转换内部隐式调用的是显示的方法
隐式类型转换包括isNaN () ，++，--，+/-（一元正负），+，*，% ，，&&，|| ，！，<，>，<= ，>= ，== ，!=

## 函数functiom

### 1.定义

**函数声明**：定义一个函数可以先写一个function,函数就是另一个类型的变量

function 函数名称(  ){
       函数体
}
函数名起名：开发规范要求，函数名和变量名如果由多个单词拼接，必须符合==小驼峰原则==（第一个单词首字母小写，后面的首字母大写）

**函数表达式**：

1）命名函数表达式

2）匿名函数表达式（常用，一般说的函数表达式就是匿名函数表达式）

**2.组成形式**

函数名称，参数（js 参数不限制位置，天生不定参数在每一个函数里面都有一个隐式的东西arguments 这个是实参列表），返回值（return）

## 作用域

定义：变量（变量作用于又称上下文）和函数生效（能被访问）的区域
全局、局部变量

函数里面的可以访问外面的全局变量
函数外面不能用函数里面的。里面的可以访问外面的，外面的不能访问里面的，彼此独立的区间不能相互访问

```JavaScript
function test(){
var a =123;
function demo(){
var b = 234;
document.write(a); 可以访问a
}
demo();
document.write(b); 不能访问b
}
```

**JavaScript运行三部曲**：语法分析——预编译——解释执行

### 预编译

**函数声明整体提升**：函数不管写到哪里，都会被提到逻辑的最前面。所以不管在哪里调用，本质上都是在后面调用

**变量声明提升**：`var a = 10`中把var a提升到最前面，原处则为a = 10

1）imply global 暗示全局变量：即任何变量，如果变量未经声明就赋值，此变量就为全局对象(就是window)所有
2）一切声明的全局变量，全是window 的属性

预编译是发生在函数执行的前一刻

**函数预编译的四部曲**：

1.创建AO 对象Activation Object(执行期上下文，作用是理解的作用域，函数产生
的执行空间库)
2.找形参和变量声明，将变量和形参名作为AO 属性名，值为undefined
相当于AO{
                   a : undefined,
                   b : undefined
                 }
3.将实参值和形参统一（把实参值传到形参里）
4.在函数体里面找函数声明，值赋予函数体
（先看自己的AO，再看全局的GO）

**全局的预编译三部曲**：
1、生成了一个GO 的对象Global Object（window 就是GO）
2、找形参和变量声明，将变量和形参名作为GO 属性名，值为undefined
3、在函数体里面找函数声明，值赋予函数体

**先生成GO还是AO**？
想执行全局，先生成GO，在执行的前一刻生成AO
在几层嵌套关系，近的优先，从近到远，有AO就看AO，没有就看GO

**[[scope]]**:每个javascript 函数都是一个对象，对象中有些属性我们可以访问，但有些不可以，这些属性仅供javascript 引擎存取，[[scope]]就是其中一个。[[scope]]指的就是我们所说的作用域,其中存储了运行期上下文的集合。
**作用域链**：[[scope]]中所存储的执行期上下文对象的集合，这个集合呈链式链接，我们把这种链式链接叫做作用域链。
**运行期上下文**:当函数在执行的前一刻，会创建一个称为执行期上下文的内部对象。一个执行期上下文定义了一个函数执行时的环境，函数每次执行时对应的执行上下文都是独一无二的，所以多次调用一个函数会导致创建多个执行上下文，当函数执行完毕，执行上下文被销毁。
**查找变量**：在哪个函数里面查找变量，就从哪个函数作用域链的顶端依次向下查找。

```JavaScript
function a() {
   function b() {
       var bb = 234;
       aa = 0;
   }
   var aa = 123;
   b();
   console.log(aa);
}
var glob = 100;
a();       //输出结果为0
```

**理解过程**：bb 的AO 是拿到aa 的AO，就是同一个AO，bb 只是引用了aa 的AO，GO 也都是同一个。function b(){}执行完，干掉的是b 自己的AO（销毁执行期上下文）（去掉连接线），下次function b 被执行时，产生的是新的b 的AO。b 执行完只会销毁自己的AO，不会销毁a 的AO。function a(){}执行完，会把a 自己的AO 销毁【会把function b 也销毁】，只剩GO（回归到a 被定义的时候），等下次function a再次被执行时，会产生一个全新的AO，里面有一个新的b 函数。。。。。。周而复始

## 闭包

**内存泄漏**：当内部函数被保存到外部时，将会生成闭包。闭包会导致原有作用域链不释放，造成内存泄露。内存泄漏就是内存占用，内存被占用的越多，内存就变得越来越少了，就像内存被
泄露了一样

```JavaScript
function a() {
    function b{
       var bbb = 234;
       console.log(aaa);
    }
    var aaa = 123;
    return b;
}
var demo = a();
demo();       //结果可以输出123
```

return b 是把b（包括a 的AO）保存到外部了（放在全局）
当a 执行完砍掉自己的AO 时，b 依然可以访问到a 的AO(因为return b)
==但凡是内部的函数被保存到外部，一定生成闭包==

```JavaScript
function a() {
  var num = 100;
  function b() {
    num++;
    console.log(num);
  }
  return b;
}
var demo = a();
demo;       //101
demo;       //102
```

**闭包的作用**：

1.实现公有变量
2.可以做缓存（存储结构）
3.可以实现封装，属性私有化
4.模块化开发，防止污染全局变量

### 立即执行函数

**定义**：此类函数没有声明，==在一次执行过后即释放==（被销毁）。适合做初始化工作。
针对初始化功能的函数：只想让它执行一次的函数
立即执行的函数也有参数，也有返回值，有预编译

**写法**：
1.(function( ) {   }( ))
2.(function( ){   })( )

**闭包的防范**：闭包会导致多个执行函数共用一个公有变量，如果不是特殊需要，应尽量防止这种情况发生

## 对象

属性的增、删（关键字delete）、改、查

**创建方法**：
1.var obj = {  }  对象字面量/对象直接量planObject
2.构造函数
    1）系统自带的构造函数Object()：new Object();Array();Boolean();Date();
    2）自定义：Object.creat

### 构造函数

必须用==new== 这个操作符，才能构造出对象
构造函数必须要按照==大驼峰式==命名规则，但凡是构造函数就要大写

**内部原理**：前提必须要加new，以下三步都是隐式的：
1.在函数体最前面隐式的加上var this = {} 空对象
2.执行this.xxx = xxx;
3.隐式的返回return this

### 包装类

