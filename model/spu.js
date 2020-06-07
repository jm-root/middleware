
module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('spu',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        comment: '名称'
      },
      alias: {
        type: DataTypes.STRING(255),
        comment: '别名'
      },
      type: {
        type: DataTypes.STRING(10),
        comment: '类型'
      },
      py: {
        type: DataTypes.STRING(1),
        comment: '拼音首字母'
      },
      xingtai: {
        type: DataTypes.STRING(1),
        comment: '形态'
      },
      midu: {
        type: DataTypes.FLOAT,
        comment: '密度'
      },
      status: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 1, validate: { min: 0, max: 1 }, comment: '状态(0:无效,1:有效)' }
    },
    {
      tableName: 'spu',
      timestamps: false
    })

  return model
}
