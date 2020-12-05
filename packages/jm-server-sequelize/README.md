# jm-server-sequelize

通过 sequelize 暴露数据库到 restful 接口上

## 配置

```javascript
module.exports = {
  modules: {
    'jm-server-sequelize': {
      config: {
        dir: "", // model 所在路径
        uri: "", // connection URI
        options: {} // connection options
      },
    },
  },
};
```

| 配置项 | 默认值 | 描述 |
| :---: | :---: | :---: |
| dir | 'model' | load all files in dir as models |
| uri | | connection URI |
| options | | [connection options](https://sequelize.org/v5/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor) |

## Model files

Please put models under `model` dir by default.

服务会自动遍历 model 文件夹下所有文件，逐一加载所有模型。

为了保持灵活性，从 1.0.5 开始，如果 model 文件夹中存在 index.js 或者 index/index.js 所有工作由 require('/index') 完成

```javascript
// index.js 例子
module.exports = function (sequelize, DataTypes) {
  require('./spu')(sequelize, DataTypes)
  // ...
  return sequelize.models
}

```

## Associate

### Model.associate()

Define all your associations in `Model.associate()` and will be executed after all models loaded.

```javascript
module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('danwei',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      nId: {
        type: DataTypes.INTEGER,
        unique: true,
        comment: '自增id'
      },
      code: {
        type: DataTypes.STRING(40),
        allowNull: false,
        comment: '单位统一社会信用代码/公安机关机构代码'
      },
      name: {
        type: DataTypes.STRING(300),
        allowNull: false,
        defaultValue: '',
        comment: '名称'
      },
      address: {
        type: DataTypes.STRING(300),
        comment: '地址'
      },
      isGovern: {
        type: DataTypes.INTEGER,
        comment: '是否公安机关'
      },
      governCode: {
        type: DataTypes.STRING(40),
        comment: '管辖公安机关机构代码',
        allowNull: false
      },
      governName: {
        type: DataTypes.STRING(250),
        comment: '管辖公安机关名称',
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: '是否有效 0无效 1有效'
      }
    },
    {
      tableName: 'danwei',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime'
    })

  model.associate = models=>{
    const {  danwei, region } = models
    danwei.belongsTo(region, { constraints: false })
    danwei.belongsTo(danwei, { as: 'govern', constraints: false })
  }
  return model
}

```
### associations.js

Define all your associations in file `associations.js` and will be executed after all models loaded.

```javascript
module.exports = function (models) {
  const { region, danwei } = models
  
  // 需要时，可以通过 danwei.sequelize.app 引用到 app

  danwei.belongsTo(region, { constraints: false })
  danwei.belongsTo(danwei, { as: 'govern', constraints: false })

}

```