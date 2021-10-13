# jQuery基本结构

1. jQuery的本质是一个闭包（立即执行函数）
2. jQuery为什么要用闭包来实现：
   为了避免导入多个框架时变量名重复覆盖的问题
3. jQuery如何让外界访问内部定义的局部变量：
   window.xxx = xxx;
4. jQuery为什么要给自己传递一个window参数：
   为了方便后期压缩代码
   为了提升查找的效率
5. jQuery为什么要给自己接受一个undefined参数：
   为了方便后期压缩代码
   IE9以下的浏览器undefined可以被修改，为了保证内部使用的undefined不被修改，所以需要接收一个正确的undefined

编写自定义jQuery框架的内部结构代码示例：

```javascript
(function( window, undefined ) {
            var jQuery = function( ) {
                return new jQuery.prototype.init( );
            }
            jQuery.prototype = {
                constructor: jQuery
            }
            jQuery.prototype.init.prototype = jQuery.prototype;
            window.jQuery = window.$ = jQuery;
        })( window );
```

# jQuery入口函数

