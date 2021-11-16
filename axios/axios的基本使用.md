先在项目里安装axios框架：`npm install axios --save`

对axios进行包装：

```js
export axios from "axios"

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
  
  //2.axios的拦截器
  //2.1.请求拦截
  instance.interceptors.request.use(config => {
    (发送请求之前要做的事情)
    return config
  },err => {
    (对请求错误要做的事情)
  })
  
  //2.2.响应拦截
  instance.interceptors.response.use(res => {
    (对响应数据要做的事情)
    return res
  },err => {
    (对响应错误要做的事情)
  })
  
  //3.发送真正的网络请求
  return instance(config)
}
```

注意：

- 在响应拦截中要对响应数据进行操作后，需要将响应数据（res）return出去，否则会接收不到响应数据。请求拦截中亦是如此

- 因为axios框架中创建的axios实例本来就是一个promise对象，所以在发送真正的网络请求时可以直接把`instance(config)`返回出去，其原本就自带then和catch方法

- # axios的进一步封装

  ## 为什么要封装

  * 新建一个模块用来封装数据请求相关的内容，导出函数比如getData(),请求数据的时候不在使用this.axios.get()这种方式。

  1. 因为封装好的axios可以重用，阅读性高，
  2. 并且不必污染Vue的原型，
  3. 在this不指向Vue实例的时候也可以使用该函数
  4. 如果有一天想要换http请求插件的话不必再每个文件中进行修改。只需要在自己封装的模块中进行修改。
