const $ = require('./service')

let router = null
beforeAll(async () => {
  await $.onReady()
  router = $.router()
})

describe('router', async () => {
  test('info', async () => {
    const doc = await router.get('/')
    console.log(doc)
  })
})
