import { Atomilog } from "atomilog"
import "source-map-support/register"

const log = new Atomilog()

export const handle = async (evt: {}): Promise<{
  statusCode: number
  body: string
}> => {
  log.info("Event received", { evt })
  return { statusCode: 200, body: JSON.stringify(evt) }
}
