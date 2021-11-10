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
