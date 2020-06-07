module.exports = {
  debug: true,
  port: 3000,
  modules: {
    main: {},
    orm: {
      module: 'jm-server-middleware',
      jsonpath: '$.sequelize',
      config: {
        uri: 'mysql://root:123@mysql.l.jamma.cn/main', // A full database URI;
      }
    }
  }
}
