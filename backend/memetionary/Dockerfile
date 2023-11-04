FROM openjdk:17

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} memetionary-0.0.1-SNAPSHOT.jar

ENV TZ=Asia/Seoul

ENTRYPOINT ["java","-jar","-Dserver.port=5000","memetionary-0.0.1-SNAPSHOT.jar"]
