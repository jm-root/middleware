
module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('flowSpu',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      unit: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '单位'
      },
      amount: {
        type: DataTypes.DECIMAL(25, 9),
        comment: '数量',
        get () { return Number(this.getDataValue('amount')) }
      }
    },
    {
      tableName: 'flow_spu',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime'
    })

  return model
}
