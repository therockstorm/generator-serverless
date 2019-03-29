import { log } from '@therockstorm/utils'
import 'source-map-support/register'

export const handle = async (evt: any): Promise<any> => {
  log(JSON.stringify(evt))
  return { statusCode: 200, body: JSON.stringify(evt) }
}
