
module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('flowSpuCode',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      flowId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '流向id',
        onUpdate: 'RESTRICT',
        onDelete: 'CASCADE'
      },
      spuId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '物品id'
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '标识码'
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
      tableName: 'flow_spu_code',
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
          name: 'ak_flowId',
          fields: ['flowId']
        },
        {
          name: 'ak_code',
          fields: ['code']
        },
        {
          name: 'ak_flowId_spuId_unit_code',
          fields: ['flowId', 'spuId', 'unit', 'code'],
          unique: true
        }
      ]
    })

  return model
}
