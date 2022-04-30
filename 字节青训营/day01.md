#### 前端技术栈：

![image-20220116100652164](https://s2.loli.net/2022/01/16/slKX93ypkAbWoSE.png)

#### 前端应该关注哪些方面?

美观，功能，无障碍，安全，性能，兼容性，用户体验。。。

#  HTML

浏览器会把HTML代码通过解析转化成DOM树：

![image-20220116101435484](https://s2.loli.net/2022/01/16/q5Lk3urjnFQaPiD.png)

#### 一些比较少见的标签：

- blockquote:块级引用

- cite:短内容引用，一般用于引用书名之类的

- q:也是短内容引用，一般用于引用说的话和内容

- code:代码

#### HTML中的语义化：

- HTML中的元素、属性及属性值都拥有某些含义
- 开发者应该遵循语义来编写HTML

**语义化的好处**：代码可读性；可维护性；搜索引擎优化；提升无障碍性

#### HTML面试侧重点：

语义化和一些HTML的特性上面

# CSS

用来定义页面元素的样式

#### 在页面中使用CSS的三种方式：

- 外链（推荐）：

  ```css
  <link rel="stylesheet" href="/assets/style.css">
  ```

- 嵌入：

  ```css
  <style>
  	li { margin: 0; list-style: none; }
  </style>
  ```

- 内联：

  ```css
  <p style="margin: lem 0">Example Content</p>
  ```

#### CSS是如何工作的：

![image-20220116140227221](https://s2.loli.net/2022/01/16/niLb1927Bpx3Q4a.png)

