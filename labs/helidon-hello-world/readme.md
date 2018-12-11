# Helidon Hello World  

## Before You Begin

This 20-minute tutorial shows you how to create a hello world program using the Helidon microservice framework. 

### Background

Project Helidon is an open source set of Java libraries used to write microservices. According to the official documentation, "Helidon is a collection of Java libraries for writing microservices that run on a fast web core powered by Netty... There is no unique tooling or deployment model. Your microservice is just a Java SE application."

In this tutorial you will be using the Helidon framework to create a Java SE application, package the application as a Docker Image, and then deploy and connect to the packaged application running on Kubernetes. 

### What Do You Need?

The following list shows the minimum versions: 

- [Java SE 8](https://www.oracle.com/technetwork/java/javase/downloads) or [Open JDK 8](http://jdk.java.net/)
- [Maven 3.5](https://maven.apache.org/download.cgi) 
- [Docker 18.02](https://docs.docker.com/install/)
- [Kubectl 1.7.4](https://kubernetes.io/docs/tasks/tools/install-kubectl/) 
- Kubernetes: Enable [Kubernetes Support for Mac](https://docs.docker.com/docker-for-mac/#kubernetes) or [Kubernetes Support for Windows](https://docs.docker.com/docker-for-windows/#kubernetes).

[Here](https://helidon.io/docs/latest/#/getting-started/01_prerequisites) is an updated list of pre-requisites for using Helidon.



## Generate The Project

Generate the project sources using the Helidon SE Maven archetypes. The Helidon SE example implements the REST service using the Helidon WebServer component directly. It shows the basics of configuring the WebServer and implementing basic routing rules.

1. Inside your development folder run the Helidon SE Example Maven archetype:

```
mvn archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-se \
    -DarchetypeVersion=0.10.4 \
    -DgroupId=io.helidon.examples \
    -DartifactId=quickstart-se \
    -Dpackage=io.helidon.examples.quickstart.se
```

2. change directories into the one created by the archetype:

```
cd quickstart-se
```

3. Build the application: 

```
mvn package
```

4. The project builds an application jar for the example and saves all runtime dependencies in the target/libs directory. This means you can easily start the application by running the application jar file: 

```
java -jar target/quickstart-se.jar
```
You can now access the application	at http://localhost:8080/greet

The example is a very simple "Hello World" greeting service. It supports GET requests for generating a greeting message, and a PUT request for changing the greeting itself. The response is encoded using JSON. For example: 

```
curl -X GET http://localhost:31431/greet
{"message":"Hello World!"}

curl -X GET http://localhost:31431/greet/Joe
{"message":"Hello Joe!"}

curl -X PUT http://localhost:31431/greet/greeting/Hola
{"greeting":"Hola"}

curl -X GET http://localhost:31431/greet/Jose
{"message":"Hola Jose!"}
```

5. The project also contains a Docker file so that you can easily build and run a docker image. Because the example’s runtime dependencies are already in target/libs, the Docker file is pretty simple (see target/Dockerfile). To build the Docker image, you need to have Docker installed and running on your system.

```
docker build -t quickstart-se target
```

6. If you would like to start the application with Docker run: 

```
docker run --rm -p 8080:8080 quickstart-se:latest
```
You can access the application	at http://localhost:8080/greet

## Deploy the Application to Kubernetes. 

[Install Kubernetes on your desktop](https://helidon.io/docs/latest/#/getting-started/04_kubernetes). Then deploy the example. 

1. Verify connectivity to cluster: 

```
kubectl cluster-info
kubectl get nodes
```

2. Deploy the application to Kubernetes:

```
kubectl create -f target/app.yaml
kubectl get pods 
```

3. Start the Kubernetes proxy server so you can connect to your service via localhost:

```
kubectl proxy
```

4. Get the service endpoint for the application deployed on Kubernetes: 

```
kubectl get service quickstart-se
```

5. Note the ports. You can now connect to the application using the second port number (the NodePort) instead of 8080. For example:

```
http://localhost:31431/greet
```


## Clean Up 

After you’re done, remove the application from Kubernetes: 

```
kubectl delete -f target/app.yaml
```

## Want to Learn More?

- [Official Helidon Documentation](https://helidon.io/docs/latest/#/about/01_introduction)
