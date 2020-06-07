# 路由中间件 jm-ms-middleware

middlewares for jm-ms

## 安装

```bash
npm i jm-ms-middleware
```

## 使用

```javascript
const { sequelize } = require('jm-ms-middleware')
```

## 中间件定义和使用

```javascript
function validator(opts){
  return async function (opts){
    
  }
}
```

## 中间件清单

### sequelize

create restful mapper for a sequelize model.

```javascript

router
  .use(sequelize.order())
  .use(sequelize.fields())
  .use(sequelize.filter('conditions','crtime','code'))
  .use(sequelize.resful(model))

```

### toArray

```javascript
router.use(toArray('files', 'tags'))
```
