package <%= packageName %>

object Main extends App {
  // Optionally implement and mock com.amazonaws.services.lambda.runtime.Context
  println(new Handler().handleRequest(Request("my-id"), null))
}
