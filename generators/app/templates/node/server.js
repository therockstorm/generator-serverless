import { createServer } from 'http'
import { handle } from './src/handler'

const PORT = <%= port %>;
const EVENT = { key1: 'value1' }

const requestHandler = (req, res) =>
  handle(EVENT, {}, (e, r) => {
    if (e) return console.error(`handle err=${e}`)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(r))
    res.end()
  })

createServer(requestHandler).listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}...`)
)
