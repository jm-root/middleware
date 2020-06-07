module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('checkrecord',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      info: {
        type: DataTypes.JSON,
        comment: '检查结果'
      },
      type: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        comment: '检查类型(1:单位自检,2:派出所检查,3:分局检查,4:市局检查)'
      }
    },
    {
      tableName: 'checkrecord',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime',
      comment: '检查记录'
    })

  return model
}
