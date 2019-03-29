import { APIGatewayProxyEvent, Callback, Context } from 'aws-lambda'
import { handle } from '../src/handler'

test('handler', async () => {
  const evt = { httpMethod: 'GET' } as APIGatewayProxyEvent

  const res = await handle(evt, {} as Context, {} as Callback)
  expect(res).toEqual({ statusCode: 200, body: JSON.stringify(evt) })
})
