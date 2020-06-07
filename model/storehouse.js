
module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('storehouse',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      type: {
        type: DataTypes.STRING(10),
        comment: '类型'
      },
      ownType: {
        type: DataTypes.STRING(10),
        comment: '归属类型'
      },
      name: {
        type: DataTypes.STRING(50),
        comment: '姓名'
      },
      address: {
        type: DataTypes.STRING(300),
        comment: '地址'
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
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        comment: '是否有效 0无效 1有效'
      }
    },
    {
      tableName: 'storehouse',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime'
    })

  return model
}
