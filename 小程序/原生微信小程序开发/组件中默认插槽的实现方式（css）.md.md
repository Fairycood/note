## 原生小程序开发中默认插槽的实现方式
在微信小程序的开发中是不支持像vue那样默认插槽的功能的，但是如果想要自己实现类似默认插槽这样的功能的话还是有不少方案可以解决的，这里给出以下两个方案：
#### wx:if
在js文件中维护一个变量来控制默认插槽的显示
```html
<view  class="right"  wx:if="{{showRight}}">
	//插槽
	<view  class="slot"><slot></slot></view>
	//当没有插槽时默认显示的插槽（默认插槽）
	<view  class="default" wx:if="{{showMore}}">
		<text>{{rightText}}</text>
		<image  class="icon" src="/assets/images/icons/arrow-right.png">
		</image>
	</view>
</view>
```
缺点：这种方案比较繁琐，需要额外创建一个变量来控制默认插槽的显示，不够优雅
#### css的方式解决











<!--stackedit_data:
eyJoaXN0b3J5IjpbMjEzMDM4NjM5LC04ODI0NjM1MzUsMjA0MD
I5NzYyMl19
-->