
module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('storehouseSpuCode',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      storehouseId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '储存场所id',
        onUpdate: 'RESTRICT',
        onDelete: 'CASCADE'
      },
      spuId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '物品id'
      },
      unit: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '单位'
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '标识码'
      },
      amount: {
        type: DataTypes.DECIMAL(25, 9),
        comment: '库存数量',
        get () { return Number(this.getDataValue('amount')) }
      }
    },
    {
      tableName: 'storehouse_spu_code',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime',
      collate: 'utf8mb4_unicode_ci',
      indexes: [
        {
          name: 'ak_spuId',
          fields: ['spuId']
        },
        {
          name: 'ak_storehouseId',
          fields: ['storehouseId']
        },
        {
          name: 'ak_code',
          fields: ['code']
        },
        {
          name: 'ak_storehouseId_spuId_unit_code',
          fields: ['storehouseId', 'spuId', 'unit', 'code'],
          unique: true
        }
      ]
    })

  return model
}
