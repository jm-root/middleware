module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('alarm',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      type: {
        type: DataTypes.STRING(20),
        comment: '报警类型 flow流量流向 identity身份异常'
      },
      state: {
        type: DataTypes.INTEGER,
        comment: '状态：0未处置 1处置中 2已处置',
        defaultValue: 0,
        validate: {
          min: 0,
          max: 2
        }
      },
      reason: {
        type: DataTypes.STRING(255),
        comment: '末次处理结果'
      },
      memo: {
        type: DataTypes.STRING(255),
        comment: '备注'
      },
      info: {
        type: DataTypes.JSON,
        comment: '详情'
      }
    },
    {
      tableName: 'alarm',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: false
    })

  return model
}
