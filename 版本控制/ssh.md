# SSH的概念

## SSH和HTTPS方法的差异

利用Git向Github克隆（clone）或者提交（push）代码时，大概有两种方式：HTTPS和ssh key。我们都可以使用这两种方法直接克隆（clone）项目，但是在提交（push）的时候

* HTTPS方法需要该项目的账号、邮箱和密码授权，在多人协作开发的时候，可能不太方便
* ssh key只需要配置一次，不需要每次都输入账户、邮箱和密码，提交（push）代码时显然更加省时省力

官方对于SSH的介绍

> 使用 SSH 协议可以连接远程服务器和服务并向它们验证。 利用 SSH 密钥可以连接 GitHub，而无需在每次访问时提供用户名或密码1