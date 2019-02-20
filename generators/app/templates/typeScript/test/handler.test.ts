import { handle } from '../src/handler'

test('handler', async () => {
  const evt = { httpMethod: 'GET' } as any

  const res = await handle(evt)
  expect(res).toEqual({ statusCode: 200, body: JSON.stringify(evt) })
})
