name := "<%= serviceName %>"
scalaVersion := "2.12.6"

javacOptions ++= Seq("-source", "1.8", "-target", "1.8", "-Xlint")
scalacOptions ++= Seq("-feature", "-deprecation")

libraryDependencies ++= Seq(
  "ch.qos.logback" % "logback-classic" % "1.2.3",
  "com.amazonaws" % "aws-lambda-java-log4j2" % "1.1.0",
  "io.github.mkotsur" %% "aws-lambda-scala" % "0.0.13",
  "org.scalatest" %% "scalatest" % "3.0.5" % Test,
  "org.mockito" % "mockito-core" % "2.21.0" % Test
)

assemblyJarName in assembly := "package.jar"
assemblyMergeStrategy in assembly := {
  case PathList(ps@_*) if ps.last == "Log4j2Plugins.dat" => sbtassembly.Log4j2MergeStrategy.plugincache
  case PathList("META-INF", "MANIFEST.MF") => MergeStrategy.discard
  case _ ⇒ MergeStrategy.first
}

test in assembly := {}
