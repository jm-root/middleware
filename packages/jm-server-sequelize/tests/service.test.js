const serivce = require('./service')
let router
beforeAll(async () => {
  await serivce.onReady()
  router = serivce.router()
})
describe('service', async () => {
  test('查询', async () => {
    const data = await router.get('/spus')
    console.log(data)
  })
})
