
module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('flow',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      type: {
        type: DataTypes.STRING(10),
        comment: '出入库类型',
        allowNull: false
      },
      flag: {
        type: DataTypes.INTEGER,
        comment: '出入库标志 1 入库 -1 出库'
      },
      flowtime: {
        type: DataTypes.DATE,
        comment: '出入库日期'
      },
      status: {
        type: DataTypes.INTEGER,
        comment: '状态 0 未确认 1 已确认 2 已拒绝',
        validate: {
          min: 0,
          max: 2
        }
      },
      info: {
        type: DataTypes.JSON,
        comment: '附加信息'
      }
    },
    {
      tableName: 'flow',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime'
    })

  return model
}
