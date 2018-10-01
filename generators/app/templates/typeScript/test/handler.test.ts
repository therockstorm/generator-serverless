import { handle } from '../src/handler'

const res = body => ({ statusCode: 200, body })

test('handler', () => {
  const event = { key: 'value' }

    handle(event, {}, (e, r) => {
      expect(e).toBeNull()
      expect(r).toEqual(res(JSON.stringify(event)))
    })
})
