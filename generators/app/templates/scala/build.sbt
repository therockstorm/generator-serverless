javacOptions ++= Seq("-source", "1.8", "-target", "1.8", "-Xlint")

lazy val commonSettings = Seq(
  scalaVersion := "2.12.4",
  scalacOptions ++= Seq("-feature", "-deprecation"),
)

lazy val root = (project in file("."))
  .settings(
    name := "<%= serviceName %>",
    resolvers ++= Seq(Resolver.bintrayIvyRepo("maven")),
    libraryDependencies ++= {
      Seq(
        "com.amazonaws" % "aws-lambda-java-core" % "1.2.0",
        "com.amazonaws" % "aws-lambda-java-events" % "2.0.2",
        "io.symphonia" % "lambda-logging" % "1.0.1" classifier "no-config",
        "ch.qos.logback" % "logback-classic" % "1.2.3",
        "org.scalatest" %% "scalatest" % "3.0.5" % Test,
        "org.mockito" % "mockito-core" % "2.15.0" % Test
      )
    }
  )
  .settings(commonSettings: _*)

assemblyJarName in assembly := "package.jar"
assemblyMergeStrategy in assembly := {
  case PathList("META-INF", "MANIFEST.MF") => MergeStrategy.discard
  case _ ⇒ MergeStrategy.first
}
test in assembly := {}
