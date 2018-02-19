package <%= packageName %>

import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FlatSpec, Matchers}

class HandlerSpec extends FlatSpec with Matchers with MockitoSugar {

  "handle" should "work" in {
    true shouldBe true
  }
}
