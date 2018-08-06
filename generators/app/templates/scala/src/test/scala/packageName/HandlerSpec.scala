package <%= packageName %>

import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FlatSpec, Matchers}

class HandlerSpec extends FlatSpec with Matchers with MockitoSugar {

  trait Setup {
  }

  "handle" should "work" in new Setup {
    true shouldBe true
  }
}
