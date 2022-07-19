## 原生小程序开发中默认插槽的实现方式
在微信小程序的开发中是不支持像vue那样默认插槽的功能的，但是如果想要自己实现类似默认插槽这样的功能的话还是有不少方案可以解决的，这里给出以下两个方案：
#### wx:if
在js文件中维护一个变量来控制默认插槽的显示

    <view  class="right"  wx:if="{{showRight}}">
	    <view  class="slot"><slot></slot></view>
	    <view  class="default">
		    <text>{{rightText}}</text>
		    <image  class="icon" 
     src="/assets/images/icons/arrow-right.png"></image>
     </view>
     </view>













<!--stackedit_data:
eyJoaXN0b3J5IjpbMTIwODI5MTU3OCwtODgyNDYzNTM1LDIwND
AyOTc2MjJdfQ==
-->