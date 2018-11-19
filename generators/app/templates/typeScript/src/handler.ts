import { log } from '@therockstorm/utils'
import {
  Context,
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda'

export const handle: APIGatewayProxyHandler = async (
  evt: APIGatewayProxyEvent,
  ctx: Context
): Promise<APIGatewayProxyResult> => {
  log(JSON.stringify(evt), JSON.stringify(ctx))
  return { statusCode: 200, body: JSON.stringify(evt) }
}
