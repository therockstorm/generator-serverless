const { log } = require('@therockstorm/utils')

const res = body => ({ statusCode: 200, body: JSON.stringify(body) })

// const errorRes = err => res({ error: err.message || err })

module.exports.handle = (event, context, cb) => {
  log(JSON.stringify(event))
  return cb(null, res(event))
}
