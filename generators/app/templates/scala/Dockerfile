FROM dwolla/java

ENV ENVIRONMENT local
WORKDIR /usr/src/app
COPY target/scala-2.12/package.jar .

EXPOSE <%= port %>

CMD java -jar package.jar
