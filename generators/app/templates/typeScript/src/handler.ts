const { log } = require('@therockstorm/utils')
import { Callback, Context, Handler, ScheduledEvent } from 'aws-lambda'

const res = body => ({ statusCode: 200, body: JSON.stringify(body) })

// const errorRes = err => res({ error: err.message || err })

export const handle: Handler = async (
  event: ScheduledEvent,
  context: Context,
  cb: Callback
) => {
  log(JSON.stringify(event), JSON.stringify(context))
  return cb(null, res(event))
}
