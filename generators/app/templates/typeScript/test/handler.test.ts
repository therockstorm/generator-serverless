import { handle } from '../src/handler'

test('handler', async () => {
  const evt = { key: 'value' }

  const res = await handle(evt, {})
  expect(res).toEqual(res({ statusCode: 200, body: JSON.stringify(evt) }))
})
