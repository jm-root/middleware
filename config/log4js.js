module.exports = {
  appenders: {
    console: { type: 'console' },
    main: {
      type: 'dateFile',
      filename: 'logs/main',
      pattern: 'yyyyMMdd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: [ 'console' ], level: 'info' },
    main: { appenders: [ 'console', 'main' ], level: 'info' }
  }
}
