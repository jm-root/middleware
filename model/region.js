
module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('region',
    {
      id: {
        type: DataTypes.STRING(12),
        primaryKey: true
      },
      pid: {
        type: DataTypes.STRING(12)
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '',
        comment: '名称'
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '类型'
      },
      gps: {
        type: DataTypes.STRING(32),
        comment: '值'
      }
    },
    {
      tableName: 'region',
      timestamps: false
    })

  return model
}
