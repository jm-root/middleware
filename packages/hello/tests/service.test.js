const $ = require('./service')
let service = null

beforeAll(async () => {
  await $.onReady()
  service = $
})

describe('service', async () => {
  test('bind', async () => {
    const { gateway } = service
    await gateway.bind('config')
    const doc = await gateway.config.get('/')
    console.log(doc)
  })
})
