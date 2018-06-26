package <%= packageName %>

import com.amazonaws.services.lambda.runtime.{Context, RequestHandler}
import org.slf4j.{Logger, LoggerFactory}

import scala.beans.BeanProperty
import scala.language.postfixOps

case class Request(@BeanProperty var id: String) {
  def this() = this("")
}

case class Response(@BeanProperty var statusCode: Int, @BeanProperty var body: String) {
  def this() = this(0, "")
}

class Handler extends RequestHandler[Request, Response] {
  private lazy val log: Logger = LoggerFactory.getLogger(getClass)

  override def handleRequest(input: Request, context: Context): Response = {
    log.info(input.toString)
    Response(200, input.id)
  }
}
