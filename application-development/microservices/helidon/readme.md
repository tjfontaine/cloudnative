# Helidon

## Summary and Context

Last month Oracle released Helidon, an open source set of Java libraries used to write microservices. According to the official documentation, "Helidon is a collection of Java libraries for writing microservices that run on a fast web core powered by Netty... There is no unique tooling or deployment model. Your microservice is just a Java SE application." 

There are two different flavors of Helidon: Standard Edition (SE) and MicroProfile (MP). 

- Helidon SE is a functional programming style that uses the Helidon WebServer, Config and Security APIs directly. This provides an intentionally small featureset and gives you full transparency and control. JDK is used at runtime. 
- Helidon MP is a declarative model that supports the Eclipse MicroProfile family of APIs. This provides a development experience familiar to Java EE/Jakarta EE developers. Helidon MP is a thin layer on top of Helidon SE components.

## Why Should You Care? 

Microservices have become a focus of modern cloud native development. While it is possible to develop microservices with Java EE, Helidon provides a lightweight microservice framework to simplify the process. It addresses the core tools a developer needs when writing microservices: configuration, security, and a web server.

With traditional Java, you can spend a lot of time simply setting up your development environment: (download JDK, set up classpaths, get an IDE, get Maven, get the right dependencies, write a hello world, get a webserver to deploy onto, package stuff, then deploy it). Helidon comes with boilerplate so you can focus on business logic and developing code rather than spending your time configuring an environment. You can simply create and run your Java SE application. Helidon is also useful because it addresses the need for additional debugging and DevOps tools out of the box, for instance SpotBugs, and includes a scripts folder for deployment and stylechecking. 

Outside of Java-related challenges, it can be confusing to figure out what pieces or frameworks you need to get started when writing webapps and microservices and/or how to design with [12-factor](https://12factor.net/) principles. Helidon gives you a good recipe for this. Another benefit of using Helidon is that it was designed with Kubernetes in mind. Your quickstart application comes with an app.yaml that can be deployed straight onto a Kubernetes cluster. 
