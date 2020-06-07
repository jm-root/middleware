
module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('storehouseSpu',
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
      initAmount: {
        type: DataTypes.DECIMAL(25, 9),
        comment: '初始库存数量',
        get () { return Number(this.getDataValue('initAmount')) }
      },
      maxAmount: {
        type: DataTypes.DECIMAL(25, 9),
        comment: '最大库存数量',
        get () { return Number(this.getDataValue('maxAmount')) }
      },
      amount: {
        type: DataTypes.DECIMAL(25, 9),
        comment: '库存数量',
        get () { return Number(this.getDataValue('amount')) }
      }
    },
    {
      tableName: 'storehouse_spu',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime'
    })

  return model
}
