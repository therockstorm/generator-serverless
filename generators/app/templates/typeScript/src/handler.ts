import { log } from '@therockstorm/utils'
import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'

export const handle: APIGatewayProxyHandler = async evt => {
  log(JSON.stringify(evt))
  return { statusCode: 200, body: JSON.stringify(evt) }
}
