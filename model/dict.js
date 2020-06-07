module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('dict',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
        comment: '类型'
      },
      code: {
        type: DataTypes.STRING(50),
        comment: '编码'
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '',
        comment: '名称'
      },
      value: {
        type: DataTypes.STRING(100),
        comment: '值'
      },
      status: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 1, validate: { min: 0, max: 1 }, comment: '状态(0:无效,1:有效)' },
      memo: {
        type: DataTypes.STRING(150),
        comment: '备注'
      }
    },
    {
      tableName: 'dict',
      timestamps: false
    })

  return model
}
