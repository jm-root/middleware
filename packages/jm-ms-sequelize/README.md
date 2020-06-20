# jm-ms-sequelize

sequelize router plugin for jm-ms

路由定义中间件, 方便快速定义Restful接口

## Features
- 快速定义增,删,改,查接口

## 服务说明
- 使用请基于[`jm-server`](https://github.com/jm-root/server/tree/master/packages/jm-server)建立

## 使用样例
````
const { ms } = require('jm-server')
const { resful, order, fields } = require('jm-ms-sequelize')
module.exports = (service) => {

  const router = ms.router()
  router
    .use(order())
    .use(fields())

  router.use(`/${modelName}s`, resful(model)) // modelName为模块名, model为模块实例

  return router
}

````