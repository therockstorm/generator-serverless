package <%= packageName %>

import java.net.InetSocketAddress

import com.sun.net.httpserver.{HttpExchange, HttpHandler, HttpServer}

object Server extends App {
  val port = <%= port %>
  val server = HttpServer.create(new InetSocketAddress(port), 0)
  server.createContext("/", new RootHandler(new Handler))
  server.setExecutor(null)
  server.start()
  println(s"Listening at http://localhost:$port...")
}

class RootHandler(handler: Handler) extends HttpHandler {

  def handle(t: HttpExchange): Unit = {
    val response = handler.handleRequest(Request("my-id"), null).toString

    t.sendResponseHeaders(200, response.length)
    val os = t.getResponseBody
    os.write(response.getBytes)
    os.close()
  }

}
