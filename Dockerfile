FROM --platform=linux/amd64 openjdk:21
EXPOSE 8080
ADD backend/target/trackmymeal.jar trackmymeal.jar
ENTRYPOINT ["java", "-jar", "trackmymeal.jar"]