package <%= packageName %>

import com.amazonaws.services.lambda.runtime.Context
import io.circe.generic.auto._
import io.github.mkotsur.aws.handler.Lambda
import io.github.mkotsur.aws.handler.Lambda._
import org.apache.logging.log4j.{LogManager, Logger}

case class Request(id: String)
case class Response(statusCode: Int, body: String)

class Handler extends Lambda[Request, Response] {
  protected def log: Logger = LogManager.getLogger(getClass)

  override def handleRequest(event: Request, context: Context): Response = {
    log.info(event)
    Response(200, event.id)
  }
}
