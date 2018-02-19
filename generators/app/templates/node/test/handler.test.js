import assert from 'assert'
import { handle } from '../src/handler'

describe('handler', () => {
  const res = body => ({ statusCode: 200, body })
  // const errorRes = err => res(`{"error":${JSON.stringify(err)}}`)

  it('returns successfully', () => {
    const event = { key: 'value' }

    handle(event, {}, (e, r) => {
      assert.ifError(e)
      assert.deepEqual(r, res(JSON.stringify(event)))
    })
  })
})
