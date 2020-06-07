
module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('renyuanBeian',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      code: {
        type: DataTypes.STRING(40),
        comment: '身份证件号码'
      },
      idType: {
        type: DataTypes.STRING(2),
        comment: '身份证件类型'
      },
      name: {
        type: DataTypes.STRING(50),
        comment: '姓名'
      },
      type: {
        type: DataTypes.STRING(150),
        comment: '从业类型'
      },
      gender: {
        type: DataTypes.TINYINT(4),
        comment: '性别'
      },
      birthday: {
        type: DataTypes.DATE,
        comment: '生日'
      },
      info: {
        type: DataTypes.JSON,
        comment: '备案信息'
      },
      okInfo: {
        type: DataTypes.JSON,
        comment: '已通过备案信息'
      },
      version: {
        type: DataTypes.INTEGER,
        comment: '版本'
      },
      userId: {
        type: DataTypes.STRING(50),
        comment: '备案人员id,  如果是备案人员自备案，记录备案人员的id，此时userId===baUserId, 如果是单位负责人为其他人员备案，userId=null'
      }
    },
    {
      tableName: 'renyuan_beian',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime',
      paranoid: true
    })

  return model
}
