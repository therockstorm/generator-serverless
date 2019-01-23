import { Context, APIGatewayProxyEvent } from 'aws-lambda'
import { handle } from '../src/handler'

test('handler', async () => {
  const evt = { httpMethod: 'GET' }

  const res = await handle(evt as APIGatewayProxyEvent, {} as Context)
  expect(res).toEqual({ statusCode: 200, body: JSON.stringify(evt) })
})
