package <%= packageName %>

import java.net.InetSocketAddress

import com.sun.net.httpserver.{HttpExchange, HttpHandler, HttpServer}

object Server extends App {
  val event = Request("my-id")
  val port = <%= port %>
  val server = HttpServer.create(new InetSocketAddress(port), 0)
  server.createContext("/", new RootHandler(new Handler, event))
  server.setExecutor(null)
  server.start()
  println(s"Listening at http://localhost:$port...")
}

class RootHandler(handler: Handler, event: Request) extends HttpHandler {
  def handle(t: HttpExchange): Unit = {
    if (t.getRequestURI.toString != "/") return

    val response = handler.handleRequest(Request("my-id"), new MockContext).toString

    t.sendResponseHeaders(200, response.length)
    val os = t.getResponseBody
    try os.write(response.getBytes) finally os.close()
  }
}
