# 应用中间件 jm-server-middleware

middlewares for jm-server

## 安装

```bash
npm i jm-server-middleware
```

## 使用

```javascript
const { sequelize } = require('jm-server-middleware')
```

## 中间件定义和使用

```javascript
function validator(opts){
  const  app = this
  return {app}
}
```

## 中间件清单

### sequelize

create restful mapper for sequelize schemas defined.

```javascript
module.exports = {
  modules: {
    orm: {
      module: 'jm-server-middleware',
      jsonpath: '$.sequelize',
      config: {
        uri: 'mysql://root:123@mysql.l.jamma.cn/main'
      }
    }
  }
}
```
