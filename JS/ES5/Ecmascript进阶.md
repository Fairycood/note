# 对象

* 引用类型的值(对象)是引用类型的一个实例，引用类型是一种数据结构

对象:一些属性和方法的集合

增： 直接用赋值语句进行增加
查： 直接访问属性
删： delete x.name进行删除(用了var操作的属性，不可删除)
修： 直接用赋值语句进行修改

对象未定义的属性会输出undefined

## 对象的创建方法

1. var obj = {} plainObject   对象字面量/对象直接量 实际上使用字面量来创建并不会调用object函数

2. 构造函数
   1)系统自带的构造函数 var obj = new Object();
   2)自定义

   构造函数在命名时严格符合大驼峰式命名规则
   function Person(height) {
       //var this = {
           空对象，通过this加入
       }
       this.name = "xujie";
       this.health = height;
       this.run = function () {
           this.health --;
       }
       //return this;
   }
   var person1 = new Person();

   构造函数的内部原理(三段论)浅层次理解
   1）在函数体的最前面隐式的加上this={}
   2）执行 this.xxx = xxx;
   3）隐式的返回this

* 如果构造函数内部显式的return一个对象， 那么通过new生成的(赋值给this的)对象将会被抛弃， 返回函数显式的定义的对象
* 如果构造函数内部显式的return一个非对象数值， 那么将会返回new生成(赋值给this的)对象， 构造函数内显示定义的非对象数值会被抛弃。

## 点操作符和方括号运算符

* 一般来说访问对象的属性都是使用点运算符，javascript中可以使用方括号运算符来访问属性。
* 优点就是可以通过存储字符串的变量(如果使用变量的话不需要加引号，因为变量里面存储的数据就是字符串类型的)(或者字符串)来访问对象的属性。(终于找到了使用字符串访问函数的方法了)
* 如果属性名中包含会导致语法错误的字符，可以使用方括号来访问例如(obj["first name"]的赋值和访问)
* 而且可以因为[]内是字符串，那么就可以实现属性的拼接。

## 对象属性(特性)的类型 p139 高程

### 数据属性

* 直接通过对象字面量的方式创建的属性
* 可以通过Object.defineProperty()方法来指定某个对象的某个属性来修改一些特性(权限)

### 访问器属性

* 访问器属性不能直接定义，只能通过Object.defineProperty()方法来定义
* 和数据类型类似，不过可以指定某个对象的某个属性的getter和setter函数。也是通过Object.defineProperty()方法定义
* get和set函数和Vue的计算属性类似

### 定义多个属性和读取属性的特征

* Object.defineProperties()支持同时定义某个对象的多个属性的特性
* 可以通过Object.getOwnPropertyDescriptor()方法来访问某个对象的某个属性的特性。返回值是一个对象。在javascript中可以针对任何对象，包括DOM和BOM对象进行访问。

## 对象的创建模式

### 工厂模式

* 使用一个函数封装起来创建对象和给队象赋值的语句。解决了创建多个相似对象的问题，但是没有解决对象的类型识别问题。

### 构造函数模式

* 创建对象时需要使用new 操作符。
* 创建一个新对象
* 将构造函数的作用域赋值给新对象(因此this指向这个新对象)
* 执行构造函数中的代码
* 返回新对象
* 缺点就是在创建函数属性的时候，由于函数是一个对象。所以每一个实例都会有一个函数，他们完成的是相同的事情，所以没有必要。

### 原型模式

* 我们创建的每一个函数都有一个原型属性(prototype)，这个属性是一个指针，指向一个对象。(prototype)就是通过构造函数创建的那些实例的原型对象。所有的对象实例都可以共享原型对象中的属性和方法。
* 所有的对象实例共用的是同一个函数。
* 每个函数在创建时都有一个prototype属性，指向原型对象，原型对象上会自动获得一个constructor属性，这个属性指向prototype属性所在的函数。
* 调用构造函数创建的新的实例，实例的内部包含一个指针(__proto__)，指向构造函数的原型对象。这个连接是在实例与构造函数的原型对象之间，不是实例与构造函数之间。

#### 原型有关的方法

* Object.getPrototype()来获取对象的原型。返回的是原型对象，可以用这个来访问原型上的属性。
* hasOwnPrototype()方法用于检测属性时是存在实例中还是原型中。在实例中会返回true。
* for in 循环 返回的是所有能够通过对象访问的，可枚举的属性。既包括实例中的属性，也包括原型(但是不会打印最顶端Object原型上的属性)中的属性。
* in 操作符会在通过对象能够访问指定属性时返回true。无论存在实例中还是原型中。
* Object.keys()方法，用于得到对象上所有的可枚举的实例属性。不包括原型上的，返回值是一个数组。
* Object.getOwnPrototypeNames()，无论是否可枚举都可以通过这个方法来访问实例上的属性，不包括原型上的，返回是一个数组。

#### 访问实例中的属性

* 在实例中没有找到到指定的属性，就会去实例的原型上找属性。实例中的属性会屏蔽原型上的属性。
* 使用delete操作符可以删除实例上的属性，从而重新访问原型上的属性。

#### 原型赋值方式

* 如果是一条一条的给原型对象上添加值，原型对象的constructor属性指向构造函数，要是直接重写构造函数的原型对象(使用对象字面量的形式)，constructor不在指向构造函数，开始指向Object。(第一种方式的原型对象在构造函数中被构造，第二种方式的原型对象在Object中被构造)(constructor是被自动创建的，它的含义就是当前对象是被谁构造的)
* 使用instanceof仍可以正确识别对象的类型，在第二种方式中使用constructor无法正确识别对象的类型了。

#### 原型的动态性

* 为原型上添加属性，会立刻反映到所有的实例上，因为他们的指针都指向同一个原型对象。
* 但是重写原型对象就不一样了。构造函数的指针就会断了与最初原型对象的引用。在重写之前的实例保留的旧的原型对象，重写之后的实例与新的原型对象建立连接(主要：引用类型数据的数据结构，实例中的指针指向原型，而不是构造函数)

#### 原生对象的原型

* 原型很重要，就连原生的引用类型，都是采用的这种模式(Array,Object,String)
* 但是不推荐在原生对象的原型中随意添加方法。

#### 原型模式的缺点

* 没有构造函数的传递参数这一个环节，所有的实例取得的都是相同的属性。
* 所有的实例的属性都是共享的。对于那些引用类型的属性来说，是不方便的，其中一个实例的修改，会牵扯到所有的实例。

### 构造函数模式和原型模式的结合

* 实例的一些属性由构造函数来定义，方法和共享的属性用原型模式来定义
* 每个实例都会有自己到的实例属性，一个实例的修改不会影响其他实例(还可以初始化参数赋值)，所有的实例共享对于原型上方法的引用，最大限度的节省了内存。

### 动态原型模式

* 属性像构造函数一样定义，原型中需要的方法，可以通过判断语句来动态添加。

### 寄生构造函数模式

* p160 高程

### 稳妥构造函数模式

* 没有this和new，除了对象的方法能访问属性之外，没有 其他把办法可以访问到构造函数中的原始数据。

# Data对象

## data使用国际协调时间(1970年1月1日零时开始)经过的毫秒数进行保存日期

## 创建日期对象

* var date = new Date();
* Date.parse()和Date.UTC()方法。用于创建日期对象，只不过有不同的参数。

## 其他方法

* Date.now()方法，用于返回调用该方法时与标准时间的毫秒数。用于计算时间差。

## 继承对象的方法

* toString()返回字符串格式的日期
* toLocaleString()返回字符串类型的日期
* valueOf(返回日期的毫秒数表示)，因此日期对象可以使用比较运算符进行比较，因为日期对象会调用valueOf()方法来隐式转换自己。

## 日期格式化的方法

* toUTCString()以特定于实现的完整格式完整的UTC日期

## 日期时间组件方法

* getTime()，返回表示日期的毫秒数，与valueOf()的方法返回值是一样的。

# Math对象

## max()和min()用于查找一组数据中的最大值，最小值

## 舍入方法

* Math.ceil()
* Math.floor()
* Math.round()

## random()

* 随机返回一个(0~10)的数字

## 其他方法

* Math.abs(num)返回num的绝对值

# 数组对象

## 数组的定义形式

1. var arr = []; 数组字面量定义 实际上并不会调用Array的构造函数。
2. var arr = new Array(); 数组构造方法定义  所以数组的所有方法来源于prototype.Array()

* 使用构造函数时可以传递参数(指定具体的数据或者指定数组的长度)
* 唯一的区别就是：如果构造方法里面只写一个值，那么这个值会被识别为长度。长度为n的稀松数组

## javascript数组的特点

* js里面的数组十分不严格，几乎不报错。数组是一种特殊的对象。
* 溢出读和溢出写(溢出写的话会重新定义数组的长度)都不会报错。数组中未定义的数据都是undefined
* 由于javascript弱处理性语言，数组的每一项都可以是不同类型的数据
* javascript中的数组大小是可以动态调整的，可以随着数据的添加自动增长以容纳更多的数据。

## length属性

* 获取数组的长度
* 不是只读的 可以通过length属性重新定义数组的长度，数组中未定义的值都是undefined。无论是溢出访问还是访问未定义数据的索引。

## 检测数组

* 在只有一个全局环境下，完全可以使用value instanceof Array ，但是有多个框架(全局环境)的话会存在多个版本的Array构造函数
* Array.isArray(value)用于检测某个值是不是真的是数组

## 数组的检测方式

* valueOf()方法，返回的还是数组本身
* toString()方法，返回的是数组中每个值的toString()方法返回的字符串拼接而成的字符串。(null，undefined没有toString()方法，但是在数组的toString()中会返回""空字符串,每一项拼接之后就是,,)
* toLocaleString()方法，返回的是数组中每个值的toLocaleString()方法返回的字符串拼接而成的字符串。

## 改变数组的方法

1. push()可以接收任意数量的参数，把他们逐个添加到人数组的末尾，返回修改之后数组的长度
2. pop()最后一位剪切，返回移出的项。
3. unshift()可以接收任意数量的参数，把他们逐个添加到数字的开端，返回修改之后的长度
4. shift()第一位剪切，返回移出的项
5. reverse()逆转 将数组的项逆转，返回值是排序后的数组
6. sort()给数组排序 但是sort是字符串比较不是我们想要的数字比较，所以需要我们自己来实现。 返回值是排序完的数组

* 必须写两个形参
* 看返回值  1）当返回值为负数时，前面的数在前面
      2）当返回值为正数时，后面的数在前面
      3）为0 ，不动
  (传参时按照冒泡排序的方式传参)

arr.sort (function (a,b){
    if (a > b) {
        return 1;
    } else {              简化为 return a - b;升序
        return -1;         简化为 return b - a;降序
    }
})

7. splice()从第几位开始，截取多少的长度，在切口处添加新的数据。并且会把截取的数据(返回)出来。参数传负数是从倒数第几位开始切片。
   只填写一个参数就是从参数位直接截到最后一位。截取的话返回值是截取的数据，添加的话返回空的数组。

## 不改变数组的方法

1. arr.concat(arr1)拼接数组(参数除了数组之外也可以是数据)，生成一个新数组。不改变原数组    返回值是一个新的数组
2. slice()从该位开始截取，截取到该位(不包含最后一位，基数从0开始) 如果一个参数就是从该位开始截取，截取到最后一位。 返回值是一个新数组，参数是负数的话就是从倒数第几位开始(也可以是负值加上数组长度)
   join("")参数是什么，就按照什么来连接数组，并且返回字符串。没有参数的话，默认用逗号连接。""就是空字符串，不用任何东西连接。
   split("")参数是什么，就按照什么来拆分字符串，返回数组。(字符串方法)

# 函数对象

## 函数是对象

* 函数实际上是对象，每个函数都是Function类型的实例，而且和其他对象一样都具有属性和方法。
* 由于函数是个对象，因此函数名实际上也是一个指向函数对象的指针，不会与函数绑定。
* 函数是对象，函数名是指针。

## 没有重载

* 因为函数名只是一个指针，在想要进行函数重载时，两个同名的函数，相当于后面的函数覆盖了前面的函数体。

## 函数声明和函数表达式

* 函数声明有预编译(函数提升)，然而函数表达式的预编译过程只是把变量名提升，没有把函数体引用到变量上。

## 函数作为值使用

* 因为函数名本身就是变量，因此函数名可以当做值来使用。
* 要访问函数的指针而不是执行函数的话。只需要使用变量名，不需要使用执行符号(加了()是执行函数)
* 函数名加上()当做实参(a())传入参数时，函数接收到的是a函数的返回值。

## 两个函数会被默认拥有的参数

### arguments(类数组，函数内部的特殊对象)

* arguments是一个类数组对象，这个对象有一个callee的属性。该属性是个指针，指向拥有这个arguments对象的函数。
* 函数名只是一个变量，函数体是一个对象，在使用递归算法时，函数体内的代码执行与函数变量名耦合。为了解耦合使用arguments.callee来代替使用函数的变量名。

### this(函数内部的参数，指向的是函数执行的环境(对象))

* 将函数作为方法来调用对于实现js的面向对象编程至关重要， 可以通过this来引用方法的宿主对象。这是面向对象编程的基本概念。

## caller

* 这个属性中保留着调用当前函数的函数的引用(代码)，如果实在全局中调用这个函数会返回null，在其他函数中使用会返回父函数的代码。
* a函数在b函数中被调用，a.caller就是b函数

## 函数属性和方法

### 属性

* function.length 返回函数的形参个数
* prototype是ECMAScript的引用类型保存实例的真正所在，也就是说toString和valueOf方法都保留在prototype中。prototype是不可枚举的，不能使用for-in。

### 方法

* 每个函数都包括两个非继承过来的方法
* apply()和call()，在特定的作用域中调用函数，实际上等于设置函数体内的this值。
* call(obj，arguments...)必须明确的传入每一个参数,obj是重新指定的执行环境。
* apply(obj,[arguments])可以传入一个参数的数组，obj是重新指定的执行环境。
* 使用这两个方法来扩充作用域的好处是，对象不需要与方法有任何的耦合，函数就可以使用对象作为环境。
* ES5定义了bind方法，可以创建一个函数的实例。其this值会被绑定到传给bind()函数的值。 var b = a.bind(obj);

## 函数继承的方法

* toLocalString(),toString()方法始终都返回函数的代码，但是因浏览器而异。所以无法使用这两个方法实现重要的功能。
* valueOf()方法返回函数的代码

# 类数组

* 实参列表是类数组

属性要为索引(数字)属性
必须要有length
最好有push
var obj = {
    "0" : 'a',
    "1" : 'b',
    "2" : 'c',
    "length" : 3,
    "push" : Array.prototype.push,
    "splice" : Array.prototype.splice(加上splice方法之后，这个对象的表现形式就和数组更加像了)
 }

 Array.prototype.push = function (target) {
     this[this.length] = target;
     this.length ++;
 }
 搞清楚push的原理。如果类数组内的length和他定义的索引有冲突，不能按照正常数组思维来做。
 要严格按照push的方法来执行。

 类数组的好处： 既拥有数组的特性(拥有数组的某些方法)，又拥有对象的特性(可以有属性和方法)，所以存储数据的功能更加强大。

# 包装类

## 基本包装类型

* ECMAScript提供了三个特殊的引用类型Boolean，Number，String，每当(读取)一个基本类型值的时候，后台就会自动创建一个对应的基本包装类型的对象。
* 当访问(设置属性，读取属性，使用方法时)基本类型的时候，后台会自动完成

1. 创建String类型的一个实例
2. 在实例上调用指定的方法
3. 销毁这个实例

### 因此包装类上的很多属性只可以拿来使用(读取),不能用来(操作)属性和(重写)方法。

* Object()类型会和工厂方法一样，根据传入值的类型返回对应的基本包装类型实例。
* 基本包装类型的typeof会返回"object",所有基本包装类型的对象转化为布尔值时为true
* 转型函数和使用new和构造函数不一样。(Number("123")是转型函数，new Number("123")是调用基本类型的构造函数)
* 不建议显示的创建基本包装类的对象。

## undefined和null没有属性

* var num = new Number(123)
* var str = new String("abcd")
* var bol = new Boolean()
* undefined 和 null 不能拥有属性，因为他们没有包装类。

## 基本包装类不能进行自定义属性

* 在原始值直接进行属性的赋值时。会有一个隐式的转换过程(包装类)。让原始值能够进行属性的赋值。虽然不会报错，但是系统会删除赋值语句(全当这个语句没有存在过，不会对数据产生影响)。等你下次使用这个值的是属性时，会再次生成一个包装类，但是没有赋值过程。所以会返回undefined
* 基本类型的对象生命周期只在代码的执行瞬间，所以基本类型无法自定义函数和方法。因为在第二行为test添加属性时，创建了一个对象，第二行代码执行完，这个对象就被销毁了，第三行访问属性时，又是创建了一个新的对象，因此包装类型对象成功访问自定义的属性。

```javascript
var a = "test";
test.color = "red";
console.log(test.color);
```

## Boolean类型

* var a = new Boolean(true/false)来创建一个Boolean对象
* Boolean的类型的实例重写了valueOf()返回基本类型true或者false，重写了toString()返回字符串类型的“true”，“false”
* Boolean对象的typeof结果为“object” instanceof Boolean的结果为true，基本数据类型的Boolean typeof结果为“Boolean” instanceof Boolean的结果为false，
* 因为Boolean对象的布尔值总是true，所以永远不要使用Boolean对象。

## Number类型

* var a = new Boolean(数字)来创建一个Boolean对象
* Number类型的实例valueOf()返回基本类型的数值，toString()toLocaleString()返回字符串形式的数值。
* 可以和对象一样拥有属性和方法，但是经过数字运算之后又变回了原始值数字
* toString()方法
* toFixed()方法按照指定小数位返回字符串类型的数值。 能够自动舍入(四舍五入)
* toExponential()按照指定的小数位返回字符串类型的指数数值
* toPrecision()可能返回固定大小，也可能返回指数大小(系统判断哪个类型更合适就调用哪个)
* Number对象的typeof结果为“object” instanceof Number的结果为true，基本数据类型的Number typeof结果为“Number” instanceof Number的结果为false，
* 最好不要使用Number对象

## String

* var a = new String(字符串)来创建一个String对象
* valueOf(),toString(),toLocaleString()全部都返回基本字符串值。
* length属性返回字符串得长度, 不是字符串有这个属性，而是字符串的包装类有这个属性，你可以访问，但是不能操作length属性，不能和数组一样给length赋值。(因为基本类型包装类的声明周期只有一行代码的时间！！！！)

### 字符方法

* charAt()和charCodeAt()都是基于0的起始位置。
* chartAt()以单字符的形式返回，charCodeAt()以字符编码的形式返回
* 还支持使用方括号(下标的形式)来访问特定位置的字符。

### 字符串操作方法

* concat()连接字符串的方法，用于拼接，可以接受多个参数，但是还是"+"运算符使用的比较多
* 三个创建新的字符串的方法，相似又不相同。p123 高程

### 字符串的位置方法

* indexOf()和lastIndexOf()
* trim()方法不会改变原字符串，返回值是字符串的副本，返回的是消除过字符串前置和后置的空格。

### 字符串大小写转换方式

* toLowerCase(不针对地区),toLocaleLowerCase(针对地区)转化为小写，
* toUpperCase(不针对地区),toLocaleUpperCase(针对地区)转化为大写，

### localeCompare方法

* 用于比较两个字符串在子母表中的位置
* String.localeCompare(String1)

### fromCharCode()方法

* String构造函数有一个静态的方法
* 用于传进来的字符编码转化为单字符

# 正则类型对象

## 转义符号

* 一些特殊的字符想要输出的话，需要使用\转义符号来输出
* \n换行
* \r是行结束
* \t是一个制表符

* 会把\符号后面的所有空格转化为一个制表符

```js
let a = "\
    <div></div>\
    <span></span>\
";

输出：    <div></div>    <span></span>    |
```

## 正则表达式 /RegExp/

* var a = /abc/;的方式来创建
* var a = new RegExp("/abc/");
* 正则表达式中的空格是有意义的
* 贪婪匹配原则，尽量能匹配多就不匹配少

### 正则表达式的修饰符

* i 忽视大小写 reg = /abc/i
* g 全局匹配 使用str.match(reg)的话，如果使用了g属性，会返回所有匹配的片段。reg = /abc/g
* m 多行匹配  var reg = /^a/gm; var str = "abddd/na" 会匹配两个a，因为开启了全局匹配和换行匹配 字符串中有换行符号 所以会匹配两个a

### 方法

* reg.test(str) 是判断字符串中是否匹配正则表达式 返回Boolean
* reg.exec(str) 使用的时候可以和reg的lastIndex属性和reg的g(全局搜索属性)相结合。exec方法每次执行都会更新lastIndex属性值
* str.match(reg)会返回字符串中匹配正则的字段，可以有多个。
* str.replace(reg,'want')使用字符串的这个方法可以用来替换字符。

```js
    let a = reg = /-(\w)/g;
    let b = 'the-first-name';
    // 使用str的replace方法的时候可以自定义想要替换的内容，而不是非要固定的字符串。需要在函数中传入参数。$代表正则匹配的全局，$1代表正则表达式中的第一个子表达式(\w)
    b.replace(a,function($,$1) {
        return $1.toUpperCase();
    }); //theFirstName
```

### 表达式 [] ()

* reg = /[1234567890][1234567890][1234567890]/; 匹配字符串中有没有三个连着的数字
* [0-9][A-Z][a-z][A-z] 这个是匹配区间
* [^a]的意思是非a,^符号写在表达式外面是以什么为开头，写在表达式里面是非的意思
* (jpg|png) ()中的不是范围而是固定的搭配 | 是或者的意思

### 元字符

* \w === [0-9A-z_]
* \W === [^\w]
* \d === [0-9]
* \D === [^\d]
* \s === [\n\f\r\t\v'这里还有一个空格'] \n换行符 \f换页符 \r回车符 \t制表符 \v垂直制表符。并不是说在字符串中有一个手打的制表符就会匹配，而是会匹配字符串中的\n转义字符
* \S === [^\s]
* \b === 单词边界 var str = "|abc| |def|"; |的位置表示单词边界,单词边界不是一个空格，是代表的位置。
* . === [^\r\n] 除了回车符和换行符都能匹配
* 正则表达式中可以使用unicode编码。
* [\w\W]代表的是匹配所有

* 正向预查和正向断言(不参与选择，只参与修饰)

```js
    let a = reg = /a(?=b)/g; //选择那些在a的后面有b的
    let b = 'abaaaa';
    b.match(a) //['a']   只有一个

    let a = reg = /a(?！b)/g; //选择那些在a的后面没有b的
    let b = 'abaaaa';
    b.match(a) //['a','a','a','a']   有四个
```

### 量词 用来修饰元字符或者表达式

* `+` 是可以出现一次到无数次
* `*` 是可以出现0次到无数次
* `?` 是可以出现零到一次
* `{X}` 是可以出现x次
* `{X,Y}` 是可以出现X到Y次
* `{X,}` 是可以出现X到无数次
* 在量词的后面加上一个`?`代表的是非贪婪匹配，能取少的就不取多的 `{2,3}?`的意思就是能取两个就不取三个

### 子表达式 ()

* 如果想要匹配aabb的格式，需要使用到子表达式()和\1
* reg = /(\w)\1\1\1/ 就是匹配字母的aaaa形式
* reg = /(\w)\1(\w)\2/ 就是匹配字母的aabb的形式
* 使用exec的方法来进行匹配检测的话。输出的数组中会有同子表达式匹配的数据

```js
    let a = reg = /(\w)\1(\w)\2/g;
    let b = 'aabb';
    console.log(b.match(a)); //["aabb"]
    console.log(a.exec(b));  //index.html:25 (3) ["aabb", "a", "b", index: 0, input: "aabb", groups: undefined]
```

### 开头符和结尾符

* ^n 以什么为开头
* n$ 以什么为结尾

## 典例

```js
    let reg  = /(\w)\1*/g;
    let str = 'aaaaaaaaaabbbbbbbbbbbbbbbbbccc';
    console.log(str.replace(reg,"$1")); //abc 会把所有字母出现了两个及其以上的替换为一个与之匹配的子表达式
```

# try catch

* try catch块的优点是，当try中的代码有警告的话， 代码不会直接死掉而是可以在catch中尝试解决这个错误
* 还可以使用throw来自定义错误

## Error.name的六种对应的信息

1. EvalError: eval()的使用和定义不一致
2. RangeError： 数值越界
3. ReferenceError：非法或不能识别的引用数值
4. SyntaxError：发生语法解析错误
5. TypeError：操作数类型错误
6. URLError：URL处理函数使用不当

```js
try {
   ...
} catch (e) {
    console.log(e.name + e.message);
}
```

## throw

* throw错误的时候，可以直接throw("..."), 也可以throw一个 Error对象(throw New Error("..."))

## 注意点

* try catch只会对运行时的error有效， 如果代码包含语法的错误，try catch将会无法正常工作
* try中如果包含了计划要执行的函数， 例如setTimeout里面的错误不会被捕捉到()

# 克隆

深层克隆(克隆之后的对象或者数组的改变不会影响到被克隆的对象)
直接复制引用的的话，会把地址也拷贝过来。但是复制原始值得话，不会拷贝地址。
所以一旦有引用值我就自己创建。引用值里面的原始值我才复制。
例如：Person{}我自己创建，但是Person.name我直接拿过来。

function deepClone (origin,target) {
    var target = target || {},  //如果没有传空对象的话，自动创建一个空对象
    tostr = Object.prototype.toString,
    arrStr = "[object Array]";

    for(var prop in origin) {
        if(origin.hasOwnProperty(prop)) {
            if(origin[prop] !== "null" && typeof(origin[prop]) == "object"){
                if(tostr.call(origin[prop]) == arrStr) {
                    target[prop] = [];
                } else {
                    target[prop] = {};
                }
                deepClone(origin.[prop],target[prop]);
            }
        }
        return target;
    }