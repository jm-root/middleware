const serivce = require('./service')
let router
beforeAll(async () => {
  await serivce.onReady()
  router = serivce.router()
})
describe('service', async () => {
  test('创建,删除用户', async () => {
    const data = await router.post('/users', { id: '999999', email: 'test@foo.bar', name: 'foo' })
    expect(data.id).toBe('999999')
    const data2 = await router.delete('/users/999999')
    expect(data2.ret).toBe(1)
  })
  test('查询用户', async () => {
    const data = await router.get('/users/1')
    expect(data.id).toBe('1')
  })
})
