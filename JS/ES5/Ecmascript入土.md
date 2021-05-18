# 函数是一等公民

* 函数拥有对象的所有能力，函数可以被看成任意类型的对象。

## 回调函数

* 会被其他函数在随后的某个合适的时间点回来调用的函数，就叫做回调函数。(不一定非要是异步的)
* setTimeout(() => {return 123}) 函数在被使用的地方被定义， 易于理解。
* 回调函数会产生闭包

## 利用函数可以赋属性的特点

* 存储函数的唯一集合(利用属性来当做标记)
* 实现自记忆函数(利用属性来存储值)

## this

* 参数this表示被调用函数的上下文**对象**
* 函数的内部有隐式的this和arguments**参数**
* 参数this是javascript**面向对象编程**的基本要素之一

## 函数调用

### 函数被直接调用叫做函数

* 全局函数直接被调用在非严格模式的this是window
* 全局函数直接被调用在严格模式的this是undefined

### 函数作为对象的属性被调用叫做方法

* 将函数作为方法调用对于实现javascript的面向对象编程十分重要，这样就可以通过this在任何方法中引用该方法的宿主对象， 这也是面向对象编程的一个基本概念。

### 函数作为构造函数来调用

* 通过new来调用函数时，会自动生成一个对象，并赋给函数的this参数
* 构造函数和普通函数的定义方式要区别开

```js
// 很有趣的现象 在构造函数中使用箭头函数
// 箭头函数中的this就是上级作用域的this 也就是Button构造函数的this
// 构造函数Button的this指向的就是使用new生成的赋值给this的实例对象
// 所以buttonA.click在调用时 里面的this永远指向 buttonA
function Button() {
        this.clicked = false;
        this.click = () => {
            this.clicked = true;
            console.log(this.clicked);
            console.log(buttonA.clicked);
        }
    }
    let buttonA = new Button()
    const btn = document.getElementById("button")
    btn.addEventListener("click", buttonA.click)
```

```js
// 要是没有使用构造函数 那可就更有趣了
// buttonA中的click箭头函数的this指向window
// 所以说不适合在对象字面量中使用箭头函数
let buttonA = {
        clicked: false,
        click:  () => {
            this.clicked = true;
            console.log(this.clicked);
            console.log(buttonA.clicked);
        }
}
    const btn = document.getElementById("button")
    btn.addEventListener("click", buttonA.click)
```

### 函数使用call和apply调用

* 可以使用这两个方法来强制性的改变函数的this的指向(函数的this的指向就是函数的运行上下文)

## 执行期上下文

* 在javascript中，代码执行的基础单位是函数
* 在谷歌浏览器的调试工具中可以看到执行上下文栈的情况

## 函数上下文和执行期上下文

* 函数上下文值的是函数的this参数的指向，是在函数被调用的时候确定的。
* 执行期上下文是函数能访问变量的作用域集合， 是在函数被定义的时候就确定的

# 预编译

## js执行三部曲

1. 语法分析，通篇扫描
2. 预编译 //1.函数声明 整体提升     2.变量声明 提升
3. 解释执行

## 暗示全局变量

* imply global 暗示全局变量 如果有变量未经声明就赋值，此变量就为全局对象（window）所有
* 一切声明的的全局变量，全是window的属性 （window就是全局的域）

## 预编译：四部曲（预编译发生在函数执行前一刻）

### 函数内实现预编译

1. 创建AO（执行期上下文）对象
2. 找形参和变量声明，将变量和形参作为AO属性名，值为undefined。（变量 只有声明提升）
3. 将形参和实参值统一
4. 在函数体里面找函数声明(函数声明的函数表达式是完全不同的)，将函数名作为AO属性名，值为函数体。（函数声明整体提升）
   ！！预编译看过了变量声明，和函数声明所以在函数执行期间就不会再看了。因为已经看过一遍了，执行赋值的过程。

### 全局内实现预编译

1. 创建GO对象
   Go {

}GO === window

2. 找变量声明，将变量作为AO属性名，值为undefined。（变量 只有声明提升）
3. 在函数体里面找函数声明，将函数名作为AO属性名，值为函数体。（函数声明整体提升）

## ！！！！！！！！注意的知识点

1. 全局变量和局部变量的作用域（如果函数内找不到需要的局部变量就要去全局变量里去找）
2. argument和形参相映射
3. 如果有变量未经声明就赋值，此变量就为全局对象（window）所有
4. 不管语句能不能执行（比如if语句中有变量声明，也要写出来）都要按照流程提升。不过是否执行需要具体判断
5. if 里面定义一个function()(在谷歌浏览器中执行不会报错，但是预编译找不到这个函数声明)
6. 没有var的变量不会变量提升，且被放置在全局作用域中。

# 作用域(词法环境)

一切为对象的东西都有属性和方法

**[[scope]]**： 每个javascript函数都是一个对象，对象中的属性我们可以访问，但有些不可以，这些属性仅供javascript引擎
存取，[[scope]]就是其中一个，指的是我们所说的作用域链，其中存储了运行期上下文的集合。

* 作用域链： [[scope]]中所存储的执行期上下文对象的集合，这个集合呈链式连接，我们把这种链式连接叫做作用域链。
* 作用域链本质上是一个指向变量对象(执行期上下文)的指针列表，它只包含引用不包含变量对象。
* 函数被(定义)时的作用域是所处环境的执行期上下文
* 运行期上下文： 当函数(执行)时，会创建一个称为执行期上下文的对象(预编译产生)。一个执行期上下文定义了一个函数执行时的环境，
* 函数在哪里被定义和在哪里被执行时完成不同的概念(一个函数被定义在某个函数里面，就能得到父函数的执行期上下文，一个函数在另一个函数内被执行，只是被执行，得不到该函数的东西)。执行期上下文是一个对象，父子函数拿到的执行期上下文有相同的引用，也就是数据公用，可以一起更改数据。(闭包就是因为这个产生的)
* 函数每次执行对应的执行期上下文都是独一无二的，所以多次调用一个函数会导致创建多个执行期上下文(所以说一个函数多次被调用，前一次调用对值的修改，不会影响到下一次的执行。
* 当函数执行完毕时。函数预编译所产生的自己的执行期上下文被销毁。初始的所处环境的作用域链仍存在。
* 查找变量： 从作用域链的顶端依次向下查找
* 通常函数在那个环境被定义就要在那个环境被调用，因为只有他的父级环境的执行期上下文中才有存储它的变量(除非子函数被当做返回值返回出去)

## 例子分析

function a () {

}

a 被定义时 a.[[scope]] --> 0 : GO {}

a 被执行时 a.[[scope]] --> 0 : AO {}
                        1 : GO {}

函数被定义时的作用域链是所处环境的执行期上下文
如果function a() {}里面有一个function b() {}
则b刚刚被定义时继承a的作用域链    b.[[scope]] --> 0 : AO {}
                                               1 : GO {}

* ！！！b的作用域链中的aAO就是a的作用域链中的aAO！！！

1. b的作用域链被销毁时只是把执行时创建的本身的AO销毁，被定义时继承的来自a的执行期上下文没有被销毁，等待下一次的执行。
2. a的作用域链被销毁时也是把执行时创建的AO销毁，被定义时继承的GO没有被销毁，但是因为b函数定义在a函数里，所以b函数被销毁。
3. 只有自己创建的执行上下文被销毁，而所处环境的执行期上下文不被销毁是理解作用域链(闭包的产生，函数每次调用，不受上一次函数调用时值的修改的影响)的关键

## 延长作用域链的方法

1. with()把指定的对象添加到作用域链的顶部。with代码块内部获取变量时在新添加的作用域内查找，但是运算产生的新的变量会放到上一层的作用域中
2. 对于catch语句来说，会创建一个新的变量对象，其中包含的是被抛出错误对象的声明

# 原型链 原型

* 对象的原型中有constructor(可以手动改变)。constructor里面是对象的构造函数。

## 构造函数内部原理三段论的深入理解

```JavaScript
var this = Object.create(Person.prototype)
var  this = {
    __proto__: Person.prototype
}
```

只有第一步不一样   隐式的构造的this对象，并不是真的空的。里面有__proto__指向的原型(所以说具体的对象是从__proto__指向的
空间里取值，而不是直接从Person.prototype地址中取数据。地址的指向可以人为改变，导致不指向系统自动生成的原型。)

## 原型链

* 原型链：Object.prototype是绝大多数对象(因为Object.create(null)的存在)的原型链终点(里面有很多属性)。
* Object.prototype没有__proto__了，因为它是终点。
* 手动定义的原型链因为原型是构造函数的实例，实例上有__proto__属性指向他的构造函数的原型，但是手动定义的原型链一定会有一个终点，比如一个Person构造函数是手动定义的终点，但是这个构造函数的原型里面也有一个__proto__属性，指向Object的原型，这个是因为系统自带的。

### 原型链上的属性更改

* 原型链上的属性一般来说都不可以通过子代来进行增删改查。
* 原型链可以通过子代修改父类的对象类属性。这是引用值自己的修改。这是一种调用方法的修改。

## Object.create()

* var obj1 = Object.create(原型);
* 就会把原型参数当做obj1的原型 不可以手动添加原型，但可以手动修改已有原型。

* var obj = Object.create(null); 这个对象没有任何的继承下来的方法可以使用。
* obj是没有原型的，手动加上原型是没有用的。

* undefined就是一个原始值，它没有原型，所以没有toString方法
* null也没有原型，也没有toString

## toSting()方法

1. Object有toString方法，它底下的Number，String，Array等包装类都重写了toString方法，所以不同类型的数据调用toString方法
   输出各异
2. document.write其实隐式调用了toString方法

# 继承发展史

1. 传统形式   -->原型链
   过多的继承了没用的属性

2. 借用构造函数和call
   不能继承借用构造函数的原型
   每次构造函数都要多走一个函数

3. 共有原型
   缺点父子都共用一个原型，子构造函数不能够单独添加自己想要的属性，一更改就会父构造函数跟着变。

4. 圣杯模式
   通过一个中间件来继承，既能够继承同时又能拥有自己单独的属性。

   ```JavaScript
   function inherit(Target,Origin) {
       function F() {};//中间件
       F.prototype = Origin.prototype;
       Target.prototype = new F();
       Target.prototype.constuctor = Target;//修正Target的构造函数指向
       Target.prototype.uber = Origin.prototype;//表明函数的最终父类是谁
   }
   ```

   高端的方法

   ```JavaScript
   var inherit =(function(){
       var F  = function(){};
       return function (Target,Origin){
           F.prototype = Origin.prototype;
           Target.prototype = new F();
           Target.prototype.constuctor = Target;
           Target.prototype.uber = Origin.prototype;
       }
   }());
   ```

   使用了闭包把var F当做一个私有变量。

## 原型链继承

## 原型链继承操作

* 把一个构造函数的实例当做另一个构造函数的原型。

### 确定原型和实例的关系

* 使用instanceof()来测试实例的原型链中是否出现过该构造函数 (person instanceof Person)
* 成哥的理解 A instanceof B 就是看A对象的原型链上 有没有 B的原型
* 使用isPrototype()来测试实例的原型链中是否出现过该原型(Person.prototype.isPrototype(person))

### 在哪个时期定义方法和继承原型

* 由于原型是一个对象，引用类型的数据。在原型继承之后再进行方法的定义会把方法定义在正在被引用的原型上，在原型继承之前的方法定义，会把方法定义在了旧的系统生成的原型上，然后进行继承的话，旧的原型被抛弃了。方法没有办法被实例正常访问。
* 不能使用对象字面量的形式定义方法，和上一条的原理一样。

### 原型链继承存在的问题

* 还是因为属性是所有实例共享的，引用类型的数据共享，回导致所有的实例共同操作一个引用值。
* 不能够初始化参数

## 借用构造函数和call

## 借用构造函数和call的操作

* 在子类构造函数的内部调用父类构造函数。通过call改变this的指向，借用父类构造函数来为自己赋值(可以传递参数)。

### 构造函数和call继承的缺点

* 方法都在构造函数中定义，函数的复用性无从谈起。
* 无法借用构造函数的原型。
* 无法使用instanceof()和isPrototypeOf()方法来识别对象的类型。

## 组合继承

### 组合继承的操作

* 使用原型链来实现对原型上自带属性的继承，和方法的继承
* 使用构造函数实现对实例的属性的继承。
* 可以使用instanceof()和isPrototypeOf()方法来识别对象的类型。

## 原型式继承

* 高程 p170
* Object.create()方法，在一个对象的基础上建立一个新的对象。

## 寄生时继承

* 高程 p171

## 寄生组合式继承

* 高程 p172

# 闭包

闭包: 当内部函数被保存到外部时(使用return返回一个函数， 使用外部的变量接受函数， 使用构造函数return一个对象，对象的方法是个函数)，将会生成闭包，闭包会导致原有的作用域链不释放，造成内存泄漏(内存占用，剩的空间变少)。
闭包会一直持有父函数的执行期上下文(活动对象)，导致占用内存不被清除，造成内存泄露。有必要的话把在父函数末尾把一些对象设置为null，这样有利于回收机制回收内存。
被保存到外部的这个函数，自己预编译产生的执行上下文每次在执行自己时会重新创建一个新的，所以自己执行期上下文里面的变量不会受到
上次调用的影响，但是自己父级的执行期上下文一直保留没有被释放，导致每次重复执行函数时，父级的变量会受上次调用的影响。

## 闭包的应用

1. 实现公有变量    不依赖外部变量，而且能反复执行的累加器
2. 可以做缓存（存储结构） 相当于一个仓库(父函数返回多个子函数，这些子函数都会操作一个共同的变量)
3. 可以实现封装，属性私有化(高程的p186私有变量要去看看)
   因为闭包的存在，在(构造函数)里面var一个属性。其中有很多方法使用到了这个属性。
   构造结束后，构造函数释放函数作用域，通过函数不能再直接访问到这个属性。
   但是由于构造函数隐式的返回this(this就是一个对象实例)。而this中有很多方法使用了这个属性。还保留着对于这个属性的应用。
   所以可以通过方法来访问这个属性。(类似于java中的私有变量)

```js
function Xu() {
        let counter = 0;
        this.add = function() {
            counter++;
        }
        this.getCounter = function() {
            return counter;
        }
 }
 const xujie = new Xu();
 let a = xujie.getCounter() //0
 xujie.add()
 let b = xujie.getCounter()//1
```

4. 模块化开发，防止污染全局变量

```javascript
function test () {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        arr[i] = function () {
            document.write(i +" ");
        }
    }
    return arr;
}

var myArr = test();
for(var j = 0; j < 10; j++) {
    myArr[j]();
}
```

输出结果：10 10 10 10 10 10 10 10 10 10

解析：这是一个闭包的问题 函数test内包含一个for循环，每个循环里都有一个函数表达式的赋值。
相当于是一个一对十的闭包。里面的是个函数表达式共用一个变量i。

```javascript
arr[i] = function () {
            document.write(i +" ");
        }
```

函数定义的时候并不会被执行，比如这些代码的含义相当于
        arr[i] = 一个函数返回值
但是函数返回值是多少系统也并不知道。只有当这个函数执行之后才会知道函数的返回值是多少。
也就是说等 ```myArr[j]();```这条语句执行完之后才会知道函数的返回值是多少。
因为for循环所以function test内的变量i累加到了10，才终止循环。
test函数执行完后，切断了test的执行期上下文，但是由于闭包的存在十个小函数依然保留着与test函数的执行期上下文的联系
因此等到十个内部函数执行时，每个函数都会读取出最后为10的i变量。

！！！解决方法 用闭包解决闭包问题 让一对十的闭包问题，转化为十对十的闭包问题。
原来是十个子函数对应着一个主函数。公用一个i变量。
现在使用了立即执行函数(或者是只使用一个let也可以实现)。是每个孙函数都对应一个子函数(立即执行函数)
实现的一个重点就是函数是按值传递的，闭包的产生是因为好多函数都带有对同一个变量的引用，使用立即执行函数之后，按值传递。
每个新加的立即执行函数对应着一个新的变量。

```javascript
function test () {
    var arr = [];
    for (var i = 0; i < 10; i++) {
       (function(j){
            arr[j] = function () {
            document.write(j +" ");
        }
       }(i))
    }
    return arr;
}

var myArr = test();
for(var j = 0; j < 10; j++) {
    myArr[j]();
}
```

逗号运算符
(a,b)先运算前面的表达式，然后运算后面的表达式。最后输出后面的表达式

var x = 1;
if(function f() {}) {
    x += typeof f;
}
console.log(x);
输出：1undefined

if后面的()把里面的函数声明变成了表达式。因为函数声明不是那六个转换之后为false其中之一，所以if后面的语句可以执行。
并且函数名称f消失。typeof(f)为"undefined"
x += typeof f    1 + "undefined"   结果为 1undefined

# 立即执行函数    

不是专门制定发布的，而是通过()的特性研发的

## 针对初始化功能的函数，执行完之后立刻被销毁

```javascript
    var num = (function (a,b,c){
    var d = a + b + c;
    return d;
}(1,2,3));
```

* 变量num是存储返回值的，而不是用来存贮该函数的，该函数立刻被执行

## 两种写法

1. (function(){}())    W3C建议第一种

2. (function(){})()

> 原理就是()既可以把函数声明转化为表达式， 同时又是执行符号
> 如果function(){}外部不加()解析器会认为这是一个函数声明(因为直接看到了function关键字，却没有被赋值给变量)，并且没有必要的函数名，所以会报错
> 要是在function(){}外部加上了(),解析器就会意识到这是一个表达式。
> 不仅仅只有()才能把函数声明转化为函数表达式， +function(){} -function(){}等一元运算符都能把函数声明转化为表达式

//只有表达式才能被执行符号执行    ()叫执行符号
//能被执行符号执行的函数会被忽略名字，相当于立即执行函数

1. 函数声明后面加括号不能被执行且会报错(除非后面的括号里有参数，系统为了尽量不报错，不会把它当做执行符号来看，但是也没有结果，没有意义)

```javascript
function test () {
    console.log(a);
}()
```

1. 函数表达式后面加括号能够被执行

```javascript
var test = function () {
    console.log(a);
}();
```

# this

注意**this是函数内部的自动生成的一个参数**

1. 在js中，使用new调用构造函数时，在实例的方法内部引用this时，指代的是这个新的实例(新对象)
2. this指的是函数运行时(不是定义)所在的环境(对象)(不是作用域！！！),在哪个环境被调用。
3. 任何函数的内部this的值永远不会是静态的，它总是在每次调用函数时确定，但在函数实际执行其代码之前就已确定。函数内部的this的值实际上是由调用该函数的父范围提供的，更重要的是，实际函数语法的编写方式。每当调用函数时，我们都必须查看方括号/括号“（）”的紧靠左侧。如果在括号的左侧可以看到一个引用，则传递给函数调用的“ this”的值正是该对象所属的
4. 在事件处理程序中，在动态绑定中，关键字this永远指向的是触发它的元素。在行内绑定函数时，函数里面的this指的是window。没有绑定方法而是直接在元素中指定了语句，这时的this就是元素本身。
5. this永远指向一个对象(数组也可以被当做this的指向,当数组里面存的是函数的时候  ```test[0]()```)
6. this的指向完全取决于函数调用的位置
7. 谁.function()那么这个this就指向谁，和函数在谁内部执行没有关系。主要就是看(.),比如一个函数在另一个函数内被执行，但是没有谁.这个函数，函数的this就是执行window，不考虑作用域关联。(因为函数可以被单纯当做值来调用，在不同的环境中this执行不同)
8. this中的环境对象和作用域完全不是一个概念
9. 非严格模式下，全局中的函数的this指向window， 严格模式下，全局中的函数的this指向undefined。

```javascript
var foo = {
    baz: function() {
        alert(this);
    }
}
foo.baz(); // foo - because baz belongs to the foo object when invoked

var anotherBaz = foo.baz;
anotherBaz(); // global - because the method anotherBaz() belongs to the global object when invoked, NOT foo

```

1.函数预编译过程中this指向windows(起始的时候都是指向window，后来随着环境的改变(谁.了函数)而改变this的指向)
2.全局作用域里this指向的是windows
3.call/apply能够改变this的指向
4.obj.func(); func()里面的this指向obj

## call/apply

* 改变this指向
* 默认方法的调用使用.call(obj,a,b,c) 用别人的方法实现自己的功能，所有函数的调用本质上都是使用了call函数。```js obj.say() === obj.say.call(null)```
* apply(obj,[a,b,c])的区别就是传递参数时的不同
* call/apply的this传递null的时候就是不起作用，正常执行函数

## bind

```js
    const obj = {
      name: 'xujie123',
      say() {
        console.log(this.name);
      }
    }
    const b = {
     name: 'xiaohan'
    }
    //  使用bind生成一个新的函数，这个函数的this值永远的被绑定在了 b这个对象上
    let newSay = obj.say.bind(b);
    // 直接执行bind就相当于每次都执行了一个(使用call改变了this指向的)函数一样
    newSay();
```

### bind使用call实现

```js
    const obj = {
        name: 'xujie123',
        say(a, b) {
            console.log(this.name + a + b);
       }
    }
    const b = {
        name: 'xiaohan'
    }
    // 使用call和闭包来实现bind方法
    let newSay = function(...arg) {
        return obj.say.call(obj,...arg)
    }
    // 直接调用方法，函数的this一直指向对象b
    newSay('hello', 'world');
```

## 对象中的this

```js
// 不是说只有函数中才有this这个概念 概念理解有误差
// 对象里面也有this这个属性，只不过对象中的this和他外面的最接近的作用域(作用域有函数作用域和全局作用域)的this一样 概念理解有误差
// this是函数的一个参数，是函数的独有的(window中的this为window，在严格模式修正为undefined)。对象并没有自己的this。对象中的this不过只是它所处的函数的this
const a = {
      a: this,
      name: 'xujie',
      say() {
        console.log(this);
      },
      b: {
        c: this
      }
    }

    a.say(); // 对象a
    console.log(this) //window
    console.log(a.a); //window a对象的最外层的作用域是全局，所以this指向window
    console.log(a.b.c); //window  c对象的最外层作用域也在全局，所以this也是指向window(尽管b对象定义在a对象内部，但是没有用，对象没有作用域这个概念)

// b对象定义在a对象的say方法里面，因为a的say方法是通过a.say调用的
// 所以a的say方法中的this指向的是a对象
// 因为b对象是被定义在say()函数中的，所以b对象中的this于他外面的最接近的作用域相同(也就是say函数)，所以说b对象中的this指向a对象
     const a = {
     name: 'a',
     say() {
       const b = {
         name: "b",
         c: this
       }
       console.log(b.c);
     }
   }

   a.say()

```

