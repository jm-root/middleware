# 中间件 middleware

也叫中间件函数，按照使用场景，中间件分为两种，路由中间件 和 应用中间件。

## 路由中间件

jm-ms 专用

## 应用中间件

jm-server 专用

## <a name="环境变量">环境变量</a>

- jm-server

- jm-server-jaeger

- main

--

### jm-server

请参考 [jm-server](https://github.com/jm-root/jm-server/tree/master/packages/jm-server)

--

### jm-server-jaeger

| 配置项 | 默认值 | 描述 |
| :-: | :-: | :-: |
|service_name|"server-template"| 链路追踪登记的服务名称 |
|jaeger| |jaeger服务器Uri| 链路追踪服务器

--

### main

| 配置项 | 默认值 | 描述 |
| :-: | :-: | :-: |
|gateway| [] | Gateway服务器Uri |
