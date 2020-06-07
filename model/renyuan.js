
module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('renyuan',
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
        type: DataTypes.STRING(150),
        allowNull: false,
        defaultValue: '',
        comment: '姓名'
      },
      gender: {
        type: DataTypes.INTEGER,
        comment: '性别'
      },
      avatarUrl: {
        type: DataTypes.STRING(255),
        comment: '头像url'
      },
      mobile: {
        type: DataTypes.STRING(20),
        comment: '手机号'
      }
    },
    {
      tableName: 'renyuan',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime',
      paranoid: true
    })

  return model
}
