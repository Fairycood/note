# 前端必须知道的开发调试知识

#### 浏览器里动态修改元素和样式

- 点击.cls开启动态修改元素的class
- 输入字符串可以动态的给元素添加类名
- 勾选/取消类名可以动态的查看类名生效效果
- 点击具体的样式值（字号、颜色、宽度高度等）可以进行编辑，浏览器内容区域实时预览
- Computed下点击样式里的箭头可以跳转到styles面板中的CSS规则

#### Break Point与Watch

-  使用关键字debugger或代码预览区域的行号可以设置断点
- 执行到断点处时代码暂停执行
- 展开Beakpoints列表可以查看断点列表，勾选/取消可以激活/禁用对应断点
- 暂停状态下，鼠标hover变量可以查看变量的值
- 在调试器Watch右侧点击+可以添加对变量的监控，查看该变量的值

Scope与Call Stack

- 展开Scope可以查看作用域列表（包含闭包）
- 展开Call Stack可以查看当前JavaScript代码的调用栈