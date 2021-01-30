import * as pino from "pino"
import "source-map-support/register"

const log = pino();

export const handle = async (evt: {}): Promise<{
  statusCode: number
  body: string
}> => {
  log.info("Event received", evt)
  return { statusCode: 200, body: JSON.stringify(evt) }
}
